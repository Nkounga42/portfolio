import { supabase } from '../tools/supabase';

// Fonction pour récupérer tous les projets
export async function getProjects(category?: string) {
  try {
    console.log('🔍 AI called getProjects with category:', category);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('id', { ascending: false });
    
    console.log('📦 getProjects query result:', { data, error });
    
    if (error) throw error;
    
    let result = data || [];
    // Filtrage côté client si catégorie demandée et valide
    if (category && typeof category === 'string' && category !== 'All' && category !== '{}' && result.length > 0) {
      result = result.filter((project: any) => project.category === category);
      console.log('🔽 getProjects filtered result:', result);
    }
    
    const serialized = JSON.parse(JSON.stringify(result));
    console.log('✅ getProjects returning:', serialized.length, 'projects');
    return serialized;
  } catch (error) {
    console.error('❌ Error fetching projects:', error);
    return [];
  }
}

// Fonction pour récupérer un projet par son slug
export async function getProjectBySlug(slug: string) {
  try {
    console.log('🔍 AI called getProjectBySlug with slug:', slug);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single();
    
    console.log('📦 getProjectBySlug result:', { data, error });
    
    if (error) throw error;
    const result = data ? JSON.parse(JSON.stringify(data)) : null;
    console.log('✅ getProjectBySlug returning:', result);
    return result;
  } catch (error) {
    console.error('❌ Error fetching project by slug:', error);
    return null;
  }
}

// Fonction pour récupérer tous les articles de blog
export async function getBlogPosts(category?: string) {
  try {
    console.log('🔍 AI called getBlogPosts with category:', category);
    console.log('Supabase client:', supabase);

    // Test simple sans filtre
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*');

    console.log('📦 Blog posts raw query result:', { data, error, dataLength: data?.length });

    if (error) {
      console.error('❌ Supabase error details:', error);
      throw error;
    }

    let result = data || [];
    console.log('📋 Result before filtering:', result);

    // Filtrage côté client si catégorie demandée et valide
    if (category && typeof category === 'string' && category !== '{}' && result.length > 0) {
      result = result.filter((post: any) => post.category === category);
      console.log('🔽 Result after filtering by category:', result);
    }

    const serialized = JSON.parse(JSON.stringify(result));
    console.log('✅ Final serialized result:', serialized.length, 'posts');
    return serialized;
  } catch (error) {
    console.error('❌ Error fetching blog posts:', error);
    return [];
  }
}

// Fonction pour récupérer un article de blog par son slug
export async function getBlogPostBySlug(slug: string) {
  try {
    console.log('🔍 AI called getBlogPostBySlug with slug:', slug);
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single();
    
    console.log('📦 getBlogPostBySlug result:', { data, error });
    
    if (error) throw error;
    const result = data ? JSON.parse(JSON.stringify(data)) : null;
    console.log('✅ getBlogPostBySlug returning:', result);
    return result;
  } catch (error) {
    console.error('❌ Error fetching blog post by slug:', error);
    return null;
  }
}

// Fonction pour récupérer toutes les images de la galerie
export async function getGalleryImages(category?: string) {
  try {
    console.log('🔍 AI called getGalleryImages with category:', category);
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });
    
    console.log('📦 getGalleryImages query result:', { data, error });
    
    if (error) throw error;
    
    let result = data || [];
    // Filtrage côté client si catégorie demandée et valide
    if (category && typeof category === 'string' && category !== '{}' && result.length > 0) {
      result = result.filter((image: any) => image.category === category);
      console.log('🔽 getGalleryImages filtered result:', result);
    }
    
    const serialized = JSON.parse(JSON.stringify(result));
    console.log('✅ getGalleryImages returning:', serialized.length, 'images');
    return serialized;
  } catch (error) {
    console.error('❌ Error fetching gallery images:', error);
    return [];
  }
}

// Fonction pour récupérer une image de galerie par son ID
export async function getGalleryImageById(id: number) {
  try {
    console.log('� AI called getGalleryImageById with id:', id);
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .eq('id', id)
      .single();
    
    console.log('📦 getGalleryImageById result:', { data, error });
    
    if (error) throw error;
    const result = data ? JSON.parse(JSON.stringify(data)) : null;
    console.log('✅ getGalleryImageById returning:', result);
    return result;
  } catch (error) {
    console.error('❌ Error fetching gallery image by id:', error);
    return null;
  }
}

// Définition des outils pour l'IA
export const AI_TOOLS = [
  {
    name: 'getProjects',
    description: 'Récupère tous les projets du portfolio. Peut filtrer par catégorie si spécifié.',
    parameters: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          enum: ['All', 'Web App', 'Desktop', 'Mobile', 'API', 'Illustration'],
          description: 'Catégorie de projets à filtrer (optionnel)'
        }
      }
    }
  },
  {
    name: 'getProjectBySlug',
    description: 'Récupère un projet spécifique par son slug.',
    parameters: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
          description: 'Slug du projet à récupérer'
        }
      },
      required: ['slug']
    }
  },
  {
    name: 'getBlogPosts',
    description: 'Récupère tous les articles de blog. Peut filtrer par catégorie si spécifié.',
    parameters: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          description: 'Catégorie d\'articles à filtrer (optionnel)'
        }
      }
    }
  },
  {
    name: 'getBlogPostBySlug',
    description: 'Récupère un article de blog spécifique par son slug.',
    parameters: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
          description: 'Slug de l\'article à récupérer'
        }
      },
      required: ['slug']
    }
  },
  {
    name: 'getGalleryImages',
    description: 'Récupère toutes les images de la galerie. Peut filtrer par catégorie si spécifié.',
    parameters: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          description: 'Catégorie d\'images à filtrer (optionnel)'
        }
      }
    }
  },
  {
    name: 'getGalleryImageById',
    description: 'Récupère une image de galerie spécifique par son ID.',
    parameters: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          description: 'ID de l\'image à récupérer'
        }
      },
      required: ['id']
    }
  }
];

type AIFunction = (params?: any) => Promise<any>;

// Map des fonctions exécutables
export const AI_FUNCTIONS: Record<string, AIFunction> = {
  getProjects,
  getProjectBySlug,
  getBlogPosts,
  getBlogPostBySlug,
  getGalleryImages,
  getGalleryImageById
};
