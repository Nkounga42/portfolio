import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Download, Share2, Heart, Eye } from "lucide-react";
import { supabase } from "../tools/supabase";
import { useParams, useNavigate } from "react-router-dom";
import { slugify } from "../tools/tools";
import GalleryHero from "../components/GalleryHero";

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

export default function Gallery() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set());
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = { x: 0, y: 0 };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => { setZoomLevel(prev => { const next = Math.max(prev - 0.25, 0.5); if (next === 1) setPan({ x: 0, y: 0 }); return next; }); };
  const handleZoomReset = () => { setZoomLevel(1); setPan({ x: 0, y: 0 }); };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    dragStart.x = e.clientX - pan.x;
    dragStart.y = e.clientY - pan.y;
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };
  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    const fetchGallery = async () => {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) console.error('Erreur Supabase:', error);

      if (data) {
        const mappedData = data.map((item: any) => ({
          ...item,
          src: item.image_url,
          alt: item.alt ?? item.title,
          date: item.created_at
        }));
        setGalleryImages(mappedData);
      }
    };
    fetchGallery();
  }, []);

  // Handle URL slug
  useEffect(() => {
    if (galleryImages.length > 0 && slug) {
      const found = galleryImages.find(img => slugify(img.title) === slug || String(img.id) === slug);
      if (found) {
        setSelectedImage(found);
      }
    } else if (!slug && selectedImage) {
      setSelectedImage(null);
    }
  }, [slug, galleryImages]);

  const handleCloseLightbox = () => {
    setSelectedImage(null);
    setZoomLevel(1);
    navigate("/portfolio/gallery");
  };

  const handleOpenLightbox = (img: GalleryImage) => {
    setSelectedImage(img);
    navigate(`/portfolio/gallery/${slugify(img.title)}`);
  };

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
    <section className="pb-20 bg-base-100 min-h-screen">
      <GalleryHero sources={galleryImages} />
      <div className="container mx-auto px-4 mt-10 max-w-5xl">



        {/* Bento Grid Gallery */}
        <motion.div
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
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
                className="group relative bg-base-200/30 rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] break-inside-avoid mb-6"
                onClick={() => handleOpenLightbox(image)}
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Overlay */}
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> */}

                  {/* Quick Actions */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(image.id);
                      }}
                      className={`p-2 rounded-full backdrop-blur-sm transition-colors ${likedImages.has(image.id)
                        ? "bg-red-500 text-white"
                        : "bg-white/20 text-white hover:bg-white/30"
                        }`}
                    >
                      <Heart className="w-4 h-4" fill={likedImages.has(image.id) ? "currentColor" : "none"} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenLightbox(image);
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
            onClick={handleCloseLightbox}
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
                onClick={handleCloseLightbox}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Image + Zoom Controls */}
              <div
                className="relative overflow-hidden bg-black/20"
                style={{ cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full max-h-[60vh] object-contain select-none"
                  style={{
                    transform: `scale(${zoomLevel}) translate(${pan.x / zoomLevel}px, ${pan.y / zoomLevel}px)`,
                    transformOrigin: 'center',
                    transition: isDragging ? 'none' : 'transform 0.2s ease',
                  }}
                  draggable={false}
                />

                {/* Zoom Buttons (sur l'image) */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2">
                  <button
                    onClick={handleZoomOut}
                    disabled={zoomLevel <= 0.5}
                    className="w-8 h-8 flex items-center justify-center text-white rounded-full hover:bg-white/20 disabled:opacity-30 transition-colors text-lg font-bold"
                    title="Zoom -"
                  >
                    −
                  </button>
                  <button
                    onClick={handleZoomReset}
                    className="px-3 py-1 text-white text-xs rounded-full hover:bg-white/20 transition-colors min-w-[3rem] text-center"
                    title="Réinitialiser"
                  >
                    {Math.round(zoomLevel * 100)}%
                  </button>
                  <button
                    onClick={handleZoomIn}
                    disabled={zoomLevel >= 3}
                    className="w-8 h-8 flex items-center justify-center text-white rounded-full hover:bg-white/20 disabled:opacity-30 transition-colors text-lg font-bold"
                    title="Zoom +"
                  >
                    +
                  </button>
                </div>
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
                      className={`btn btn-sm ${likedImages.has(selectedImage.id) ? "btn-error" : "btn-ghost"
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
