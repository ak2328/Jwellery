import { supabase } from './supabase';

const BUCKET = 'product-images';

/**
 * Upload an image file to Supabase Storage.
 * Returns the public URL of the uploaded image.
 */
export async function uploadImage(file: File, folder = 'products'): Promise<string> {
  const ext = file.name.split('.').pop();
  const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(filename, file, { upsert: true, contentType: file.type });

  if (error) throw new Error(`Upload failed: ${error.message}`);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filename);
  return data.publicUrl;
}

/**
 * Delete an image from Supabase Storage given its public URL.
 */
export async function deleteImage(publicUrl: string): Promise<void> {
  const url = new URL(publicUrl);
  const path = url.pathname.split(`/storage/v1/object/public/${BUCKET}/`)[1];
  if (!path) return;
  await supabase.storage.from(BUCKET).remove([path]);
}
