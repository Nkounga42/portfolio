import React, { useState } from 'react';

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    summary: '',
    content: '',
    cover_image: '',
    category: '',
    tags: '',
  });

  const [categories, setCategories] = useState(['Technologie', 'Design', 'Lifestyle', 'Projets']);
  const [newCat, setNewCat] = useState('');
  const [showAddCat, setShowAddCat] = useState(false);
  const [imageSourceType, setImageSourceType] = useState<'url' | 'file'>('url');

  const handleAddCategory = () => {
    if (newCat && !categories.includes(newCat)) {
      setCategories([...categories, newCat]);
      setFormData(prev => ({ ...prev, category: newCat.toLowerCase() }));
      setNewCat('');
      setShowAddCat(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Pour la simulation, on crée un URL local
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, cover_image: imageUrl }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Post Data:', formData);
    alert('Article créé (simulation)');
  };

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
    setFormData(prev => ({ ...prev, slug }));
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-base-content mb-2">Créer un nouvel article</h1>
        <p className="text-base-content/60">Partagez vos connaissances avec le monde.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-base-200/30 p-8 rounded-3xl border border-base-content/5 shadow-xl backdrop-blur-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Titre */}
          <div className="space-y-2 col-span-2">
            <label className="text-sm font-medium text-base-content/80">Titre de l'article</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              onBlur={generateSlug}
              placeholder="Ex: Les secrets de React Performance"
              className="w-full px-4 py-3 rounded-xl bg-base-100 border border-base-content/10 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              required
            />
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-base-content/80">URL (Slug)</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="mon-article-react"
              className="w-full px-4 py-3 rounded-xl bg-base-100 border border-base-content/10 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              required
            />
          </div>

          {/* Catégorie */}
          <div className="space-y-2 relative">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-base-content/80">Catégorie</label>
              <button 
                type="button" 
                onClick={() => setShowAddCat(!showAddCat)}
                className="text-xs text-primary hover:underline font-medium"
              >
                {showAddCat ? "Annuler" : "+ Nouvelle catégorie"}
              </button>
            </div>
            
            {showAddCat ? (
              <div className="flex gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <input
                  type="text"
                  value={newCat}
                  onChange={(e) => setNewCat(e.target.value)}
                  placeholder="Nom de la catégorie"
                  className="flex-1 px-4 py-3 rounded-xl bg-base-100 border border-base-content/10 focus:border-primary outline-none transition-all"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="px-4 py-3 rounded-xl bg-primary text-primary-content font-bold hover:opacity-90 transition-opacity"
                >
                  Ajouter
                </button>
              </div>
            ) : (
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-base-100 border border-base-content/10 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              >
                <option value="">Sélectionner une catégorie</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat.toLowerCase()}>{cat}</option>
                ))}
              </select>
            )}
          </div>

          {/* Image de couverture */}
          <div className="space-y-4 col-span-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-base-content/80">Image de couverture</label>
              <div className="flex bg-base-100 p-1 rounded-lg border border-base-content/10">
                <button
                  type="button"
                  onClick={() => setImageSourceType('url')}
                  className={`px-3 py-1 text-xs rounded-md transition-all ${imageSourceType === 'url' ? 'bg-primary text-primary-content shadow-sm' : 'hover:bg-base-content/5'}`}
                >
                  URL
                </button>
                <button
                  type="button"
                  onClick={() => setImageSourceType('file')}
                  className={`px-3 py-1 text-xs rounded-md transition-all ${imageSourceType === 'file' ? 'bg-primary text-primary-content shadow-sm' : 'hover:bg-base-content/5'}`}
                >
                  Fichier
                </button>
              </div>
            </div>

            {imageSourceType === 'url' ? (
              <input
                type="text"
                name="cover_image"
                value={formData.cover_image}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-4 py-3 rounded-xl bg-base-100 border border-base-content/10 focus:border-primary outline-none transition-all"
              />
            ) : (
              <div className="relative group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="cover-upload"
                />
                <label 
                  htmlFor="cover-upload"
                  className="flex flex-col items-center justify-center w-full h-32 px-4 transition bg-base-100 border-2 border-dashed rounded-xl border-base-content/20 hover:border-primary/50 cursor-pointer group-hover:bg-base-200/50"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-3 text-base-content/40 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                    <p className="mb-2 text-sm text-base-content/60"><span className="font-semibold">Cliquez pour télécharger</span> ou glisser-déposer</p>
                    <p className="text-xs text-base-content/40 text-center">PNG, JPG, WebP jusqu'à 5MB</p>
                  </div>
                  {formData.cover_image && imageSourceType === 'file' && (
                    <div className="absolute inset-0 bg-base-100 rounded-xl flex items-center p-2">
                       <img src={formData.cover_image} className="h-full w-24 object-cover rounded-lg mr-4" alt="Prévisualisation" />
                       <span className="text-sm truncate opacity-60">Fichier prêt à l'envoi</span>
                    </div>
                  )}
                </label>
              </div>
            )}
          </div>

          {/* Résumé */}
          <div className="space-y-2 col-span-2">
            <label className="text-sm font-medium text-base-content/80">Résumé (Summary)</label>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              rows={2}
              placeholder="Une brève description pour donner envie de lire..."
              className="w-full px-4 py-3 rounded-xl bg-base-100 border border-base-content/10 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
            />
          </div>

          {/* Contenu */}
          <div className="space-y-2 col-span-2">
            <label className="text-sm font-medium text-base-content/80">Contenu (Markdown)</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={12}
              placeholder="# Votre article commence ici..."
              className="w-full px-4 py-3 rounded-xl bg-base-100 border border-base-content/10 font-mono text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              required
            />
          </div>

          {/* Tags */}
          <div className="space-y-2 col-span-2">
            <label className="text-sm font-medium text-base-content/80">Tags (séparés par des virgules)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="React, Frontend, Web"
              className="w-full px-4 py-3 rounded-xl bg-base-100 border border-base-content/10 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-4">
          <button
            type="button"
            className="px-6 py-3 rounded-xl border border-base-content/10 hover:bg-base-content/5 transition-colors"
          >
            Sauvegarder Brouillon
          </button>
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-primary text-primary-content hover:opacity-90 transition-opacity font-semibold"
          >
            Publier l'article
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
