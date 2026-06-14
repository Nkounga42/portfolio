import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../tools/supabase';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  cover_image: string;
  category: string;
  tags: string;
  created_at: string;
}

const ReadBlog = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  // Identifiant unique pour le visiteur (simulation simple)
  const [visitorId] = useState(() => {
    const saved = localStorage.getItem('visitor_id');
    if (saved) return saved;
    const id = 'v_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('visitor_id', id);
    return id;
  });

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) {
        console.error('Erreur Supabase (ReadBlog):', error.message);
      } else if (data) {
        setPost(data as BlogPost);
        await fetchEngagement(data.id);
      }
      setLoading(false);
    };

    const fetchEngagement = async (postId: number) => {
      // Fetch Likes
      const { count } = await supabase
        .from('blog_post_likes')
        .select('*', { count: 'exact', head: true })
        .eq('post_id', postId);
      
      setLikes(count || 0);

      // Check if user already liked
      const { data: userLike } = await supabase
        .from('blog_post_likes')
        .select('*')
        .eq('post_id', postId)
        .eq('user_identifier', visitorId)
        .maybeSingle();
      
      setIsLiked(!!userLike);

      // Fetch Comments
      const { data: commentsData } = await supabase
        .from('blog_comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });
      
      setComments(commentsData || []);
    };

    if (slug) fetchPost();
  }, [slug, visitorId]);

  const handleLike = async () => {
    if (!post) return;

    if (!isLiked) {
      setLikes(prev => prev + 1);
      setIsLiked(true);
      await supabase.from('blog_post_likes').insert({
        post_id: post.id,
        user_identifier: visitorId
      });
    } else {
      setLikes(prev => prev - 1);
      setIsLiked(false);
      await supabase.from('blog_post_likes')
        .delete()
        .eq('post_id', post.id)
        .eq('user_identifier', visitorId);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post || !newComment.trim() || !authorName.trim()) return;

    setIsSubmittingComment(true);
    const { data, error } = await supabase
      .from('blog_comments')
      .insert({
        post_id: post.id,
        author_name: authorName,
        content: newComment
      })
      .select()
      .single();

    if (!error && data) {
      setComments(prev => [...prev, data]);
      setNewComment("");
    } else {
      console.error("Erreur commentaire:", error);
    }
    setIsSubmittingComment(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-4 opacity-50 italic">Chargement de l'article...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Oups ! Article introuvable.</h2>
        <p className="opacity-70 mb-8 text-lg">Cet article semble avoir disparu dans les méandres du web.</p>
        <Link to="/portfolio/blog" className="btn btn-primary rounded-full">
          Retour au blog
        </Link>
      </div>
    );
  }

  const tagList = post.tags ? post.tags.split(',').map(t => t.trim()) : [];

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <img 
          src={post.cover_image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop'} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-base-100/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold backdrop-blur-md border border-primary/20">
              {post.category}
            </span>
            {tagList.map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full bg-base-content/10 text-base-content text-xs font-semibold backdrop-blur-md">
                #{tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-base-content mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center text-base-content/60 gap-6 text-sm">
            <div className="flex items-center gap-2">
              <img src="https://avatars.githubusercontent.com/u/104117820?v=4" className="w-6 h-6 rounded-full" alt="Gil Nkounga" />
              <span>Par <span className="text-primary font-medium">Gil Nkounga</span></span>
            </div>
            <span>•</span>
            <span>{formatDate(post.created_at)}</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <article className="max-w-3xl mx-auto px-6 py-12">
        {/* Résumé/Intro */}
        {post.summary && (
           <p className="text-xl text-base-content/70 italic border-l-4 border-primary pl-6 mb-12 leading-relaxed">
             {post.summary}
           </p>
        )}

        <div 
          className="prose prose-lg prose-base-content max-w-none 
            prose-headings:text-base-content prose-headings:font-bold
            prose-p:text-base-content/80 prose-p:leading-relaxed
            prose-strong:text-base-content prose-blockquote:border-primary
            prose-blockquote:text-base-content/70 prose-blockquote:bg-base-200/50
            prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-xl
            prose-img:rounded-3xl prose-a:text-primary hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Engagement Bar */}
        <div className="mt-16 flex items-center justify-between py-8 border-y border-base-content/10">
          <div className="flex gap-4">
            <button 
              onClick={handleLike}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all border ${
                isLiked ? 'bg-error border-error text-error-content' : 'border-base-content/10 hover:bg-base-content/5'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={isLiked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="font-bold">{likes} Likes</span>
            </button>
          </div>

          <div className="flex gap-2">
             <Link to="/portfolio/blog" className="btn btn-ghost rounded-full">
                Voir plus d'articles
             </Link>
          </div>
        </div>

        {/* Section Commentaires */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold mb-10">Commentaires ({comments.length})</h3>
          
          {/* Formulaire de commentaire */}
          <form onSubmit={handleAddComment} className="mb-12 bg-base-200/50 p-6 rounded-3xl border border-base-content/5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input 
                type="text" 
                placeholder="Votre nom" 
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="input input-bordered rounded-xl bg-base-100"
                required
              />
            </div>
            <textarea 
              placeholder="Ajouter un commentaire..." 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="textarea textarea-bordered w-full h-32 rounded-2xl bg-base-100 mb-4"
              required
            ></textarea>
            <button 
              type="submit" 
              disabled={isSubmittingComment}
              className="btn btn-primary rounded-xl px-8"
            >
              {isSubmittingComment ? 'Envoi...' : 'Publier le commentaire'}
            </button>
          </form>

          {/* Liste des commentaires */}
          <div className="space-y-6">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="p-6 rounded-2xl bg-base-200/30 border border-base-content/5 group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {comment.author_name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-bold text-base-content">{comment.author_name}</h4>
                        <p className="text-xs opacity-50">{formatDate(comment.created_at)}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-base-content/80 leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center opacity-50 italic py-10">Aucun commentaire pour le moment. Soyez le premier à réagir !</p>
            )}
          </div>
        </div>
      </article>
    </div>
  );
};

export default ReadBlog;
