import React, { useEffect, useState } from 'react';
import { supabase } from '../tools/supabase';
import AdminLists from '../components/admin/AdminLists';

const AdminCommentsPage = () => {
  const [comments, setComments] = useState<any[]>([]);
  const [loadingList, setLoadingList] = useState(false);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    setLoadingList(true);
    const { data, error } = await supabase
      .from('blog_comments')
      .select('*, blog_posts(title)')
      .order('created_at', { ascending: false });
    if (!error) setComments(data || []);
    setLoadingList(false);
  };

  return (
    <div className="mx-8 mx-auto px-4 py-12">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Commentaires</h1>
        <p className="text-sm opacity-70">Gestion des commentaires publiés.</p>
      </div>

      <AdminLists
        activeTab="comments"
        comments={comments}
        projectsList={[]}
        blogsList={[]}
        loadingList={loadingList}
        deleteComment={async () => {}}
        deleteProject={async () => {}}
        deleteBlog={async () => {}}
      />
    </div>
  );
};

export default AdminCommentsPage;
