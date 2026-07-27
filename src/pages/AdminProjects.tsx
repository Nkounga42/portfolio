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
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const fetchProjects = async () => {
    setLoadingList(true);
    const { data, error } = await supabase
      .from('projects')
      .select('id, nom, category, slug')
      .order('id', { ascending: false });
    if (!error) setProjectsList(data || []);
    setLoadingList(false);
  };

  const resetForm = () => {
    setProjectData({ nom: '', slug: '', description: '', readme: '', category: 'Web App', technologies: '', repository_link: '', page_link: '', image: '' });
    setSelectedProject(null);
  };

  const openCreateDrawer = () => {
    resetForm();
    setIsDrawerOpen(true);
  };

  const openEditDrawer = (project: any) => {
    setSelectedProject(project);
    setProjectData({
      nom: project.nom || '',
      slug: project.slug || '',
      description: project.description || '',
      readme: project.readme || '',
      category: project.category || 'Web App',
      technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : (project.technologies || ''),
      repository_link: project.repository_link || '',
      page_link: project.page_link || '',
      image: project.image || project.images_illustration?.[0] || '',
    });
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    resetForm();
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

  const deleteProject = async (id: number) => {
    if (!window.confirm('Supprimer ce projet ?')) return;
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (!error) setProjectsList(prev => prev.filter(p => p.id !== id));
  };

  const handlePublishProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        nom: projectData.nom,
        slug: projectData.slug || projectData.nom.toLowerCase().replace(/ /g, '-'),
        description: projectData.description,
        readme: projectData.readme,
        category: projectData.category,
        technologies: projectData.technologies.split(',').map(t => t.trim()),
        repository_link: projectData.repository_link,
        page_link: projectData.page_link,
        images_illustration: [projectData.image],
      };

      const { error } = selectedProject
        ? await supabase.from('projects').update(payload).eq('id', selectedProject.id)
        : await supabase.from('projects').insert([payload]);

      if (error) throw error;
      alert(selectedProject ? 'Projet mis à jour !' : 'Projet ajouté !');
      closeDrawer();
      fetchProjects();
    } catch (error: any) {
      alert('Erreur: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projectsList.filter((project) => {
    const term = searchTerm.toLowerCase();
    return !term || [project.nom, project.category, project.slug].some(value => String(value || '').toLowerCase().includes(term));
  });

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / itemsPerPage));
  const pagedProjects = filteredProjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="mx-8 mx-auto px-4 py-12">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projets</h1>
          <p className="text-sm opacity-70">Gestion des projets publiés.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Rechercher un projet" className="input input-bordered input-sm rounded-2xl" />
          <button type="button" className="btn btn-primary btn-sm rounded-2xl" onClick={openCreateDrawer}>+ Nouveau Projet</button>
        </div>
      </div>

      <div className="drawer drawer-end">
        <input id="project-drawer" type="checkbox" className="drawer-toggle" checked={isDrawerOpen} onChange={(e) => setIsDrawerOpen(e.target.checked)} />
        <div className="drawer-content">
          <AdminLists
            activeTab="projects"
            comments={[]}
            projectsList={pagedProjects}
            blogsList={[]}
            loadingList={loadingList}
            deleteComment={async () => {}}
            deleteProject={deleteProject}
            deleteBlog={async () => {}}
            onEditProject={openEditDrawer}
          />

          <div className="flex justify-center gap-2 mt-4">
            <button className="btn btn-sm" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>Précédent</button>
            <span className="btn btn-sm btn-ghost">{currentPage}/{totalPages}</span>
            <button className="btn btn-sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>Suivant</button>
          </div>
        </div>
        <div className="drawer-side h-100">
          <label htmlFor="project-drawer" className="drawer-overlay" onClick={closeDrawer}></label>
          <div className="menu p-0 w-[500px] min-h-full bg-base-200">
            <div className="p-4 border-b border-base-content/10 flex justify-between items-center">
              <h2 className="text-xl font-bold">{selectedProject ? 'Modifier le projet' : 'Nouveau Projet'}</h2>
              <button type="button" className="btn btn-sm btn-circle btn-ghost cursor-pointer" onClick={closeDrawer}>✕</button>
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
                handlePublishProject={handlePublishProject}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProjectsPage;
