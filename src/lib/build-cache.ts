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
      return fetchFn();
    }
  }
  
  const cacheFile = path.join(CACHE_DIR, `${key.replace(/[^a-zA-Z0-9]/g, '_')}.json`);
  let cacheData = null;
  
  if (fs.existsSync(cacheFile)) {
    const stats = fs.statSync(cacheFile);
    const isRecent = Date.now() - stats.mtimeMs < 3600000;
    try {
      cacheData = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
      // If cache is recent, return it immediately
      if (isRecent) {
        return cacheData;
      }
    } catch (e) {
      // Ignore parse errors and try to fetch
    }
  }

  try {
    const data = await fetchFn();
    try {
      fs.writeFileSync(cacheFile, JSON.stringify(data));
    } catch (e) {}
    return data;
  } catch (e) {
    // If fetch fails but we have old cache, use it
    if (cacheData) {
      console.warn(`[BuildCache] Fetch failed for ${key}, falling back to old cache.`);
      return cacheData;
    }
    throw e;
  }
}
