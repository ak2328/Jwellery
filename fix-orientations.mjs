import sharp from 'sharp';
import { readdir, readFile, writeFile } from 'fs/promises';
import { join, extname } from 'path';

const DIRS = [
  'client/public/products',
  'client/public/figmaAssets',
  'client/public/figmaAssets2',
  'client/public/website',
];

const EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

async function fixDir(dir) {
  let files;
  try {
    files = await readdir(dir);
  } catch {
    console.log(`Skipping missing dir: ${dir}`);
    return;
  }

  for (const file of files) {
    const ext = extname(file).toLowerCase();
    if (!EXTS.has(ext)) continue;

    const fullPath = join(dir, file);

    try {
      // Read the file into a buffer (avoids file lock on input)
      const inputBuf = await readFile(fullPath);
      
      // Auto-rotate based on EXIF and output to buffer
      const outputBuf = await sharp(inputBuf).rotate().toBuffer();
      
      // Write the buffer directly back to the file
      await writeFile(fullPath, outputBuf);

      console.log(`✓ Fixed: ${file}`);
    } catch (err) {
      console.log(`✗ Skipped ${file}: ${err.message}`);
    }
  }
}

console.log('🔄 Auto-rotating all product images based on EXIF data...\n');
for (const dir of DIRS) {
  console.log(`\n📁 Processing: ${dir}`);
  await fixDir(dir);
}
console.log('\n✅ Done! All images have been permanently rotated correctly.');
