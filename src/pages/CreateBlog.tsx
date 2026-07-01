import React, { useState, useEffect } from 'react';
import { supabase } from '../tools/supabase';
import { useNavigate } from 'react-router-dom';
import BlogForm from '../components/admin/BlogForm';
import ProjectForm from '../components/admin/ProjectForm';
import AdminLists from '../components/admin/AdminLists';

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
  const [blogsList, setBlogsList] = useState<any[]>([]);
  const [loadingList, setLoadingList] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (activeTab === 'comments') fetchComments();
    if (activeTab === 'projects') fetchProjects();
    if (activeTab === 'create') fetchBlogs();
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

  const fetchBlogs = async () => {
    setLoadingList(true);
    const { data, error } = await supabase
      .from('blog_posts')
      // On remplace created_at par published_at
      .select('id, title, slug, is_published, published_at')
      .order('published_at', { ascending: false }); // Tri par date de publication

    if (!error) setBlogsList(data || []);
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

  const deleteBlog = async (id: number) => {
    if (!window.confirm('Supprimer cet article ?')) return;
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (!error) setBlogsList(blogsList.filter(b => b.id !== id));
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
    <div className="mx-8 mx-auto px-4 py-12">
      <div className='flex '>
        <div className="flex justify-end mb-4">
          {activeTab === 'create' && (
            <label htmlFor="blog-drawer" className="btn btn-primary rounded-2xl cursor-pointer">
              + Nouvel Article
            </label>
          )}
          {activeTab === 'projects' && (
            <label htmlFor="project-drawer" className="btn btn-primary rounded-2xl cursor-pointer">
              + Nouveau Projet
            </label>
          )}
        </div>
      <div className="tabs tabs-boxed bg-base-300 inline-flex p-1 rounded-2xl shadow-lg border border-base-content/5">
        <button className={`tab rounded-xl tab-lg font-semibold transition-all duration-300 ${activeTab === 'create' ? 'tab-active bg-primary text-primary-content shadow-md' : 'hover:bg-base-content/10'}`} onClick={() => setActiveTab('create')}>Articles</button>
        <button className={`tab rounded-xl tab-lg font-semibold transition-all duration-300 ${activeTab === 'projects' ? 'tab-active bg-primary text-primary-content shadow-md' : 'hover:bg-base-content/10'}`} onClick={() => setActiveTab('projects')}>Projets</button>
        <button className={`tab rounded-xl tab-lg font-semibold transition-all duration-300 ${activeTab === 'comments' ? 'tab-active bg-primary text-primary-content shadow-md' : 'hover:bg-base-content/10'}`} onClick={() => setActiveTab('comments')}>Commentaires</button>
      </div>
      </div>

      {activeTab === 'create' && (
        <div className="drawer drawer-end">
          <input id="blog-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">

            <AdminLists
              activeTab={activeTab}
              comments={comments}
              projectsList={projectsList}
              blogsList={blogsList}
              loadingList={loadingList}
              deleteComment={deleteComment}
              deleteProject={deleteProject}
              deleteBlog={deleteBlog}
            />
          </div>
          <div className="drawer-side">
            <label htmlFor="blog-drawer" className="drawer-overlay"></label>
            <div className="menu p-0 w-[500px] min-h-full bg-base-200">
              <div className="p-4 border-b border-base-content/10 flex justify-between items-center">
                <h2 className="text-xl font-bold">Nouvel Article</h2>
                <label htmlFor="blog-drawer" className="btn btn-sm btn-circle btn-ghost cursor-pointer">✕</label>
              </div>
              <div className="p-6 overflow-y-auto h-[calc(100vh-80px)]">
                <BlogForm
                  formData={formData}
                  loading={loading}
                  blogCategories={blogCategories}
                  newBlogCat={newBlogCat}
                  showAddBlogCat={showAddBlogCat}
                  blogImageSource={blogImageSource}
                  setNewBlogCat={setNewBlogCat}
                  setShowAddBlogCat={setShowAddBlogCat}
                  setBlogImageSource={setBlogImageSource}
                  handleChange={handleChange}
                  handleFileChange={handleFileChange}
                  handleAddBlogCategory={handleAddBlogCategory}
                  handleSubmit={(e) => {
                    handleSubmit(e);
                    const checkbox = document.getElementById('blog-drawer') as HTMLInputElement;
                    if (checkbox) checkbox.checked = false;
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'projects' && (
        <div className="drawer drawer-end">
          <input id="project-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">

            <AdminLists
              activeTab={activeTab}
              comments={comments}
              projectsList={projectsList}
              blogsList={blogsList}
              loadingList={loadingList}
              deleteComment={deleteComment}
              deleteProject={deleteProject}
              deleteBlog={deleteBlog}
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
      )}

      {activeTab === 'comments' && (
        <AdminLists
          activeTab={activeTab}
          comments={comments}
          projectsList={projectsList}
          blogsList={blogsList}
          loadingList={loadingList}
          deleteComment={deleteComment}
          deleteProject={deleteProject}
          deleteBlog={deleteBlog}
        />
      )}
    </div>
  );
};

export default AdminBlog;
