'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Image as ImageIcon, MessageSquare, Trash2, LogOut, Loader2, Video, Plus } from 'lucide-react';
import { getMedia, deleteMedia, getTestimonials, deleteTestimonial, createTestimonial } from './actions';
import { Btn } from '@/components/ui';

const getYouTubeId = (url: string) => {
  if (typeof url !== 'string') return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  return match ? match[1] : null;
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'media' | 'testimonials'>('media');
  const [media, setMedia] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [uploadType, setUploadType] = useState<'file' | 'link'>('file');
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  async function fetchData() {
    setLoading(true);
    if (activeTab === 'media') {
      const res = await getMedia();
      if (res.success) setMedia(res.data);
    } else {
      const res = await getTestimonials();
      if (res.success) setTestimonials(res.data);
    }
    setLoading(false);
  }

  async function handleLogout() {
    document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    router.push('/admin/login');
  }

  async function handleMediaUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUploading(true);
    setError('');
    
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        (e.target as HTMLFormElement).reset();
        fetchData();
      } else {
        setError(data.error || 'Upload failed');
      }
    } catch (err) {
      setError('An error occurred during upload.');
    } finally {
      setUploading(false);
    }
  }

  async function handleTestimonialSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUploading(true);
    setError('');
    
    const formData = new FormData(e.currentTarget);
    try {
      const res = await createTestimonial(formData);
      if (res.success) {
        (e.target as HTMLFormElement).reset();
        fetchData();
      } else {
        setError(res.error || 'Failed to add testimonial');
      }
    } catch (err) {
      setError('An error occurred.');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="min-h-screen bg-mist flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white border-r border-ink/5 p-6 flex flex-col shrink-0">
        <h1 className="font-display text-xl font-bold text-ink mb-8">Admin Portal</h1>
        
        <nav className="flex-1 space-y-2">
          <button
            onClick={() => setActiveTab('media')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors ${
              activeTab === 'media' ? 'bg-brand/10 text-brand' : 'text-ink/60 hover:bg-mist'
            }`}
          >
            <ImageIcon className="w-5 h-5" />
            Gallery Media
          </button>
          <button
            onClick={() => setActiveTab('testimonials')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors ${
              activeTab === 'testimonials' ? 'bg-brand/10 text-brand' : 'text-ink/60 hover:bg-mist'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            Testimonials
          </button>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-error/80 hover:bg-error/10 hover:text-error transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10 max-h-screen overflow-y-auto">
        {error && (
          <div className="bg-error/10 text-error p-4 rounded-xl mb-6 font-bold">
            {error}
          </div>
        )}

        {activeTab === 'media' && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-3xl border border-ink/5 shadow-sm">
              <h2 className="font-display text-xl font-bold mb-4">Upload New Media</h2>
              <div className="flex gap-4 mb-4">
                <button
                  type="button"
                  onClick={() => setUploadType('file')}
                  className={`px-4 py-2 rounded-xl font-semibold transition-colors ${uploadType === 'file' ? 'bg-brand text-white' : 'bg-mist text-ink/60 hover:bg-ink/5'}`}
                >
                  Upload File
                </button>
                <button
                  type="button"
                  onClick={() => setUploadType('link')}
                  className={`px-4 py-2 rounded-xl font-semibold transition-colors ${uploadType === 'link' ? 'bg-brand text-white' : 'bg-mist text-ink/60 hover:bg-ink/5'}`}
                >
                  Provide Link
                </button>
              </div>
              <form onSubmit={handleMediaUpload} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  name="title" 
                  placeholder="Media Title (e.g. Batch 2023)" 
                  required 
                  className="bg-mist border border-ink/10 rounded-xl px-4 py-3 outline-none focus:border-brand"
                />
                <select 
                  name="category" 
                  required
                  className="bg-mist border border-ink/10 rounded-xl px-4 py-3 outline-none focus:border-brand"
                >
                  <option value="Photos">Photo</option>
                  <option value="Videos">Video</option>
                </select>
                {uploadType === 'file' ? (
                  <input 
                    type="file" 
                    name="file" 
                    accept="image/*,video/*"
                    required 
                    className="bg-mist border border-ink/10 rounded-xl px-4 py-3 outline-none md:col-span-2"
                  />
                ) : (
                  <input 
                    type="url" 
                    name="link" 
                    placeholder="Video URL (e.g. YouTube link)"
                    required 
                    className="bg-mist border border-ink/10 rounded-xl px-4 py-3 outline-none md:col-span-2"
                  />
                )}
                <button 
                  type="submit" 
                  disabled={uploading}
                  className="md:col-span-2 bg-brand text-white font-bold py-3 rounded-xl hover:bg-brand/90 disabled:opacity-50 flex justify-center items-center gap-2"
                >
                  {uploading ? <Loader2 className="animate-spin w-5 h-5" /> : <><Plus className="w-5 h-5" /> Upload Media</>}
                </button>
              </form>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold mb-4">Existing Media</h2>
              {loading ? (
                <div className="flex justify-center p-10"><Loader2 className="animate-spin w-8 h-8 text-brand" /></div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {media.map((m) => (
                    <div key={m._id} className="bg-white rounded-2xl overflow-hidden border border-ink/5 shadow-sm group">
                      <div className="aspect-square bg-mist relative">
                        {m.category === 'Videos' ? (
                          getYouTubeId(m.src) ? (
                            <iframe src={`https://www.youtube.com/embed/${getYouTubeId(m.src)}`} className="w-full h-full border-0" allowFullScreen />
                          ) : (
                            <video src={m.src} className="w-full h-full object-cover" controls preload="metadata" />
                          )
                        ) : (
                          <img src={m.src} alt={m.title} className="w-full h-full object-cover" />
                        )}
                        <button 
                          onClick={async () => {
                            if (confirm('Are you sure?')) {
                              await deleteMedia(m._id);
                              fetchData();
                            }
                          }}
                          className="absolute top-2 right-2 bg-white/90 text-error p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-error hover:text-white"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="p-3">
                        <p className="font-bold text-sm truncate">{m.title}</p>
                        <p className="text-xs text-ink/60">{m.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'testimonials' && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-3xl border border-ink/5 shadow-sm">
              <h2 className="font-display text-xl font-bold mb-4">Add Testimonial</h2>
              <form onSubmit={handleTestimonialSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  name="name" 
                  placeholder="Student Name" 
                  required 
                  className="bg-mist border border-ink/10 rounded-xl px-4 py-3 outline-none focus:border-brand"
                />
                <input 
                  name="university" 
                  placeholder="University Name" 
                  required 
                  className="bg-mist border border-ink/10 rounded-xl px-4 py-3 outline-none focus:border-brand"
                />
                <textarea 
                  name="quote" 
                  placeholder="Testimonial Quote" 
                  required 
                  rows={3}
                  className="bg-mist border border-ink/10 rounded-xl px-4 py-3 outline-none focus:border-brand md:col-span-2"
                />
                <button 
                  type="submit" 
                  disabled={uploading}
                  className="md:col-span-2 bg-brand text-white font-bold py-3 rounded-xl hover:bg-brand/90 disabled:opacity-50 flex justify-center items-center gap-2"
                >
                  {uploading ? <Loader2 className="animate-spin w-5 h-5" /> : <><Plus className="w-5 h-5" /> Add Testimonial</>}
                </button>
              </form>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold mb-4">Existing Testimonials</h2>
              {loading ? (
                <div className="flex justify-center p-10"><Loader2 className="animate-spin w-8 h-8 text-brand" /></div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {testimonials.map((t) => (
                    <div key={t._id} className="bg-white p-5 rounded-2xl border border-ink/5 shadow-sm relative">
                      <button 
                        onClick={async () => {
                          if (confirm('Are you sure?')) {
                            await deleteTestimonial(t._id);
                            fetchData();
                          }
                        }}
                        className="absolute top-4 right-4 text-error/60 hover:text-error transition-colors p-1"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      <p className="font-bold">{t.name}</p>
                      <p className="text-sm text-brand font-medium mb-3">{t.university}</p>
                      <p className="text-sm text-ink/80 italic">"{t.quote}"</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
