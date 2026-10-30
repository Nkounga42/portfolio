import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { supabase } from '../tools/supabase';

const AdminRessourcesPage = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loadingList, setLoadingList] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [formData, setFormData] = useState({ title: '', description: '', link: '' });
  const itemsPerPage = 6;

  useEffect(() => {
    fetchRessources();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const fetchRessources = async () => {
    setLoadingList(true);
    const { data, error } = await supabase
      .from('ressources')
      .select('*')
      .order('id', { ascending: false });

    if (!error) setItems(data || []);
    setLoadingList(false);
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', link: '' });
    setSelectedItem(null);
  };

  const openCreateDrawer = () => {
    resetForm();
    setIsDrawerOpen(true);
  };

  const openEditDrawer = (item: any) => {
    setSelectedItem(item);
    setFormData({ title: item.title || '', description: item.description || '', link: item.link || '' });
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    resetForm();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payload = {
      title: formData.title,
      description: formData.description,
      link: formData.link,
    };

    const { error } = selectedItem
      ? await supabase.from('ressources').update(payload).eq('id', selectedItem.id)
      : await supabase.from('ressources').insert([payload]);

    if (!error) {
      closeDrawer();
      fetchRessources();
    }
  };

  const deleteItem = async (id: number) => {
    if (!window.confirm('Supprimer cette ressource ?')) return;
    const { error } = await supabase.from('ressources').delete().eq('id', id);
    if (!error) setItems(prev => prev.filter(item => item.id !== id));
  };

  const filteredItems = items.filter((item) => {
    const term = searchTerm.toLowerCase();
    return !term || [item.title, item.description, item.link].some(value => String(value || '').toLowerCase().includes(term));
  });

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));
  const pagedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="mx-8 mx-auto px-4 py-12">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Ressources</h1>
          <p className="text-sm opacity-70">Gestion des ressources publiées.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Rechercher une ressource" className="input input-bordered input-sm rounded-2xl" />
          <button type="button" className="btn btn-primary btn-sm rounded-2xl" onClick={openCreateDrawer}>+ Nouvelle ressource</button>
        </div>
      </div>

      <div className="drawer drawer-end">
        <input id="resources-drawer" type="checkbox" className="drawer-toggle" checked={isDrawerOpen} onChange={(e) => setIsDrawerOpen(e.target.checked)} />
        <div className="drawer-content">
          <div className="rounded-3xl border border-base-content/10 bg-base-200/40 p-6 overflow-x-auto">
            {loadingList ? (
              <div className="text-center py-8">Chargement...</div>
            ) : pagedItems.length === 0 ? (
              <div className="text-center py-8 opacity-70">Aucune ressource disponible.</div>
            ) : (
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Titre</th>
                    <th>Description</th>
                    <th>Lien</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pagedItems.map((item) => (
                    <tr key={item.id}>
                      <td className="font-medium">{item.title || 'Sans titre'}</td>
                      <td className="max-w-xs">{item.description || '—'}</td>
                      <td>
                        {item.link ? (
                          <a href={item.link} target="_blank" rel="noreferrer" className="link link-primary">Ouvrir</a>
                        ) : '—'}
                      </td>
                      <td className="text-right">
                        <button type="button" className="btn btn-outline btn-xs rounded-lg mr-2" onClick={() => openEditDrawer(item)}>Modifier</button>
                        <button type="button" className="btn btn-error btn-xs rounded-lg" onClick={() => deleteItem(item.id)}>Supprimer</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="flex justify-center gap-2 mt-4">
            <button className="btn btn-sm" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>Précédent</button>
            <span className="btn btn-sm btn-ghost">{currentPage}/{totalPages}</span>
            <button className="btn btn-sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>Suivant</button>
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="resources-drawer" className="drawer-overlay" onClick={closeDrawer}></label>
          <div className="menu p-0 w-[420px] min-h-full bg-base-200">
            <div className="p-4 border-b border-base-content/10 flex justify-between items-center">
              <h2 className="text-xl font-bold">{selectedItem ? 'Modifier la ressource' : 'Nouvelle ressource'}</h2>
              <button type="button" className="btn btn-sm btn-circle btn-ghost cursor-pointer" onClick={closeDrawer}>✕</button>
            </div>
            <div className="p-6 space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <input name="title" value={formData.title} onChange={handleChange} placeholder="Titre" className="input input-bordered w-full" required />
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="textarea textarea-bordered w-full" rows={4} />
                <input name="link" value={formData.link} onChange={handleChange} placeholder="Lien URL" className="input input-bordered w-full" />
                <button type="submit" className="btn btn-primary w-full">Enregistrer</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRessourcesPage;
