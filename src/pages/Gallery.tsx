import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Download, Share2, Heart, Eye } from "lucide-react";
import { img } from "../libs/data";

// Types pour les images de la galerie
interface GalleryImage {
  id: number;
  title: string;
  category: string;
  src: string;
  alt: string;
  description?: string;
  tags?: string[];
  likes?: number;
  views?: number;
  date?: string;
}

// Génération des données de galerie à partir des images Pinterest
const galleryImages: GalleryImage[] = img.map((src, index) => {
  const categories = ["UI/UX", "Illustration", "Web Design", "Branding", "Photography", "Animation", "Print", "Digital Art", "Architecture"];
  const titles = [
    "Design UI/UX Mobile", "Illustration Vectorielle", "Web Design Moderne", "Branding & Identité",
    "Photography Art", "Motion Graphics", "Print Design", "Digital Art", "Architecture Design",
    "Fashion Photography", "Logo Design", "Abstract Art", "Creative Design", "Visual Identity",
    "Graphic Design", "Art Direction", "Creative Concept", "Visual Art", "Design System", "Brand Design"
  ];
  const descriptions = [
    "Design d'interface utilisateur pour application mobile avec approche minimaliste",
    "Création d'illustrations vectorielles pour supports numériques",
    "Conception de sites web modernes et responsifs",
    "Création d'identités visuelles complètes pour entreprises",
    "Photographie artistique et retouche créative",
    "Création d'animations et motion graphics",
    "Conception graphique pour supports imprimés",
    "Créations artistiques numériques et expérimentales",
    "Conception architecturale moderne et minimaliste",
    "Photographie de mode et portrait artistique",
    "Création de logos modernes et mémorables",
    "Créations artistiques abstraites et expérimentales",
    "Design créatif et innovant",
    "Identité visuelle forte et mémorable",
    "Design graphique professionnel",
    "Direction artistique créative",
    "Concept créatif original",
    "Art visuel contemporain",
    "Système de design cohérent",
    "Design de marque impactant"
  ];
  const tagsList = [
    ["Mobile", "UI", "Design"], ["Vector", "Illustration", "Creative"], ["Web", "Responsive", "Modern"],
    ["Branding", "Logo", "Identity"], ["Photo", "Art", "Creative"], ["Animation", "Motion", "Graphics"],
    ["Print", "Graphic", "Design"], ["Digital", "Art", "Experimental"], ["Architecture", "Modern", "Design"],
    ["Fashion", "Portrait", "Photography"], ["Logo", "Branding", "Identity"], ["Abstract", "Art", "Digital"],
    ["Creative", "Design", "Modern"], ["Visual", "Identity", "Brand"], ["Graphic", "Design", "Print"],
    ["Art", "Direction", "Creative"], ["Concept", "Creative", "Design"], ["Visual", "Art", "Contemporary"],
    ["Design", "System", "UI"], ["Brand", "Design", "Visual"]
  ];

  return {
    id: index + 1,
    title: titles[index % titles.length],
    category: categories[index % categories.length],
    src: src,
    alt: `${titles[index % titles.length]} - Image ${index + 1}`,
    description: descriptions[index % descriptions.length],
    tags: tagsList[index % tagsList.length],
    likes: Math.floor(Math.random() * 100) + 20,
    views: Math.floor(Math.random() * 400) + 100,
    date: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`
  };
});


export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set());

  const displayedImages = galleryImages;

  const handleLike = (imageId: number) => {
    setLikedImages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(imageId)) {
        newSet.delete(imageId);
      } else {
        newSet.add(imageId);
      }
      return newSet;
    });
  };

  const handleDownload = (image: GalleryImage) => {
    // Simulation du téléchargement
    const link = document.createElement('a');
    link.href = image.src;
    link.download = `${image.title}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async (image: GalleryImage) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: image.title,
          text: image.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Erreur lors du partage:', error);
      }
    } else {
      // Fallback pour les navigateurs qui ne supportent pas l'API Web Share
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papiers!');
    }
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: i * 0.1,
        ease: [0.2, 0.4, 0.9, 1],
      },
    }),
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: i * 0.05,
        ease: [0.2, 0.4, 0.9, 1],
      },
    }),
  };

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const imageModalVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 }
  };

  return (
    <section className="pb-20 pt-10 bg-base-100 min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="mb-12">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-5xl font-bold mb-6 ">
              Ma Galerie
            </h1>
          </motion.div>
          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="text-xl opacity-80">
              Découvrez mes créations à travers différents domaines : design UI/UX, 
              illustrations, photographie et bien plus encore.
            </p>
          </motion.div>
        </div>


        {/* Bento Grid Gallery */}
        <motion.div 
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
          layout
        >
          <AnimatePresence mode="wait">
            {displayedImages.map((image, i) => (
              <motion.div
                key={image.id}
                custom={i}
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                layout
                className="group relative bg-base-200/30 rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] break-inside-avoid mb-6"
                onClick={() => setSelectedImage(image)}
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Quick Actions */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(image.id);
                      }}
                      className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                        likedImages.has(image.id)
                          ? "bg-red-500 text-white"
                          : "bg-white/20 text-white hover:bg-white/30"
                      }`}
                    >
                      <Heart className="w-4 h-4" fill={likedImages.has(image.id) ? "currentColor" : "none"} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(image);
                      }}
                      className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="px-3 py-1 bg-primary/90 backdrop-blur-sm text-white text-xs rounded-full font-medium">
                      {image.category}
                    </span>
                  </div>

                  {/* Stats Bottom */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center justify-between text-white text-sm">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          <span>{image.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{image.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4" hidden>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-1">
                    {image.title}
                  </h3>
                  <p className="text-sm text-base-content/70 line-clamp-2 mb-3">
                    {image.description}
                  </p>
                  
                  {/* Tags */}
                  {image.tags && (
                    <div className="flex flex-wrap gap-1">
                      {image.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-base-300/50 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                      {image.tags.length > 3 && (
                        <span className="px-2 py-1 bg-base-300/30 text-xs rounded-full opacity-60">
                          +{image.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {displayedImages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <p className="text-xl text-base-content/60">
              Aucune image trouvée dans cette catégorie.
            </p>
          </motion.div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              variants={imageModalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative max-w-4xl max-h-[90vh] bg-base-100 rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Image */}
              <div className="relative">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full max-h-[60vh] object-contain"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{selectedImage.title}</h2>
                    <p className="text-base-content/70 mb-4">{selectedImage.description}</p>
                  </div>
                  <span className="badge badge-primary badge-lg">
                    {selectedImage.category}
                  </span>
                </div>

                {/* Tags */}
                {selectedImage.tags && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedImage.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-base-200 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6 text-sm text-base-content/70">
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      <span>{selectedImage.likes} likes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      <span>{selectedImage.views} vues</span>
                    </div>
                    {selectedImage.date && (
                      <span>{new Date(selectedImage.date).toLocaleDateString('fr-FR')}</span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleLike(selectedImage.id)}
                      className={`btn btn-sm ${
                        likedImages.has(selectedImage.id) ? "btn-error" : "btn-ghost"
                      }`}
                    >
                      <Heart className="w-4 h-4" fill={likedImages.has(selectedImage.id) ? "currentColor" : "none"} />
                    </button>
                    <button
                      onClick={() => handleShare(selectedImage)}
                      className="btn btn-ghost btn-sm"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDownload(selectedImage)}
                      className="btn btn-primary btn-sm"
                    >
                      <Download className="w-4 h-4" />
                      Télécharger
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
