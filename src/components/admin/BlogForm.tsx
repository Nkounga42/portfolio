import React from 'react';

interface BlogFormProps {
  formData: any;
  loading: boolean;
  blogCategories: string[];
  newBlogCat: string;
  showAddBlogCat: boolean;
  blogImageSource: 'url' | 'file';
  setNewBlogCat: (val: string) => void;
  setShowAddBlogCat: (val: boolean) => void;
  setBlogImageSource: (val: 'url' | 'file') => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleFileChange: (type: 'blog' | 'proj', e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddBlogCategory: () => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const BlogForm: React.FC<BlogFormProps> = ({
  formData,
  loading,
  blogCategories,
  newBlogCat,
  showAddBlogCat,
  blogImageSource,
  setNewBlogCat,
  setShowAddBlogCat,
  setBlogImageSource,
  handleChange,
  handleFileChange,
  handleAddBlogCategory,
  handleSubmit
}) => {
  return (
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
  );
};

export default BlogForm;
