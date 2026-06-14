import React, { useState, useEffect } from 'react';
import { supabase } from '../tools/supabase';
import { useNavigate } from 'react-router-dom';

const AdminBlog = () => {
  const [activeTab, setActiveTab] = useState<'create' | 'projects' | 'comments'>('create');

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    summary: '',
    content: '',
    cover_image: '',
    category: '',
    tags: '',
  });

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
  const [blogCategories, setBlogCategories] = useState(['Technologie', 'Design', 'Lifestyle', 'Projets']);
  const [projCategories, setProjCategories] = useState(['Web App', 'Desktop', 'Mobile', 'API', 'Illustration']);

  const [newBlogCat, setNewBlogCat] = useState('');
  const [newProjCat, setNewProjCat] = useState('');
  const [showAddBlogCat, setShowAddBlogCat] = useState(false);
  const [showAddProjCat, setShowAddProjCat] = useState(false);

  const [blogImageSource, setBlogImageSource] = useState<'url' | 'file'>('url');
  const [projImageSource, setProjImageSource] = useState<'url' | 'file'>('url');

  const [comments, setComments] = useState<any[]>([]);
  const [projectsList, setProjectsList] = useState<any[]>([]);
  const [loadingList, setLoadingList] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (activeTab === 'comments') fetchComments();
    if (activeTab === 'projects') fetchProjects();
  }, [activeTab]);

  const fetchComments = async () => {
    setLoadingList(true);
    const { data, error } = await supabase
      .from('blog_comments')
      .select('*, blog_posts(title)')
      .order('created_at', { ascending: false });
    if (!error) setComments(data || []);
    setLoadingList(false);
  };

  const fetchProjects = async () => {
    setLoadingList(true);
    const { data, error } = await supabase
      .from('projects')
      .select('id, nom, category, slug')
      .order('id', { ascending: false });
    if (!error) setProjectsList(data || []);
    setLoadingList(false);
  };

  const deleteComment = async (id: number) => {
    if (!window.confirm('Supprimer ce commentaire ?')) return;
    const { error } = await supabase.from('blog_comments').delete().eq('id', id);
    if (!error) setComments(comments.filter(c => c.id !== id));
  };

  const deleteProject = async (id: number) => {
    if (!window.confirm('Supprimer ce projet ?')) return;
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (!error) setProjectsList(projectsList.filter(p => p.id !== id));
  };

  const handleAddBlogCategory = () => {
    if (newBlogCat && !blogCategories.includes(newBlogCat)) {
      setBlogCategories([...blogCategories, newBlogCat]);
      setFormData(prev => ({ ...prev, category: newBlogCat.toLowerCase() }));
      setNewBlogCat('');
      setShowAddBlogCat(false);
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

  const handleFileChange = (type: 'blog' | 'proj', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      if (type === 'blog') setFormData(prev => ({ ...prev, cover_image: imageUrl }));
      else setProjectData(prev => ({ ...prev, image: imageUrl }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProjectChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProjectData(prev => ({ ...prev, [name]: value }));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from('blog_posts').insert([{
        title: formData.title,
        slug: formData.slug || formData.title.toLowerCase().replace(/ /g, '-'),
        summary: formData.summary,
        content: formData.content,
        cover_image: formData.cover_image,
        category: formData.category,
        tags: formData.tags
      }]);
      if (error) throw error;
      alert('Article publié !');
      navigate('/portfolio/blog');
    } catch (error: any) {
      alert('Erreur: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-10 text-center animate-in fade-in slide-in-from-top-4">
        <h1 className="text-4xl font-bold text-base-content mb-2 tracking-tight">Administration Portfolio</h1>
        <p className="opacity-60 mb-6">Gérez vos contenus de manière intuitive et moderne.</p>
        <div className="tabs tabs-boxed bg-base-300 inline-flex p-1 rounded-2xl">
          <button className={`tab rounded-xl tab-lg font-semibold ${activeTab === 'create' ? 'tab-active' : ''}`} onClick={() => setActiveTab('create')}>Articles</button>
          <button className={`tab rounded-xl tab-lg font-semibold ${activeTab === 'projects' ? 'tab-active' : ''}`} onClick={() => setActiveTab('projects')}>Projets</button>
          <button className={`tab rounded-xl tab-lg font-semibold ${activeTab === 'comments' ? 'tab-active' : ''}`} onClick={() => setActiveTab('comments')}>Commentaires</button>
        </div>
      </div>

      {activeTab === 'create' && (
        <form onSubmit={handleSubmit} className="space-y-8 bg-base-200/40 p-8 rounded-[2rem] border border-base-content/5 shadow-2xl animate-in fade-in zoom-in-95 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2 space-y-2">
              <label className="text-sm font-bold opacity-70 ml-1">Titre de l'article</label>
              <input type="text" name="title" placeholder="Ex: Maîtriser React en 2026" value={formData.title} onChange={handleChange} className="input input-bordered w-full rounded-2xl bg-base-100" required />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold opacity-70 ml-1">URL (Slug)</label>
              <input type="text" name="slug" placeholder="mon-slug-url" value={formData.slug} onChange={handleChange} className="input input-bordered w-full rounded-2xl bg-base-100" />
            </div>

            <div className="space-y-2 h-full flex flex-col">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-bold opacity-70">Catégorie</label>
                <button type="button" onClick={() => setShowAddBlogCat(!showAddBlogCat)} className="text-xs text-primary font-bold hover:underline">
                  {showAddBlogCat ? "Annuler" : "+ Nouveau"}
                </button>
              </div>
              {showAddBlogCat ? (
                <div className="flex gap-2">
                  <input type="text" value={newBlogCat} onChange={(e) => setNewBlogCat(e.target.value)} className="input input-bordered flex-1 rounded-2xl bg-base-100" placeholder="Nom..." />
                  <button type="button" onClick={handleAddBlogCategory} className="btn btn-primary rounded-2xl">Ajouter</button>
                </div>
              ) : (
                <select name="category" value={formData.category} onChange={handleChange} className="select select-bordered w-full rounded-2xl bg-base-100">
                  <option value="">Sélectionner</option>
                  {blogCategories.map(c => <option key={c} value={c.toLowerCase()}>{c}</option>)}
                </select>
              )}
            </div>

            <div className="col-span-2 space-y-4">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-bold opacity-70">Image de couverture</label>
                <div className="tabs tabs-boxed scale-90 p-1">
                  <button type="button" className={`tab tab-sm rounded-lg ${blogImageSource === 'url' ? 'tab-active' : ''}`} onClick={() => setBlogImageSource('url')}>URL</button>
                  <button type="button" className={`tab tab-sm rounded-lg ${blogImageSource === 'file' ? 'tab-active' : ''}`} onClick={() => setBlogImageSource('file')}>Fichier</button>
                </div>
              </div>
              {blogImageSource === 'url' ? (
                <input type="text" name="cover_image" placeholder="https://..." value={formData.cover_image} onChange={handleChange} className="input input-bordered w-full rounded-2xl bg-base-100" />
              ) : (
                <div className="flex gap-4 items-center">
                  <input type="file" onChange={(e) => handleFileChange('blog', e)} className="file-input file-input-bordered w-full rounded-2xl bg-base-100" />
                  {formData.cover_image && <img src={formData.cover_image} className="w-16 h-12 object-cover rounded-xl border border-primary/20 shadow-lg" alt="Previsualisation" />}
                </div>
              )}
            </div>

            <div className="col-span-2 space-y-2">
              <label className="text-sm font-bold opacity-70 ml-1">Résumé</label>
              <textarea name="summary" placeholder="En quelques mots..." value={formData.summary} onChange={handleChange} className="textarea textarea-bordered w-full rounded-2xl bg-base-100 h-20" />
            </div>

            <div className="col-span-2 space-y-2">
              <label className="text-sm font-bold opacity-70 ml-1">Contenu (Markdown/HTML)</label>
              <textarea name="content" placeholder="# Titre..." value={formData.content} onChange={handleChange} className="textarea textarea-bordered w-full rounded-2xl bg-base-100 font-mono" rows={12} required />
            </div>
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary w-full rounded-2xl h-14 shadow-lg shadow-primary/20 font-bold text-lg">
            {loading ? <span className="loading loading-spinner"></span> : 'Publier l\'article'}
          </button>
        </form>
      )}

      {activeTab === 'projects' && (
        <div className="space-y-12 animate-in fade-in zoom-in-95 duration-500">
          <form onSubmit={handlePublishProject} className="bg-base-200/40 p-8 rounded-[2rem] border border-base-content/5 shadow-2xl space-y-8">
            <h3 className="text-2xl font-bold ml-1">Ajouter un nouveau Projet</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold opacity-70 ml-1">Nom du projet</label>
                <input type="text" name="nom" value={projectData.nom} onChange={handleProjectChange} className="input input-bordered w-full rounded-2xl bg-base-100" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold opacity-70 ml-1">Slug</label>
                <input type="text" name="slug" value={projectData.slug} onChange={handleProjectChange} className="input input-bordered w-full rounded-2xl bg-base-100" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-sm font-bold opacity-70">Catégorie</label>
                  <button type="button" onClick={() => setShowAddProjCat(!showAddProjCat)} className="text-xs text-primary font-bold hover:underline">
                    {showAddProjCat ? "Annuler" : "+ Nouveau"}
                  </button>
                </div>
                {showAddProjCat ? (
                  <div className="flex gap-2">
                    <input type="text" value={newProjCat} onChange={(e) => setNewProjCat(e.target.value)} className="input input-bordered flex-1 rounded-2xl bg-base-100" />
                    <button type="button" onClick={handleAddProjCategory} className="btn btn-primary rounded-2xl">Ok</button>
                  </div>
                ) : (
                  <select name="category" value={projectData.category} onChange={handleProjectChange} className="select select-bordered w-full rounded-2xl bg-base-100">
                    {projCategories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold opacity-70 ml-1">Technologies (séparées par virgule)</label>
                <input type="text" name="technologies" value={projectData.technologies} onChange={handleProjectChange} placeholder="React, Node.js..." className="input input-bordered w-full rounded-2xl bg-base-100" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold opacity-70 ml-1">Lien GitHub</label>
                <input type="text" name="repository_link" value={projectData.repository_link} className="input input-bordered w-full rounded-2xl bg-base-100" onChange={handleProjectChange} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold opacity-70 ml-1">Lien Web / Live</label>
                <input type="text" name="page_link" value={projectData.page_link} className="input input-bordered w-full rounded-2xl bg-base-100" onChange={handleProjectChange} />
              </div>

              <div className="col-span-2 space-y-4">
                <div className="flex justify-between items-center px-1">
                  <label className="text-sm font-bold opacity-70">Illustration</label>
                  <div className="tabs tabs-boxed scale-90 p-1">
                    <button type="button" className={`tab tab-sm rounded-lg ${projImageSource === 'url' ? 'tab-active' : ''}`} onClick={() => setProjImageSource('url')}>URL</button>
                    <button type="button" className={`tab tab-sm rounded-lg ${projImageSource === 'file' ? 'tab-active' : ''}`} onClick={() => setProjImageSource('file')}>Fichier</button>
                  </div>
                </div>
                {projImageSource === 'url' ? (
                  <input type="text" name="image" placeholder="Image URL..." value={projectData.image} onChange={handleProjectChange} className="input input-bordered w-full rounded-2xl bg-base-100" />
                ) : (
                  <div className="flex gap-4 items-center">
                    <input type="file" onChange={(e) => handleFileChange('proj', e)} className="file-input file-input-bordered w-full rounded-2xl bg-base-100" />
                    {projectData.image && <img src={projectData.image} className="w-16 h-12 object-cover rounded-xl border border-primary/20 shadow-lg" alt="Previsualisation" />}
                  </div>
                )}
              </div>

              <div className="col-span-2 space-y-2">
                <label className="text-sm font-bold opacity-70 ml-1">README (Markdown détaillé)</label>
                <textarea name="readme" value={projectData.readme} onChange={handleProjectChange} className="textarea textarea-bordered w-full rounded-2xl bg-base-100 font-mono" rows={6} />
              </div>

              <div className="col-span-2 space-y-2">
                <label className="text-sm font-bold opacity-70 ml-1">Brève description</label>
                <textarea name="description" value={projectData.description} onChange={handleProjectChange} className="textarea textarea-bordered w-full rounded-2xl bg-base-100 h-24" />
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn btn-primary w-full rounded-2xl h-14 shadow-lg shadow-primary/20 font-bold">
              {loading ? <span className="loading loading-spinner"></span> : 'Ajouter le projet'}
            </button>
          </form>

          <div className="bg-base-300 shadow-inner rounded-[2rem] overflow-hidden">
            <table className="table table-zebra">
              <thead><tr className="bg-base-200"><th>Projet</th><th>Catégorie</th><th className="text-right">Actions</th></tr></thead>
              <tbody>
                {projectsList.map(p => (
                  <tr key={p.id} className="hover:bg-base-content/5">
                    <td className="font-bold">{p.nom}</td>
                    <td><span className="badge badge-info badge-outline rounded-lg">{p.category}</span></td>
                    <td className="text-right">
                      <button onClick={() => deleteProject(p.id)} className="btn btn-error btn-xs rounded-lg shadow-sm">Supprimer</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'comments' && (
        <div className="bg-base-200/40 border border-base-content/5 rounded-[2rem] overflow-hidden shadow-2xl animate-in fade-in slide-in-from-top-4">
          {loadingList ? <div className="flex justify-center p-20"><span className="loading loading-spinner loading-lg text-primary"></span></div> : (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead><tr className="bg-base-200"><th>Auteur</th><th>Message</th><th>Article</th><th className="text-right">Action</th></tr></thead>
                <tbody>
                  {comments.map(c => (
                    <tr key={c.id} className="hover:bg-base-content/5">
                      <td className="font-bold">{c.author_name}</td>
                      <td className="max-w-xs truncate italic">"{c.content}"</td>
                      <td><span className="badge badge-ghost badge-sm">{c.blog_posts?.title}</span></td>
                      <td className="text-right"><button onClick={() => deleteComment(c.id)} className="btn btn-error btn-xs rounded-lg">Supprimer</button></td>
                    </tr>
                  ))}
                  {comments.length === 0 && <tr><td colSpan={4} className="text-center py-20 opacity-50 italic">Aucun commentaire pour le moment.</td></tr>}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminBlog;
