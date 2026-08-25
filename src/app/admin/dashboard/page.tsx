'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Image as ImageIcon, MessageSquare, Trash2, LogOut, Edit2, Loader2, Plus, HelpCircle, Calendar, Phone, Settings } from 'lucide-react';
import { getMedia, deleteMedia, createMedia, getTestimonials, deleteTestimonial, createTestimonial, getFaqs, createFaq, deleteFaq, getEvents, createEvent, deleteEvent, getUniversities, createUniversity, deleteUniversity, updateTestimonial, updateUniversity, updateFaq, updateEvent, getContactDetails, createContactDetail, deleteContactDetail, updateContactDetail } from './actions';
import { Btn } from '@/components/ui';

const getYouTubeId = (url: string) => {
  if (typeof url !== 'string') return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  return match ? match[1] : null;
};

type TabType = 'media' | 'testimonials' | 'universities' | 'faqs' | 'events' | 'contact';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('media');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [uploadType, setUploadType] = useState<'file' | 'link'>('file');
  const [editingItem, setEditingItem] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    setEditingItem(null);
    fetchData();
  }, [activeTab]);

  async function fetchData() {
    setLoading(true);
    let res: any = { success: false, data: [] };
    if (activeTab === 'media') res = await getMedia();
    else if (activeTab === 'testimonials') res = await getTestimonials();
    else if (activeTab === 'universities') res = await getUniversities();
    else if (activeTab === 'faqs') res = await getFaqs();
    else if (activeTab === 'events') res = await getEvents();
    else if (activeTab === 'contact') res = await getContactDetails();

    if (res?.success) setData(res.data || []);
    setLoading(false);
  }

  async function handleLogout() {
    document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    router.push('/admin/login');
  }

  async function handleGenericSubmit(e: React.FormEvent<HTMLFormElement>, createFn: any, updateFn: any) {
    e.preventDefault();
    setUploading(true);
    setError('');
    const formData = new FormData(e.currentTarget);
    try {
      const file = formData.get('imageFile');
      if (file && (file as File).size > 0) {
        const uploadData = new FormData();
        uploadData.append('file', file);
        const uploadRes = await fetch('/api/upload', { method: 'POST', body: uploadData });
        const uploadJson = await uploadRes.json();
        if (uploadJson.success) {
          formData.set('image', uploadJson.url);
        } else {
          setError(uploadJson.error || 'Image upload failed');
          setUploading(false);
          return;
        }
      }
      const res = editingItem ? await updateFn(editingItem._id, formData) : await createFn(formData);
      if (res.success) {
        (e.target as HTMLFormElement).reset();
        setEditingItem(null);
        fetchData();
      } else {
        setError(res.error || 'Failed to submit');
      }
    } catch (err) {
      setError('An error occurred.');
    } finally {
      setUploading(false);
    }
  }

  async function handleMediaUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUploading(true);
    setError('');
    const formData = new FormData(e.currentTarget);
    try {
      let src = '';
      if (uploadType === 'file') {
        const file = formData.get('file');
        if (!file || (file as File).size === 0) {
           setError('Please select a file');
           setUploading(false);
           return;
        }
        
        const uploadData = new FormData();
        uploadData.append('file', file);
        
        const res = await fetch('/api/upload', { method: 'POST', body: uploadData });
        const data = await res.json();
        if (data.success) {
          src = data.url;
        } else {
          setError(data.error || 'Upload failed');
          setUploading(false);
          return;
        }
      } else {
        src = formData.get('link') as string;
      }
      
      const mediaData = new FormData();
      mediaData.append('title', formData.get('title') as string);
      mediaData.append('category', formData.get('category') as string);
      mediaData.append('src', src);
      
      const res = await createMedia(mediaData);
      if (res.success) {
        (e.target as HTMLFormElement).reset();
        fetchData();
      } else {
        setError(res.error || 'Failed to save media');
      }
    } catch (err) {
      setError('An error occurred during upload.');
    } finally {
      setUploading(false);
    }
  }

  const handleDelete = async (id: string, deleteFn: any) => {
    if (confirm('Are you sure you want to delete this?')) {
      await deleteFn(id);
      fetchData();
    }
  };

  const navItems = [
    { id: 'media', label: 'Gallery Media', icon: <ImageIcon className="w-5 h-5" /> },
    { id: 'testimonials', label: 'Testimonials', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'universities', label: 'Partner Universities', icon: <Settings className="w-5 h-5" /> },
    { id: 'faqs', label: 'FAQs', icon: <HelpCircle className="w-5 h-5" /> },
    { id: 'events', label: 'Events', icon: <Calendar className="w-5 h-5" /> },
    { id: 'contact', label: 'Contact Details', icon: <Phone className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-mist flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white border-r border-ink/5 p-6 flex flex-col shrink-0">
        <h1 className="font-display text-xl font-bold text-ink mb-8">Admin Portal</h1>
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as TabType)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors ${activeTab === item.id ? 'bg-brand/10 text-brand' : 'text-ink/60 hover:bg-mist'}`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
        <button onClick={handleLogout} className="mt-auto flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-error/80 hover:bg-error/10 hover:text-error transition-colors">
          <LogOut className="w-5 h-5" /> Sign Out
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10 max-h-screen overflow-y-auto">
        {error && <div className="bg-error/10 text-error p-4 rounded-xl mb-6 font-bold">{error}</div>}

        {activeTab === 'media' && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-3xl border border-ink/5 shadow-sm">
              <h2 className="font-display text-xl font-bold mb-4">Upload New Media</h2>
              <div className="flex gap-4 mb-4">
                <button type="button" onClick={() => setUploadType('file')} className={`px-4 py-2 rounded-xl font-semibold ${uploadType === 'file' ? 'bg-brand text-white' : 'bg-mist'}`}>Upload File</button>
                <button type="button" onClick={() => setUploadType('link')} className={`px-4 py-2 rounded-xl font-semibold ${uploadType === 'link' ? 'bg-brand text-white' : 'bg-mist'}`}>Provide Link</button>
              </div>
              <form onSubmit={handleMediaUpload} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="title" placeholder="Media Title" required defaultValue={editingItem?.title || ''} className="bg-mist border border-ink/10 rounded-xl px-4 py-3 outline-none" />
                <select name="category" required className="bg-mist border border-ink/10 rounded-xl px-4 py-3 outline-none">
                  <option value="Photos">Photo</option>
                  <option value="Videos">Video</option>
                </select>
                {uploadType === 'file' ? (
                  <input type="file" name="file" accept="image/*,video/*" required className="bg-mist border border-ink/10 rounded-xl px-4 py-3 md:col-span-2" />
                ) : (
                  <input type="url" name="link" placeholder="Video URL" required className="bg-mist border border-ink/10 rounded-xl px-4 py-3 md:col-span-2" />
                )}
                <button type="submit" disabled={uploading} className="md:col-span-2 bg-brand text-white font-bold py-3 rounded-xl hover:bg-brand/90 disabled:opacity-50 flex justify-center items-center gap-2">
                  {uploading ? <Loader2 className="animate-spin w-5 h-5" /> : <><Plus className="w-5 h-5" /> Upload Media</>}
                </button>
              </form>
            </div>
            <div>
              <h2 className="font-display text-xl font-bold mb-4">Existing Media</h2>
              {loading ? <div className="flex justify-center p-10"><Loader2 className="animate-spin w-8 h-8 text-brand" /></div> : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {data.map((m) => (
                    <div key={m._id} className="bg-white rounded-2xl overflow-hidden border border-ink/5 shadow-sm group">
                      <div className="aspect-square bg-mist relative">
                        {m.category === 'Videos' ? (
                          getYouTubeId(m.src) ? <iframe src={`https://www.youtube.com/embed/${getYouTubeId(m.src)}`} className="w-full h-full border-0" /> : <video src={m.src} className="w-full h-full object-cover" />
                        ) : <img src={m.src} alt={m.title} className="w-full h-full object-cover" />}
                        <button onClick={() => handleDelete(m._id, deleteMedia)} className="absolute top-2 right-2 bg-white/90 text-error p-1.5 rounded-lg opacity-0 group-hover:opacity-100"><Trash2 className="w-4 h-4" /></button>
                      </div>
                      <div className="p-3"><p className="font-bold text-sm truncate">{m.title}</p><p className="text-xs text-ink/60">{m.category}</p></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Dynamic tabs using a similar layout mapping */}
        {['testimonials', 'universities', 'faqs', 'events', 'contact'].includes(activeTab) && (
          <div className="space-y-8">
            {(activeTab !== 'contact' || editingItem) && (
              <div className="bg-white p-6 rounded-3xl border border-ink/5 shadow-sm">
              <h2 className="font-display text-xl font-bold mb-4">{editingItem ? 'Edit' : 'Add'} {activeTab.replace(/s$/, '')}</h2>
              <form key={editingItem ? editingItem._id : 'new'} onSubmit={(e) => handleGenericSubmit(e, activeTab === 'testimonials' ? createTestimonial : activeTab === 'universities' ? createUniversity : activeTab === 'faqs' ? createFaq : activeTab === 'events' ? createEvent : createContactDetail, activeTab === 'testimonials' ? updateTestimonial : activeTab === 'universities' ? updateUniversity : activeTab === 'faqs' ? updateFaq : activeTab === 'events' ? updateEvent : updateContactDetail)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {activeTab === 'testimonials' && (
                  <>
                    <input name="name" placeholder="Student Name" required defaultValue={editingItem?.name || ''} className="bg-mist border border-ink/10 rounded-xl px-4 py-3 outline-none" />
                    <input name="university" placeholder="University" required defaultValue={editingItem?.university || ''} className="bg-mist border border-ink/10 rounded-xl px-4 py-3 outline-none" />
                    <textarea name="quote" placeholder="Quote" required defaultValue={editingItem?.quote || ''} rows={3} className="bg-mist border border-ink/10 rounded-xl px-4 py-3 md:col-span-2 outline-none" />
                    <div className="md:col-span-2 flex flex-col md:flex-row gap-4">
                      <input name="image" placeholder="Image URL (leave blank if uploading)" defaultValue={editingItem?.image || ''} className="flex-1 bg-mist border border-ink/10 rounded-xl px-4 py-3 outline-none" />
                      <input type="file" name="imageFile" accept="image/*" className="bg-mist border border-ink/10 rounded-xl px-4 py-3 outline-none" />
                    </div>
                  </>
                )}

                {activeTab === 'universities' && (
                  <>
                    <input name="name" placeholder="Name" required defaultValue={editingItem?.name || ''} className="bg-mist border border-ink/10 rounded-xl px-4 py-3 outline-none" />
                    <input name="country" placeholder="Country" required defaultValue={editingItem?.country || ''} className="bg-mist border border-ink/10 rounded-xl px-4 py-3 outline-none" />
                    <input name="flag" placeholder="Flag Emoji" required defaultValue={editingItem?.flag || ''} className="bg-mist border border-ink/10 rounded-xl px-4 py-3 outline-none" />
                    <input name="rank" placeholder="Rank (e.g. Georgia Rank #1)" required defaultValue={editingItem?.rank || ''} className="bg-mist border border-ink/10 rounded-xl px-4 py-3 outline-none" />
                    <input name="recognition" placeholder="Recognition (e.g. NMC • WHO)" required defaultValue={editingItem?.recognition || ''} className="bg-mist border border-ink/10 rounded-xl px-4 py-3 outline-none" />
                    <input name="fees" placeholder="Fees (e.g. $8,000 / year)" required defaultValue={editingItem?.fees || ''} className="bg-mist border border-ink/10 rounded-xl px-4 py-3 outline-none" />
                    <div className="md:col-span-2 flex flex-col md:flex-row gap-4">
                      <input name="image" placeholder="Image URL (leave blank if uploading)" defaultValue={editingItem?.image || ''} className="flex-1 bg-mist border border-ink/10 rounded-xl px-4 py-3 outline-none" />
                      <input type="file" name="imageFile" accept="image/*" className="bg-mist border border-ink/10 rounded-xl px-4 py-3 outline-none" />
                    </div>
                  </>
                )}

                {activeTab === 'faqs' && (
                  <>
                    <input name="q" placeholder="Question" required defaultValue={editingItem?.q || ''} className="bg-mist border border-ink/10 rounded-xl px-4 py-3 md:col-span-2 outline-none" />
                    <textarea name="a" placeholder="Answer" required defaultValue={editingItem?.a || ''} rows={3} className="bg-mist border border-ink/10 rounded-xl px-4 py-3 md:col-span-2 outline-none" />
                  </>
                )}
                {activeTab === 'events' && (
                  <>
                    <input name="title" placeholder="Title" required defaultValue={editingItem?.title || ''} className="bg-mist border border-ink/10 rounded-xl px-4 py-3 outline-none" />
                    <input name="place" placeholder="Place / Subtitle" required defaultValue={editingItem?.place || ''} className="bg-mist border border-ink/10 rounded-xl px-4 py-3 outline-none" />
                    <div className="md:col-span-2 flex flex-col md:flex-row gap-4">
                      <input name="image" placeholder="Image URL (leave blank if uploading)" defaultValue={editingItem?.image || ''} className="flex-1 bg-mist border border-ink/10 rounded-xl px-4 py-3 outline-none" />
                      <input type="file" name="imageFile" accept="image/*" className="bg-mist border border-ink/10 rounded-xl px-4 py-3 outline-none" />
                    </div>
                  </>
                )}

                {activeTab === 'contact' && (
                  <>
                    <input name="key" placeholder="Key (e.g. phone, address, email)" required defaultValue={editingItem?.key || ''} className="bg-mist border border-ink/10 rounded-xl px-4 py-3 outline-none" />
                    <input name="value" placeholder="Value" required defaultValue={editingItem?.value || ''} className="bg-mist border border-ink/10 rounded-xl px-4 py-3 outline-none" />
                  </>
                )}

                {editingItem && (
                  <button type="button" onClick={() => setEditingItem(null)} className="bg-mist text-ink font-bold py-3 rounded-xl hover:bg-ink/10 flex justify-center items-center gap-2">
                    Cancel Edit
                  </button>
                )}
                <button type="submit" disabled={uploading} className={`${editingItem ? '' : 'md:col-span-2'} bg-brand text-white font-bold py-3 rounded-xl hover:bg-brand/90 disabled:opacity-50 flex justify-center items-center gap-2`}>
                  {uploading ? <Loader2 className="animate-spin w-5 h-5" /> : <><Plus className="w-5 h-5" /> {editingItem ? 'Save Changes' : 'Add Entry'}</>}
                </button>
              </form>
            </div>
            )}

            <div>
              <h2 className="font-display text-xl font-bold mb-4">Existing Entries</h2>
              {loading ? <div className="flex justify-center p-10"><Loader2 className="animate-spin w-8 h-8 text-brand" /></div> : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.map((item) => (
                    <div key={item._id} className="bg-white p-5 rounded-2xl border border-ink/5 shadow-sm relative">
                      <button onClick={() => setEditingItem(item)} className="absolute top-4 right-12 text-ink/40 hover:text-brand transition-colors">
                        <Edit2 className="w-5 h-5" />
                      </button>
                      {activeTab !== 'contact' && (
                        <button onClick={() => handleDelete(item._id, activeTab === 'testimonials' ? deleteTestimonial : activeTab === 'universities' ? deleteUniversity : activeTab === 'faqs' ? deleteFaq : activeTab === 'events' ? deleteEvent : deleteContactDetail)} className="absolute top-4 right-4 text-error/40 hover:text-error transition-colors">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                      {activeTab === 'universities' && (
                        <div className="flex items-center gap-4 pr-16">
                          <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover bg-mist shrink-0" />
                          <div className="overflow-hidden">
                            <p className="font-bold text-sm truncate">{item.flag} {item.name}</p>
                            <p className="text-xs text-ink/60 mt-1">{item.country} • {item.rank}</p>
                            <p className="text-xs font-semibold text-brand mt-1">{item.fees}</p>
                          </div>
                        </div>
                      )}
                      {activeTab === 'testimonials' && (
                        <div className="flex flex-col gap-2 pr-16">
                          <div className="flex items-center gap-3">
                            {item.image && <img src={item.image} alt={item.name} className="w-10 h-10 rounded-full object-cover shrink-0" />}
                            <div>
                              <p className="font-bold text-sm">{item.name}</p>
                              <p className="text-xs text-ink/60">{item.university}</p>
                            </div>
                          </div>
                          <p className="text-xs text-ink line-clamp-3 italic">"{item.quote}"</p>
                        </div>
                      )}
                      {activeTab === 'faqs' && (
                        <div className="flex flex-col gap-2 pr-16">
                          <p className="font-bold text-sm line-clamp-2">Q: {item.q}</p>
                          <p className="text-xs text-ink/70 line-clamp-3">A: {item.a}</p>
                        </div>
                      )}
                      {activeTab === 'events' && (
                        <div className="flex items-center gap-4 pr-16">
                          <img src={item.image} alt={item.title} className="w-16 h-16 rounded-lg object-cover bg-mist shrink-0" />
                          <div className="overflow-hidden">
                            <p className="font-bold text-sm truncate">{item.title}</p>
                            <p className="text-xs text-ink/60 mt-1">{item.place}</p>
                          </div>
                        </div>
                      )}

                      {activeTab === 'contact' && (
                        <div className="flex flex-col gap-1 pr-16">
                          <p className="font-bold text-sm capitalize">{item.key}</p>
                          <p className="text-xs text-ink/70">{item.value}</p>
                        </div>
                      )}
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
