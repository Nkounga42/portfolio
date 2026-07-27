import React, { useState, useEffect } from 'react';
import { supabase } from '../tools/supabase';
import ProjectForm from '../components/admin/ProjectForm';
import AdminLists from '../components/admin/AdminLists';

const AdminProjectsPage = () => {
  const [projectData, setProjectData] = useState({
    nom: '',
    slug: '',
    description: '',
    readme: '',
    category: 'Web App',
    technologies: '',
    repository_link: '',
    page_link: '',
    image: '',
  });

  const [loading, setLoading] = useState(false);
  const [projCategories, setProjCategories] = useState(['Web App', 'Desktop', 'Mobile', 'API', 'Illustration']);
  const [newProjCat, setNewProjCat] = useState('');
  const [showAddProjCat, setShowAddProjCat] = useState(false);
  const [projImageSource, setProjImageSource] = useState<'url' | 'file'>('url');
  const [projectsList, setProjectsList] = useState<any[]>([]);
  const [loadingList, setLoadingList] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoadingList(true);
    const { data, error } = await supabase
      .from('projects')
      .select('id, nom, category, slug')
      .order('id', { ascending: false });
    if (!error) setProjectsList(data || []);
    setLoadingList(false);
  };

  const handleProjectChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProjectData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (type: 'blog' | 'proj', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      if (type === 'proj') setProjectData(prev => ({ ...prev, image: imageUrl }));
    }
  };

  const handleAddProjCategory = () => {
    if (newProjCat && !projCategories.includes(newProjCat)) {
      setProjCategories([...projCategories, newProjCat]);
      setProjectData(prev => ({ ...prev, category: newProjCat }));
      setNewProjCat('');
      setShowAddProjCat(false);
    }
  };

  const handlePublishProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('projects').insert([{
      nom: projectData.nom,
      slug: projectData.slug || projectData.nom.toLowerCase().replace(/ /g, '-'),
      description: projectData.description,
      readme: projectData.readme,
      category: projectData.category,
      technologies: projectData.technologies.split(',').map(t => t.trim()),
      repository_link: projectData.repository_link,
      page_link: projectData.page_link,
      images_illustration: [projectData.image],
    }]);

    if (!error) {
      alert('Projet ajouté !');
      setProjectData({ nom: '', slug: '', description: '', readme: '', category: 'Web App', technologies: '', repository_link: '', page_link: '', image: '' });
      fetchProjects();
    } else {
      alert('Erreur: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="mx-8 mx-auto px-4 py-12">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Projets</h1>
        <p className="text-sm opacity-70">Gestion des projets publiés.</p>
      </div>

      <div className="drawer drawer-end">
        <input id="project-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <AdminLists
            activeTab="projects"
            comments={[]}
            projectsList={projectsList}
            blogsList={[]}
            loadingList={loadingList}
            deleteComment={async () => {}}
            deleteProject={async () => {}}
            deleteBlog={async () => {}}
          />
        </div>
        <div className="drawer-side h-100">
          <label htmlFor="project-drawer" className="drawer-overlay"></label>
          <div className="menu p-0 w-[500px] min-h-full bg-base-200">
            <div className="p-4 border-b border-base-content/10 flex justify-between items-center">
              <h2 className="text-xl font-bold">Nouveau Projet</h2>
              <label htmlFor="project-drawer" className="btn btn-sm btn-circle btn-ghost cursor-pointer">✕</label>
            </div>
            <div className="p-6 overflow-y-auto h-[calc(100vh-80px)]">
              <ProjectForm
                projectData={projectData}
                loading={loading}
                projCategories={projCategories}
                newProjCat={newProjCat}
                showAddProjCat={showAddProjCat}
                projImageSource={projImageSource}
                setNewProjCat={setNewProjCat}
                setShowAddProjCat={setShowAddProjCat}
                setProjImageSource={setProjImageSource}
                handleProjectChange={handleProjectChange}
                handleFileChange={handleFileChange}
                handleAddProjCategory={handleAddProjCategory}
                handlePublishProject={(e) => {
                  handlePublishProject(e);
                  const checkbox = document.getElementById('project-drawer') as HTMLInputElement;
                  if (checkbox) checkbox.checked = false;
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProjectsPage;
