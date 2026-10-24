/**
 * Supabase client setup with graceful fallback.
 * If credentials are not provided, it transparently falls back to storageService.
 */

export const isSupabaseConfigured = (): boolean => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return Boolean(url && anonKey && url !== 'https://your-project-id.supabase.co');
};

export const getSupabaseConfigStatus = () => {
  const configured = isSupabaseConfigured();
  return {
    configured,
    mode: configured ? 'Supabase Cloud Database (PostgreSQL)' : 'Local Storage Adapter (Offline-Ready)',
    url: import.meta.env.VITE_SUPABASE_URL || 'Not Configured (Demo Mode Active)',
  };
};
