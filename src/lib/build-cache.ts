export async function getWithBuildCache(key: string, fetchFn: () => Promise<any>) {
  // If we are in the browser, just fetch directly
  if (typeof window !== 'undefined') {
    return fetchFn();
  }

  // Use dynamic imports for Node-only modules
  const fs = await import('fs');
  const path = await import('path');
  const CACHE_DIR = path.join(process.cwd(), '.build_cache');

  if (!fs.existsSync(CACHE_DIR)) {
    try {
      fs.mkdirSync(CACHE_DIR, { recursive: true });
    } catch (e) {
      // Ignore if directory creation fails (e.g. read-only env)
      return fetchFn();
    }
  }
  
  const cacheFile = path.join(CACHE_DIR, `${key.replace(/[^a-zA-Z0-9]/g, '_')}.json`);
  
  if (fs.existsSync(cacheFile)) {
    const stats = fs.statSync(cacheFile);
    // Use cache if it's less than 1 hour old during build
    if (Date.now() - stats.mtimeMs < 3600000) {
      try {
        return JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
      } catch (e) {
        // Fallback to fetch if read fails
      }
    }
  }

  const data = await fetchFn();
  try {
    fs.writeFileSync(cacheFile, JSON.stringify(data));
  } catch (e) {
    // Ignore if write fails
  }
  return data;
}
