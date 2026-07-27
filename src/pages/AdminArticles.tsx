import React, { useState, useEffect } from 'react';
import { supabase } from '../tools/supabase';
import { useNavigate } from 'react-router-dom';
import BlogForm from '../components/admin/BlogForm';
import AdminLists from '../components/admin/AdminLists';

const AdminArticlesPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    summary: '',
    content: '',
    cover_image: '',
    category: '',
    tags: '',
    status: 'published',
  });

  const [loading, setLoading] = useState(false);
  const [blogCategories, setBlogCategories] = useState(['Technologie', 'Design', 'Lifestyle', 'Projets']);
  const [newBlogCat, setNewBlogCat] = useState('');
  const [showAddBlogCat, setShowAddBlogCat] = useState(false);
  const [blogImageSource, setBlogImageSource] = useState<'url' | 'file'>('url');
  const [blogsList, setBlogsList] = useState<any[]>([]);
  const [loadingList, setLoadingList] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<any | null>(null);
  const itemsPerPage = 6;

  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
    fetchComments();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const fetchBlogs = async () => {
    setLoadingList(true);
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, title, slug, is_published, published_at')
      .order('published_at', { ascending: false });

    if (!error) setBlogsList(data || []);
    setLoadingList(false);
  };

  const fetchComments = async () => {
    setLoadingList(true);
    const { data, error } = await supabase
      .from('blog_comments')
      .select('*, blog_posts(title)')
      .order('created_at', { ascending: false });
    if (!error) setComments(data || []);
    setLoadingList(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (type: 'blog' | 'proj', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      if (type === 'blog') setFormData(prev => ({ ...prev, cover_image: imageUrl }));
    }
  };

  const handleAddBlogCategory = () => {
    if (newBlogCat && !blogCategories.includes(newBlogCat)) {
      setBlogCategories([...blogCategories, newBlogCat]);
      setFormData(prev => ({ ...prev, category: newBlogCat.toLowerCase() }));
      setNewBlogCat('');
      setShowAddBlogCat(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      summary: '',
      content: '',
      cover_image: '',
      category: '',
      tags: '',
      status: 'published',
    });
    setSelectedBlog(null);
  };

  const openCreateDrawer = () => {
    resetForm();
    setIsDrawerOpen(true);
  };

  const openEditDrawer = (blog: any) => {
    setSelectedBlog(blog);
    setFormData({
      title: blog.title || '',
      slug: blog.slug || '',
      summary: blog.summary || '',
      content: blog.content || '',
      cover_image: blog.cover_image || '',
      category: blog.category || '',
      tags: blog.tags || '',
      status: blog.is_published ? 'published' : 'draft',
    });
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    resetForm();
  };

  const deleteBlog = async (id: number) => {
    if (!window.confirm('Supprimer cet article ?')) return;
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (!error) setBlogsList(prev => prev.filter(b => b.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        title: formData.title,
        slug: formData.slug || formData.title.toLowerCase().replace(/ /g, '-'),
        summary: formData.summary,
        content: formData.content,
        cover_image: formData.cover_image,
        is_published: formData.status === 'published',
      };

      const { error } = selectedBlog
        ? await supabase.from('blog_posts').update(payload).eq('id', selectedBlog.id)
        : await supabase.from('blog_posts').insert([payload]);

      if (error) throw error;
      alert(selectedBlog ? 'Article mis à jour !' : (formData.status === 'published' ? 'Article publié !' : 'Article enregistré en brouillon !'));
      closeDrawer();
      fetchBlogs();
      navigate('/portfolio/blog');
    } catch (error: any) {
      alert('Erreur: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogsList.filter((blog) => {
    const term = searchTerm.toLowerCase();
    return !term || [blog.title, blog.slug, blog.summary].some(value => String(value || '').toLowerCase().includes(term));
  });

  const totalPages = Math.max(1, Math.ceil(filteredBlogs.length / itemsPerPage));
  const pagedBlogs = filteredBlogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="mx-8 mx-auto px-4 py-12">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Articles</h1>
          <p className="text-sm opacity-70">Gestion des articles et de leurs commentaires.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher un article"
            className="input input-bordered input-sm rounded-2xl"
          />
          <button type="button" className="btn btn-primary btn-sm rounded-2xl" onClick={openCreateDrawer}>+ Nouvel Article</button>
        </div>
      </div>

      <div className="drawer drawer-end">
        <input id="blog-drawer" type="checkbox" className="drawer-toggle" checked={isDrawerOpen} onChange={(e) => setIsDrawerOpen(e.target.checked)} />
        <div className="drawer-content">
          <AdminLists
            activeTab="create"
            comments={comments}
            projectsList={[]}
            blogsList={pagedBlogs}
            loadingList={loadingList}
            deleteComment={async () => {}}
            deleteProject={async () => {}}
            deleteBlog={deleteBlog}
            onEditBlog={openEditDrawer}
          />

          <div className="flex justify-center gap-2 mt-4">
            <button className="btn btn-sm" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>Précédent</button>
            <span className="btn btn-sm btn-ghost">{currentPage}/{totalPages}</span>
            <button className="btn btn-sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>Suivant</button>
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="blog-drawer" className="drawer-overlay" onClick={closeDrawer}></label>
          <div className="menu p-0 w-[500px] min-h-full bg-base-200">
            <div className="p-4 border-b border-base-content/10 flex justify-between items-center">
              <h2 className="text-xl font-bold">{selectedBlog ? 'Modifier l\'article' : 'Nouvel Article'}</h2>
              <button type="button" className="btn btn-sm btn-circle btn-ghost cursor-pointer" onClick={closeDrawer}>✕</button>
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
                handleSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminArticlesPage;
