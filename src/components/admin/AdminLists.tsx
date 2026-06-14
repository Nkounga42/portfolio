import React from 'react';

interface AdminListsProps {
  activeTab: 'create' | 'projects' | 'comments';
  comments: any[];
  projectsList: any[];
  loadingList: boolean;
  deleteComment: (id: number) => void;
  deleteProject: (id: number) => void;
}

const AdminLists: React.FC<AdminListsProps> = ({
  activeTab,
  comments,
  projectsList,
  loadingList,
  deleteComment,
  deleteProject
}) => {
  if (activeTab === 'projects') {
    return (
      <div className="bg-base-300 shadow-inner rounded-xl w-2/3 overflow-hidden animate-in fade-in zoom-in-95 duration-500">
        <table className="table table-zebra w-full">
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
    );
  }

  if (activeTab === 'comments') {
    return (
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
    );
  }

  return null;
};

export default AdminLists;
