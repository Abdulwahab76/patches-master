import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  name?: string;
  type?: string;
  image?: string;
  url?: string;
  canonical?: string;
}

export default function SEO({
  title,
  description,
  name = 'PatchMaster Pro',
  type = 'website',
  image = 'https://picsum.photos/seed/patch_og/1200/630',
  url = 'https://patchmaster.pro',
  canonical
}: SEOProps) {
  useEffect(() => {
    // Update title
    document.title = title;

    // Helper to update or create meta tags
    const updateMeta = (selector: string, content: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (selector.startsWith('meta[name=')) {
          const nameMatch = selector.match(/name=['"](.+?)['"]/);
          if (nameMatch) element.setAttribute('name', nameMatch[1]);
        } else if (selector.startsWith('meta[property=')) {
          const propMatch = selector.match(/property=['"](.+?)['"]/);
          if (propMatch) element.setAttribute('property', propMatch[1]);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMeta('meta[name="description"]', description);
    updateMeta('meta[property="og:type"]', type);
    updateMeta('meta[property="og:title"]', title);
    updateMeta('meta[property="og:description"]', description);
    updateMeta('meta[property="og:image"]', image);
    updateMeta('meta[property="og:url"]', url);
    updateMeta('meta[name="twitter:title"]', title);
    updateMeta('meta[name="twitter:description"]', description);
    updateMeta('meta[name="twitter:image"]', image);

    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonical);
    }
  }, [title, description, image, url, type, canonical]);

  return null;
}
