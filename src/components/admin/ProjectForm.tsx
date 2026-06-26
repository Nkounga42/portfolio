import React from 'react';

interface ProjectFormProps {
  projectData: any;
  loading: boolean;
  projCategories: string[];
  newProjCat: string;
  showAddProjCat: boolean;
  projImageSource: 'url' | 'file';
  setNewProjCat: (val: string) => void;
  setShowAddProjCat: (val: boolean) => void;
  setProjImageSource: (val: 'url' | 'file') => void;
  handleProjectChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleFileChange: (type: 'blog' | 'proj', e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddProjCategory: () => void;
  handlePublishProject: (e: React.FormEvent) => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  projectData,
  loading,
  projCategories,
  newProjCat,
  showAddProjCat,
  projImageSource,
  setNewProjCat,
  setShowAddProjCat,
  setProjImageSource,
  handleProjectChange,
  handleFileChange,
  handleAddProjCategory,
  handlePublishProject
}) => {
  return (
    <form onSubmit={handlePublishProject} className="pl-4 w-1/3 space-y-10">
      <h3 className="text-2xl font-bold ml-1">Ajouter un nouveau Projet</h3>
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-bold opacity-70 ml-1">Nom du projet *</label>
          <input type="text" name="nom" value={projectData.nom} onChange={handleProjectChange} className="input input-bordered w-full rounded-md bg-base-100" required />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold opacity-70 ml-1">Slug</label>
          <input type="text" name="slug" value={projectData.slug} onChange={handleProjectChange} className="input input-bordered w-full rounded-md bg-base-100" />
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
              <input type="text" value={newProjCat} onChange={(e) => setNewProjCat(e.target.value)} className="input input-bordered flex-1 rounded-md bg-base-100" />
              <button type="button" onClick={handleAddProjCategory} className="btn btn-primary rounded-md">Ok</button>
            </div>
          ) : (
            <select name="category" value={projectData.category} onChange={handleProjectChange} className="select select-bordered w-full rounded-md bg-base-100">
              {projCategories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold opacity-70 ml-1">Technologies (séparées par virgule)</label>
          <input type="text" name="technologies" value={projectData.technologies} onChange={handleProjectChange} placeholder="React, Node.js..." className="input input-bordered w-full rounded-md bg-base-100" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold opacity-70 ml-1">Lien GitHub</label>
          <input type="text" name="repository_link" value={projectData.repository_link} className="input input-bordered w-full rounded-md bg-base-100" onChange={handleProjectChange} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold opacity-70 ml-1">Lien Web / Live</label>
          <input type="text" name="page_link" value={projectData.page_link} className="input input-bordered w-full rounded-md bg-base-100" onChange={handleProjectChange} />
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
            <input type="text" name="image" placeholder="Image URL..." value={projectData.image} onChange={handleProjectChange} className="input input-bordered w-full rounded-md bg-base-100" />
          ) : (
            <div className="flex gap-4 items-center">
              <input type="file" onChange={(e) => handleFileChange('proj', e)} className="file-input file-input-bordered w-full rounded-md bg-base-100" />
              {projectData.image && <img src={projectData.image} className="w-16 h-12 object-cover rounded-xl border border-primary/20 shadow-lg" alt="Previsualisation" />}
            </div>
          )}
        </div>

        <div className="col-span-2 space-y-2">
          <label className="text-sm font-bold opacity-70 ml-1">README (Markdown détaillé)</label>
          <textarea name="readme" value={projectData.readme} onChange={handleProjectChange} className="textarea textarea-bordered w-full rounded-md bg-base-100 font-mono" rows={6} />
        </div>

        <div className="col-span-2 space-y-2">
          <label className="text-sm font-bold opacity-70 ml-1">Brève description</label>
          <textarea name="description" value={projectData.description} onChange={handleProjectChange} className="textarea textarea-bordered w-full rounded-md bg-base-100 h-24" />
        </div>
      </div>
      <button type="submit" disabled={loading} className="btn btn-primary w-full rounded-md h-14 shadow-lg shadow-primary/20 font-bold">
        {loading ? <span className="loading loading-spinner"></span> : 'Ajouter le projet'}
      </button>
    </form>
  );
};

export default ProjectForm;
