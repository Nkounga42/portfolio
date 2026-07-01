import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../tools/supabase";

interface BlogPost {
  id: number;
  title: string;
  summary: string;
  cover_image: string;
  category: string;
  created_at: string;
  slug: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('id', { ascending: false });

      if (error) {
        console.error('Erreur Supabase (Blog):', error.message);
      } else if (data) {
        setPosts(data as BlogPost[]);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="py-24 sm:py-32 text-center">
        <span className="loading loading-dots loading-lg text-primary"></span>
        <p className="mt-4 text-base-content/50">Chargement des articles...</p>
      </div>
    );
  }

  return (
    <div className=" mt-15">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-2xl font-semibold tracking-tight text-pretty text-base-content  ">Mon Blog</h2>
          <p className="mt-2 text-base-content/70">Partage d'expériences, tutoriels et nouveautés technologiques.</p>
        </div>
        <div className="mx-auto  grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16   sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <article key={post.id} className="flex max-w-xl flex-col items-start justify-between group">
                <Link to={`/portfolio/blog/${post.slug}`} className="w-full">
                  <div className="w-full aspect-video overflow-hidden rounded-2xl mb-6 bg-base-200">
                    <img 
                      src={post.cover_image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop'} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.published_at} className="text-base-content/70">
                    {formatDate(post.published_at)}
                  </time>
                  <span
                    className="relative z-10 rounded-full bg-primary/10 px-3 py-1.5 font-medium text-primary"
                  >
                    {post.category}
                  </span>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg/6 font-semibold text-base-content group-hover:text-primary transition-colors">
                    <Link to={`/portfolio/blog/${post.slug}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h3>
                  {/* <p className="mt-5 line-clamp-3 text-sm/6 text-base-content/70">{post.summary}</p> */}
                </div>
                {/* <div className="relative mt-8 flex items-center gap-x-4 border-t border-base-content/5 pt-4 w-full">
                  <img alt="Gil Nkounga" src="https://avatars.githubusercontent.com/u/104117820?v=4" className="size-10 rounded-full bg-gray-50" />
                  <div className="text-sm/6">
                    <p className="font-semibold text-base-content">
                      <span className="absolute inset-0" />
                      Gil Nkounga
                    </p>
                    <p className="text-base-content/70 text-xs">Développeur Full-Stack</p>
                  </div>
                </div> */}
              </article>
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-base-200/30 rounded-3xl border border-dashed border-base-content/10">
              <p className="text-lg opacity-60">Aucun article publié pour le moment.</p>
              <p className="text-sm opacity-40 mt-2">Revenez bientôt pour de nouvelles découvertes !</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
