import { useEffect, useState } from 'react';
import { supabase } from '../tools/supabase';

const AdminGalleryPage = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loadingList, setLoadingList] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [formData, setFormData] = useState({ title: '', image_url: '', description: '' });
  const itemsPerPage = 6;

  useEffect(() => {
    fetchGallery();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const fetchGallery = async () => {
    setLoadingList(true);
    const { data, error } = await supabase
      .from('gallery_items')
      .select('*')
      .order('id', { ascending: false });

    if (!error) setItems(data || []);
    setLoadingList(false);
  };

  const resetForm = () => {
    setFormData({ title: '', image_url: '', description: '' });
    setSelectedItem(null);
  };

  const openCreateDrawer = () => {
    resetForm();
    setIsDrawerOpen(true);
  };

  const openEditDrawer = (item: any) => {
    setSelectedItem(item);
    setFormData({ title: item.title || '', image_url: item.image_url || '', description: item.description || '' });
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    resetForm();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: formData.title,
      image_url: formData.image_url,
      description: formData.description,
    };

    const { error } = selectedItem
      ? await supabase.from('gallery_items').update(payload).eq('id', selectedItem.id)
      : await supabase.from('gallery_items').insert([payload]);

    if (!error) {
      closeDrawer();
      fetchGallery();
    }
  };

  const deleteItem = async (id: number) => {
    if (!window.confirm('Supprimer cet élément ?')) return;
    const { error } = await supabase.from('gallery_items').delete().eq('id', id);
    if (!error) setItems(prev => prev.filter(item => item.id !== id));
  };

  const filteredItems = items.filter((item) => {
    const term = searchTerm.toLowerCase();
    return !term || [item.title, item.description].some(value => String(value || '').toLowerCase().includes(term));
  });

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));
  const pagedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="mx-8 mx-auto px-4 py-12">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Galerie</h1>
          <p className="text-sm opacity-70">Gestion des éléments de la galerie.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Rechercher une image" className="input input-bordered input-sm rounded-2xl" />
          <button type="button" className="btn btn-primary btn-sm rounded-2xl" onClick={openCreateDrawer}>+ Nouvel élément</button>
        </div>
      </div>

      <div className="drawer drawer-end">
        <input id="gallery-drawer" type="checkbox" className="drawer-toggle" checked={isDrawerOpen} onChange={(e) => setIsDrawerOpen(e.target.checked)} />
        <div className="drawer-content">
          <div className="rounded-3xl border border-base-content/10 bg-base-200/40 p-6 overflow-x-auto">
            {loadingList ? (
              <div className="text-center py-8">Chargement...</div>
            ) : pagedItems.length === 0 ? (
              <div className="text-center py-8 opacity-70">Aucun élément dans la galerie.</div>
            ) : (
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Titre</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pagedItems.map((item) => (
                    <tr key={item.id}>
                      <td className="font-medium">{item.title || 'Sans titre'}</td>
                      <td>{item.description || '—'}</td>
                      <td>
                        {item.image_url ? <img src={item.image_url} alt={item.title || 'Galerie'} className="h-12 w-20 object-cover rounded-xl" /> : '—'}
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
          <label htmlFor="gallery-drawer" className="drawer-overlay" onClick={closeDrawer}></label>
          <div className="menu p-0 w-[420px] min-h-full bg-base-200">
            <div className="p-4 border-b border-base-content/10 flex justify-between items-center">
              <h2 className="text-xl font-bold">{selectedItem ? 'Modifier l\'élément' : 'Nouvel élément'}</h2>
              <button type="button" className="btn btn-sm btn-circle btn-ghost cursor-pointer" onClick={closeDrawer}>✕</button>
            </div>
            <div className="p-6 space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <input name="title" value={formData.title} onChange={handleChange} placeholder="Titre" className="input input-bordered w-full" required />
                <input name="image_url" value={formData.image_url} onChange={handleChange} placeholder="URL de l’image" className="input input-bordered w-full" />
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="textarea textarea-bordered w-full" rows={5} />
                <button type="submit" className="btn btn-primary w-full">Enregistrer</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminGalleryPage;
