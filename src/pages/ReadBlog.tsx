import { useState } from 'react';
import { useParams } from 'react-router-dom';

const mockPost = {
  id: 1,
  title: "L'art de coder des interfaces élégantes",
  slug: "art-coder-interfaces-elegantes",
  summary: "Comment allier performance technique et esthétique visuelle dans vos projets Web.",
  content: `
    <p>Le design ne se limite pas à ce à quoi ressemble un produit, mais à la façon dont il fonctionne. Dans le développement web moderne, cette philosophie est plus pertinente que jamais.</p>
    <h2>La typographie est la clé</h2>
    <p>Une bonne typographie améliore non seulement la lisibilité mais définit également le ton de votre application. Utilisez des polices qui respirent et des hauteurs de ligne généreuses.</p>
    <blockquote>"Le design est le silence qui permet au contenu de crier."</blockquote>
    <p>Ensuite, parlons de la hiérarchie visuelle. Vos yeux doivent être guidés naturellement à travers la page par l'utilisation judicieuse de l'espace blanc et des contrastes.</p>
  `,
  cover_image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072",
  published_at: "2025-06-14",
  author: "Gil Nkounga",
  views_count: 1240,
  likes_count: 85,
  tags: ["Design", "React", "Frontend"]
};

const ReadBlog = () => {
  const { slug } = useParams();
  console.log('Lecture de l\'article:', slug);
  const [likes, setLikes] = useState(mockPost.likes_count);
  const [isLiked, setIsLiked] = useState(false);
  const [comments] = useState([
    { id: 1, author: "Alice", content: "Super article ! Très instructif.", date: "Il y a 2 heures", replies: [] },
    { id: 2, author: "Bob", content: "J'aimerais en savoir plus sur la gestion des couleurs.", date: "Il y a 5 heures", replies: [
        { id: 3, author: "Gil", content: "C'est prévu pour le prochain article Bob !", date: "Il y a 1 heure" }
    ] },
  ]);

  const handleLike = () => {
    if (!isLiked) {
      setLikes(prev => prev + 1);
      setIsLiked(true);
    } else {
      setLikes(prev => prev - 1);
      setIsLiked(false);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <img 
          src={mockPost.cover_image} 
          alt={mockPost.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base-100 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-4xl mx-auto">
          <div className="flex gap-2 mb-4">
            {mockPost.tags.map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold backdrop-blur-md border border-primary/20">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-base-content mb-4 leading-tight">
            {mockPost.title}
          </h1>
          <div className="flex items-center text-base-content/60 gap-6 text-sm">
            <span>Par <span className="text-primary font-medium">{mockPost.author}</span></span>
            <span>•</span>
            <span>{mockPost.published_at}</span>
            <span>•</span>
            <span>{mockPost.views_count} vues</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <article className="max-w-3xl mx-auto px-6 py-12">
        <div 
          className="prose prose-lg prose-base-content max-w-none 
            prose-headings:text-base-content prose-p:text-base-content/80 
            prose-strong:text-base-content prose-blockquote:border-primary
            prose-blockquote:text-base-content/70 prose-blockquote:bg-primary/5
            prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-xl"
          dangerouslySetInnerHTML={{ __html: mockPost.content }}
        />

        {/* Engagement Bar */}
        <div className="mt-16 flex items-center justify-between py-6 border-y border-base-content/10">
          <button 
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
              isLiked ? 'bg-error text-error-content' : 'hover:bg-base-content/5'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={isLiked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="font-semibold">{likes} Likes</span>
          </button>

          <div className="flex gap-4">
            <button className="p-2 rounded-full hover:bg-base-content/5 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6 Lozl6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-8">Commentaires ({comments.length})</h3>
          
          {/* New Comment Input */}
          <div className="mb-10 flex gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex-shrink-0"></div>
            <div className="flex-1 space-y-3">
              <textarea 
                placeholder="Écrire un commentaire..."
                className="w-full p-4 rounded-2xl bg-base-200 border border-base-content/5 outline-none focus:border-primary transition-colors resize-none"
                rows={3}
              ></textarea>
              <button className="px-6 py-2 rounded-xl bg-primary text-primary-content font-medium hover:opacity-90 transition-opacity">
                Publier
              </button>
            </div>
          </div>

          {/* Comment List */}
          <div className="space-y-8">
            {comments.map(comment => (
              <div key={comment.id} className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-base-300"></div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{comment.author}</span>
                      <span className="text-xs text-base-content/50">{comment.date}</span>
                    </div>
                    <p className="mt-1 text-base-content/80">{comment.content}</p>
                    <button className="mt-2 text-xs font-semibold text-primary hover:underline">Répondre</button>
                  </div>
                </div>
                
                {/* Replies */}
                {comment.replies.map(reply => (
                  <div key={reply.id} className="ml-14 flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10"></div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{reply.author}</span>
                        <span className="text-xs text-base-content/50">{reply.date}</span>
                      </div>
                      <p className="mt-1 text-base-content/80">{reply.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
};

export default ReadBlog;
