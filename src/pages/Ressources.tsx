import { LinkIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../tools/supabase';

// Base de données structurée de tes liens




export default function Ressources() {
    const [searchTerm, setSearchTerm] = useState('');
    const [Ressources, setRessources] = useState<any[]>([]);

    const [isPreviewActive, setIsPreviewActive] = useState(false);
    const [hoveredUrl, setHoveredUrl] = useState<string | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const fetchProjects = async () => {
            const { data, error } = await supabase
                .from('ressources')
                .select('*')
                .order('id', { ascending: false });

            if (!error && data) {
                setRessources(data);
            }
        };
        fetchProjects();
    }, []);

    // Filter first, then group by category
    const filtered = Ressources.filter(item => {
        if (!searchTerm) return true;
        const term = searchTerm.toLowerCase();
        return (
            item.name?.toLowerCase().includes(term) ||
            item.desc?.toLowerCase().includes(term)
        );
    });

    const categories = [...new Set(filtered.map(item => item.category))];

    const filteredResourcesByCategory = categories.reduce((acc, category) => {
        acc[category] = filtered.filter(item => item.category === category);
        return acc;
    }, {} as Record<string, any[]>);

    return (
        <div className="min-h-screen relative bg-base-200 text-base-content pt-11.5 font-sans">
            {/* Header */}
            <div className="sticky top-11.5 bg-primary/20 z-50 mx-auto backdrop-blur-sm mb-8 flex flex-col md:flex-row justify-between items-center gap-4 py-2 px-8  ">
                <div>
                    <h1 className="text-xl font-semibold">
                        Hub de Ressources Pro
                    </h1>
                </div>

                <div className="form-control w-full md:w-95 gap-4  flex items-center">
                    <div className="flex items-center gap-4 border border-base-100 bg-base-300 p-1 pr-3 rounded-2xl ">
                        <label className="flex items-center gap-2 cursor-pointer" title='Prévisualisation au survol'>
                            <input
                                type="checkbox"
                                checked={isPreviewActive}
                                onChange={(e) => setIsPreviewActive(e.target.checked)}
                                className="toggle toggle-primary"
                            />
                            <span className="text-xs">Prévisualisation</span>
                        </label>
                    </div>

                    <input
                        type="text"
                        placeholder="Rechercher une ressource..."
                        className="input input-bordered input-primary w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Columns layout - one column per category */}
            <div className="  mx-auto px-8 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {categories.map((category) => {
                        const categoryResources = filteredResourcesByCategory[category] || [];
                        if (categoryResources.length === 0) return null;

                        return (
                            <div key={category} className=" relative mb-12 rounded-xl overflow-hidden">
                                <div className="mb-4 sticky ml-3">
                                    <h2 className="text-lg font-bold text-base-content">{category}</h2>
                                    <p className="text-xs text-base-content/60">{categoryResources.length} ressources</p>
                                </div>
                                <div className="max-h-[600px] overflow-y-auto ">
                                    {categoryResources.map((item) => (
                                        <a
                                            key={item.id}
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-base-100 transition-colors cursor-pointer group"
                                            onMouseEnter={(e) => {
                                                if (isPreviewActive) {
                                                    setHoveredUrl(item.url);
                                                    setMousePosition({ x: e.clientX, y: e.clientY });
                                                }
                                            }}
                                            onMouseLeave={() => setHoveredUrl(null)}
                                            onMouseMove={(e) => {
                                                if (isPreviewActive) {
                                                    setMousePosition({ x: e.clientX, y: e.clientY });
                                                }
                                            }}
                                        >
                                            <div className="w-8 h-8 rounded bg-base-300 flex items-center justify-center overflow-hidden flex-shrink-0">
                                                {item.logo ? (
                                                    <img src={item.logo} alt={item.name} className="w-full h-full object-contain" />
                                                ) : (
                                                    <div className="w-full h-full  bg-primary/20 rounded flex items-center justify-center">
                                                        <span className="text-primary text-xs font-bold">{item.name.charAt(0)}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-sm font-medium text-base-content truncate group-hover:text-primary transition-colors">
                                                    {item.name}
                                                </h3>
                                            </div>
                                            <LinkIcon className="w-4 h-4 text-base-content/40 group-hover:text-primary transition-colors flex-shrink-0" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Iframe preview */}
            {hoveredUrl && (
                <div
                    className="fixed w-[300px] h-[200px]  rounded-xl shadow-2xl border border-base-content/20 overflow-hidden z-50 pointer-events-none hidden md:block"
                    style={{
                        left: `${mousePosition.x - 150}px`,
                        top: `${mousePosition.y - 220}px`,
                    }}
                >
                    <div className="flex items-center justify-between p-2 border-b border-base-content/10 bg-base-200/30 backdrop-blur-sm pointer-events-auto">
                        <span className="text-xs text-base-content/60 truncate flex-1">{hoveredUrl}</span>
                        <button
                            onClick={() => setHoveredUrl(null)}
                            className="ml-2 text-base-content/60 hover:text-base-content"
                        >
                            ✕
                        </button>
                    </div>
                    <div className="w-full h-full overflow-hidden">
                        <iframe
                            src={hoveredUrl}
                            className="bg-base-100"
                            style={{
                                transform: 'scale(0.3)',
                                transformOrigin: 'top left',
                                width: '1000px',
                                height: '667px',
                            }}
                            title="Preview"
                            sandbox="allow-same-origin allow-scripts"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}