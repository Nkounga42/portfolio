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

  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
    fetchComments();
  }, []);

  const fetchBlogs = async () => {
    setLoadingList(true);
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, title, slug, is_published, published_at')
      .eq('is_published', true)
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
        is_published: formData.status === 'published',
      }]);
      if (error) throw error;
      alert(formData.status === 'published' ? 'Article publié !' : 'Article enregistré en brouillon !');
      navigate('/portfolio/blog');
    } catch (error: any) {
      alert('Erreur: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-8 mx-auto px-4 py-12">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Articles</h1>
        <p className="text-sm opacity-70">Gestion des articles et de leurs commentaires.</p>
      </div>

      <div className="drawer drawer-end">
        <input id="blog-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <AdminLists
            activeTab="create"
            comments={comments}
            projectsList={[]}
            blogsList={blogsList}
            loadingList={loadingList}
            deleteComment={async () => {}}
            deleteProject={async () => {}}
            deleteBlog={async () => {}}
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
    </div>
  );
};

export default AdminArticlesPage;
