"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Plus, Edit2, Trash2, Mail, LayoutDashboard, LogOut, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [activeTab, setActiveTab] = useState<'blogs' | 'submissions'>('blogs');
  
  const [blogs, setBlogs] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchBlogs();
      fetchSubmissions();
    }
  }, [isAuthenticated]);

  const fetchBlogs = async () => {
    const res = await fetch('/api/blogs');
    const data = await res.json();
    setBlogs(data);
  };

  const fetchSubmissions = async () => {
    const res = await fetch('/api/admin/submissions', {
      headers: { 'Authorization': `Bearer ${password}` }
    });
    const data = await res.json();
    setSubmissions(data);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = currentBlog.isNew ? 'POST' : 'PUT';
    
    // Convert comma-separated tags to array if it's a string
    let parsedTags = currentBlog.tags;
    if (typeof parsedTags === 'string') {
      parsedTags = parsedTags.split(',').map((t: string) => t.trim()).filter((t: string) => t);
    }
    
    await fetch('/api/blogs', {
      method,
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${password}`
      },
      body: JSON.stringify({ ...currentBlog, tags: parsedTags })
    });
    
    setIsEditing(false);
    fetchBlogs();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      await fetch(`/api/blogs?id=${id}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${password}` }
      });
      fetchBlogs();
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${password}` },
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setCurrentBlog({ ...currentBlog, src: data.url });
      } else {
        alert('Upload failed: ' + data.error);
      }
    } catch (err) {
      console.error(err);
      alert('Upload failed.');
    } finally {
      setIsUploading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-[#050505] min-h-screen flex items-center justify-center px-6">
        <div className="glass-panel p-10 rounded-3xl max-w-md w-full border border-white/10 text-center">
          <Lock size={48} className="mx-auto mb-6 text-[#D18F08]" />
          <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-accent)' }}>ADMIN ACCESS</h2>
          <p className="text-gray-400 text-sm mb-8">Enter your secure password to continue.</p>
          
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D18F08] transition-colors text-center tracking-widest"
            />
            {error && <p className="text-red-500 text-xs font-bold">{error}</p>}
            <button type="submit" className="btn-premium bg-[#D18F08] text-black font-bold py-3 rounded-xl uppercase tracking-widest hover:shadow-[0_0_15px_rgba(209,143,8,0.3)] transition-all">
              Login
            </button>
            <Link href="/" className="text-gray-500 text-xs mt-4 hover:text-white transition-colors">Return to site</Link>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#050505] min-h-screen text-white">
      {/* Sidebar / Header */}
      <header className="border-b border-white/10 bg-[#0A0A0A] p-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <img src="/cram_logo_cs.png" alt="CRAM" className="h-8" />
            <div className="h-6 w-px bg-white/20"></div>
            <span className="font-bold tracking-widest uppercase text-xs text-[#D18F08]">Command Center</span>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => setActiveTab('blogs')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'blogs' ? 'bg-[#111] text-[#D18F08] border border-white/10' : 'text-gray-400 hover:text-white'}`}
            >
              <LayoutDashboard size={14} /> Content
            </button>
            <button 
              onClick={() => setActiveTab('submissions')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'submissions' ? 'bg-[#111] text-[#D18F08] border border-white/10' : 'text-gray-400 hover:text-white'}`}
            >
              <Mail size={14} /> Inquiries
            </button>
            <div className="h-8 w-px bg-white/20 mx-2"></div>
            <button onClick={() => setIsAuthenticated(false)} className="text-gray-500 hover:text-red-500 transition-colors">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 mt-8">
        
        {/* Editor Modal */}
        {isEditing && (
          <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 overflow-y-auto">
            <div className="glass-panel p-8 rounded-3xl max-w-4xl w-full border border-white/10 my-auto">
              <h2 className="text-2xl font-bold mb-6 text-[#D18F08]">{currentBlog.isNew ? 'Create New Post' : 'Edit Post'}</h2>
              <form onSubmit={handleSaveBlog} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500">Title</label>
                  <input type="text" required value={currentBlog.title || ''} onChange={e => setCurrentBlog({...currentBlog, title: e.target.value})} className="bg-[#111] border border-white/10 rounded-lg p-3 text-white" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500">Category</label>
                  <select value={currentBlog.category || 'Automotive'} onChange={e => setCurrentBlog({...currentBlog, category: e.target.value})} className="bg-[#111] border border-white/10 rounded-lg p-3 text-white">
                    <option>Automotive</option>
                    <option>Technology</option>
                    <option>Process</option>
                    <option>Community</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500">Image</label>
                  <div className="flex gap-4 items-center">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload} 
                      className="bg-[#111] border border-white/10 rounded-lg p-2 text-white text-sm flex-grow file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:uppercase file:tracking-widest file:bg-[#D18F08] file:text-black hover:file:bg-[#D18F08]/80 cursor-pointer" 
                    />
                    {isUploading && <span className="text-[#D18F08] text-xs font-bold animate-pulse">Uploading...</span>}
                  </div>
                  {currentBlog?.src && (
                    <div className="mt-2 flex items-center gap-3 bg-[#0a0a0a] p-2 rounded-lg border border-white/5 w-fit">
                      <img src={currentBlog.src} alt="Preview" className="w-12 h-12 object-cover rounded border border-white/10" />
                      <span className="text-xs text-gray-500 truncate max-w-[200px]">{currentBlog.src}</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500">Author</label>
                  <input type="text" value={currentBlog.author || ''} onChange={e => setCurrentBlog({...currentBlog, author: e.target.value})} className="bg-[#111] border border-white/10 rounded-lg p-3 text-white" />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500">Content (HTML allowed)</label>
                  <textarea rows={6} value={currentBlog.content || ''} onChange={e => setCurrentBlog({...currentBlog, content: e.target.value})} className="bg-[#111] border border-white/10 rounded-lg p-3 text-white font-mono text-sm" />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500">Tags (comma separated)</label>
                  <input type="text" value={typeof currentBlog.tags === 'string' ? currentBlog.tags : (currentBlog.tags?.join(', ') || '')} onChange={e => setCurrentBlog({...currentBlog, tags: e.target.value})} className="bg-[#111] border border-white/10 rounded-lg p-3 text-white" />
                </div>
                <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                  <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors font-bold text-sm">Cancel</button>
                  <button type="submit" className="px-6 py-3 rounded-xl bg-[#D18F08] text-black font-bold text-sm uppercase tracking-widest hover:brightness-110 flex items-center gap-2"><CheckCircle2 size={16} /> Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Content Tab */}
        {activeTab === 'blogs' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-accent)' }}>Content Manager</h1>
              <button onClick={() => { setCurrentBlog({ isNew: true }); setIsEditing(true); }} className="bg-[#D18F08] text-black px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:shadow-[0_0_15px_rgba(209,143,8,0.4)] transition-all">
                <Plus size={16} /> New Post
              </button>
            </div>

            <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#111] text-xs uppercase tracking-widest text-gray-500">
                    <tr>
                      <th className="px-6 py-4 font-bold">Post Details</th>
                      <th className="px-6 py-4 font-bold">Category</th>
                      <th className="px-6 py-4 font-bold">Date</th>
                      <th className="px-6 py-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {blogs.map(blog => (
                      <tr key={blog.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <img src={blog.src} alt="" className="w-12 h-12 rounded-lg object-cover" />
                            <div>
                              <p className="font-bold text-white">{blog.title}</p>
                              <p className="text-xs text-gray-500">{blog.author}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4"><span className="bg-[#111] text-[#D18F08] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">{blog.category}</span></td>
                        <td className="px-6 py-4 text-gray-400">{blog.date}</td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => { setCurrentBlog(blog); setIsEditing(true); }} className="text-gray-400 hover:text-white p-2 transition-colors"><Edit2 size={16} /></button>
                          <button onClick={() => handleDelete(blog.id)} className="text-gray-400 hover:text-red-500 p-2 transition-colors ml-2"><Trash2 size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Submissions Tab */}
        {activeTab === 'submissions' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-3xl font-bold mb-8" style={{ fontFamily: 'var(--font-accent)' }}>Form Submissions</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {submissions.length === 0 ? (
                <div className="col-span-full text-center py-20 text-gray-500">
                  <Mail size={48} className="mx-auto mb-4 opacity-20" />
                  <p>No submissions found yet.</p>
                </div>
              ) : (
                submissions.map((sub, idx) => (
                  <div key={idx} className="bg-[#0A0A0A] border border-white/5 p-6 rounded-2xl flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                      <span className="bg-[#111] text-[#D18F08] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">{sub.type}</span>
                      <span className="text-xs text-gray-500">{new Date(sub.timestamp).toLocaleDateString()}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white">{sub.name}</h3>
                    <p className="text-sm text-gray-400 mb-4">{sub.company}</p>
                    <div className="space-y-1 mb-6 text-sm">
                      <p className="text-gray-300">📧 {sub.email}</p>
                      <p className="text-gray-300">📱 {sub.phone}</p>
                    </div>
                    <div className="mt-auto bg-[#111] p-4 rounded-xl">
                      <p className="text-xs text-gray-400 leading-relaxed font-light">"{sub.message}"</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
