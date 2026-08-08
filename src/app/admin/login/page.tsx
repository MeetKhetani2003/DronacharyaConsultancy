'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAction } from './actions';
import { ShieldAlert } from 'lucide-react';
import { Btn, Reveal } from '@/components/ui';

export default function AdminLogin() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const formData = new FormData(e.currentTarget);
    try {
      const res = await loginAction(formData);
      if (res.success) {
        router.push('/admin/dashboard');
        router.refresh();
      } else {
        setError(res.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-mist flex items-center justify-center p-4">
      <Reveal className="w-full max-w-md">
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-ink/[0.05]">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center text-brand">
              <ShieldAlert className="w-8 h-8" />
            </div>
          </div>
          
          <h1 className="text-center font-display text-2xl font-bold text-ink mb-2">Admin Portal</h1>
          <p className="text-center text-sm font-medium text-ink/60 mb-8">Secure access to Dronacharya dashboard</p>
          
          {error && (
            <div className="bg-red-50 text-red-600 text-sm font-bold p-3 rounded-xl mb-6 text-center border border-red-100">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-ink/70 uppercase tracking-wider mb-2">Username</label>
              <input 
                type="text" 
                name="username"
                required
                className="w-full bg-mist/50 border border-ink/10 rounded-xl px-4 py-3 text-[14px] font-medium outline-none focus:border-brand/50 focus:bg-white transition-colors"
                placeholder="Enter admin username"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-ink/70 uppercase tracking-wider mb-2">Password</label>
              <input 
                type="password" 
                name="password"
                required
                className="w-full bg-mist/50 border border-ink/10 rounded-xl px-4 py-3 text-[14px] font-medium outline-none focus:border-brand/50 focus:bg-white transition-colors"
                placeholder="••••••••"
              />
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand text-white font-bold py-3.5 rounded-xl hover:bg-brand/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Authenticating...' : 'Secure Login'}
              </button>
            </div>
          </form>
        </div>
      </Reveal>
    </div>
  );
}
