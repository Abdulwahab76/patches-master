import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { Readable } from 'stream';
import path from 'path';
import { fileURLToPath } from 'url';

// Constants need to be duplicated or imported if this script is ESM. 
// For simplicity, we redefine categories here as this runs in Node environment.
const CATEGORIES = [
    'embroidered', 'chenille', 'pvc', 'silicone',
    'leather', 'woven', 'sublimated', 'metflex'
];

const links = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/shop', changefreq: 'daily', priority: 0.9 },
    { url: '/quote', changefreq: 'weekly', priority: 0.8 },
    ...CATEGORIES.map(slug => ({
        url: `/shop/${slug}`,
        changefreq: 'weekly',
        priority: 0.7
    }))
];

const generateSitemap = async () => {
    const stream = new SitemapStream({ hostname: 'https://patchmaster.pro' });

    // We can just use the public folder for output
    const writePath = path.resolve('./public/sitemap.xml');

    const data = await streamToPromise(Readable.from(links).pipe(stream));

    createWriteStream(writePath).write(data.toString());
    console.log('Sitemap generated at', writePath);
};

generateSitemap();
