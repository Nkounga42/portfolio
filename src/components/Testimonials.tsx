

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, Plus, X } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "../tools/supabase";
import { useLanguage } from "../hooks/useLanguage";


export default function testimonials() {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const [loader, setLoading] = useState(true);
  const [testimonials, settestimonials] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mail: '',
    message: '',
    image: '',
    link: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchTestimonials = async () => {
      console.log('Fetching testimonials from Supabase...');
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')

      if (error) {
        console.error('Erreur Supabase (Testimonials):', error.message);
        console.error('Error details:', error);
      } else if (data) {
        console.log('Testimonials data received:', data);
        settestimonials(data);
      } else {
        console.log('No data received from Supabase');
      }
      setLoading(false);
    };

    fetchTestimonials();
  }, []);


  const total = testimonials.length;
  const current = testimonials[index];




  const prev = () => setIndex((i) => (i === 0 ? total - 1 : i - 1));
  const next = () => setIndex((i) => (i === total - 1 ? 0 : i + 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    let imageUrl = formData.image;

    if (imageFile) {
      const fileName = `${Date.now()}-${imageFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from('testimonials-images')
        .upload(fileName, imageFile);

      if (uploadError) {
        console.error('Erreur lors de l\'upload de l\'image:', uploadError.message);
        setUploading(false);
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('testimonials-images')
        .getPublicUrl(fileName);

      imageUrl = publicUrl;
    }

    const { data, error } = await supabase
      .from('testimonials')
      .insert([{ ...formData, image: imageUrl }])
      .select();

    setUploading(false);

    if (error) {
      console.error('Erreur lors de la création du témoignage:', error.message);
    } else {
      settestimonials([...testimonials, data[0]]);
      setShowModal(false);
      setFormData({ name: '', mail: '', message: '', image: '', link: '' });
      setImageFile(null);
    }
  };

  if (loader) {
    return <div className="text-center py-20">{t.common.loading}</div>;
  }

  if (total === 0) {
    return null;
  }

  return (
    <section id="testimonials" className=" text-base-content space-y-10 m-50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-start">
        {/* Left */}
        <div>
          <p className="text-primary font-medium mb-2">{t.testimonials.title}-</p>
          <h2 className="text-4xl font-bold mb-4 leading-tight">
            {t.testimonials.heading}
          </h2>
          <p className="text-base-content/80 text-lg">
            {t.testimonials.description}
          </p>
        </div>

        {/* Right */}
        <div className="bg-base-200/30 rounded-xl w-3/6 p-6 shadow-xl border border-neutral-content/10">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={current.image}
              alt={current.name}
              className="w-14 h-14 rounded-full object-cover ring-2 ring-primary"
            />
            <div>
              <h3 className="font-semibold">{current.name}</h3>
              <p className="text-sm text-base-content-400">{current.mail}</p>
            </div>
          </div>
          <p className="text-base-content-300">{current.message}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto flex justify-between items-center px-2">
        <div className=" flex gap-8">
          {
            current.link && (
              <Link
                to={current.link}
                title={current.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2 items-center"
              >
                {t.testimonials.checkLinkedIn} <ExternalLink className="w-4 h-4" />
              </Link>
            )
          }
          {
            current.mail && (
              <Link
                to={`mailto:${current.mail}`}
                title={`mailto:${current.mail}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2 items-center"
              >
                {t.testimonials.checkMail} <ExternalLink className="w-4 h-4" />
              </Link>
            )
          }
        </div>
        <div className="flex items-center gap-4 text-base-content ">

          <button
            className="backdrop-blur-md h-12 w-12 border border-base-content/30 hover:border-primary/80 btn-circle hover:text-primary flex justify-center items-center"
            onClick={prev}
          >
            <ArrowLeft size="16" />
          </button>
          <span className="text-sm">{index + 1} / {total}</span>
          <button
            className="backdrop-blur-md h-12 w-12 border border-base-content/30 hover:border-primary/80 btn-circle hover:text-primary flex justify-center items-center"
            onClick={next}
          >
            <ArrowRight size="16" />
          </button>
          <button
            className="backdrop-blur-md h-12 px-4 border border-base-content/30 hover:border-primary/80 hover:text-primary flex justify-center items-center gap-2 rounded-full"
            onClick={() => setShowModal(true)}
          >
            <Plus size="16" />
            <span className="text-sm">{t.testimonials.add}</span>
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-base-100 rounded-xl p-6 w-full max-w-md shadow-2xl border border-base-content/10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">{t.testimonials.addTestimonial}</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-base-content hover:text-primary"
              >
                <X size="20" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">{t.testimonials.name} *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-base-content/30 rounded-lg bg-base-200/30 focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{t.testimonials.email} *</label>
                <input
                  type="text"
                  required
                  value={formData.mail}
                  onChange={(e) => setFormData({ ...formData, mail: e.target.value })}
                  className="w-full px-3 py-2 border border-base-content/30 rounded-lg bg-base-200/30 focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{t.testimonials.message} *</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 border border-base-content/30 rounded-lg bg-base-200/30 focus:outline-none focus:border-primary h-24 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{t.testimonials.image}</label>
                <div className="space-y-2">
                  <input
                    type="url"
                    placeholder={t.testimonials.orEnterUrl}
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-3 py-2 border border-base-content/30 rounded-lg bg-base-200/30 focus:outline-none focus:border-primary"
                    disabled={!!imageFile}
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-base-content/60">{t.testimonials.or}</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setImageFile(file);
                        setFormData({ ...formData, image: '' });
                      }
                    }}
                    className="w-full px-3 py-2 border border-base-content/30 rounded-lg bg-base-200/30 focus:outline-none focus:border-primary text-sm"
                    disabled={!!formData.image}
                  />
                  {imageFile && (
                    <p className="text-sm text-primary">{imageFile.name}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{t.testimonials.linkedinUrl}</label>
                <input
                  type="text"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="w-full px-3 py-2 border border-base-content/30 rounded-lg bg-base-200/30 focus:outline-none focus:border-primary"
                />
              </div>
              <button
                type="submit"
                disabled={uploading}
                className="w-full py-2 bg-primary text-primary-content rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? t.testimonials.uploading : t.testimonials.createTestimonial}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

