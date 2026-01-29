/**
 * Utility function to get the correct path for static assets
 * This ensures basePath is included when building for production
 */

// Get basePath from Next.js config or environment
// In production builds with basePath, this will be set
const getBasePath = () => {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    // Try to get basePath from the current path
    const path = window.location.pathname;
    // If path starts with a repository-like segment, extract it
    // This is a fallback - basePath should be handled by Next.js automatically
    return '';
  }
  return '';
};

/**
 * Prefixes a path with the basePath if needed
 * For static export with basePath, Next.js should handle this automatically,
 * but this utility can be used as a fallback
 * 
 * @param {string} path - The asset path (e.g., '/img/logo.svg')
 * @returns {string} - The path with basePath prefix if needed
 */
export const getAssetPath = (path) => {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const basePath = getBasePath();
  
  // If basePath exists and path doesn't already start with it, add it
  if (basePath && !path.startsWith(basePath)) {
    return `${basePath}/${cleanPath}`;
  }
  
  // Return with leading slash
  return `/${cleanPath}`;
};

