import { SitemapStream, streamToPromise } from 'sitemap';
import fs, { createWriteStream } from 'fs';
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
    try {
        const stream = new SitemapStream({ hostname: 'https://patchmaster.pro' });

        // Ensure the output directory exists
        const writePath = path.resolve('./public/sitemap.xml');
        const publicDir = path.dirname(writePath);

        if (!fs.existsSync(publicDir)) {
            console.log('Creating public directory...');
            fs.mkdirSync(publicDir, { recursive: true });
        }

        const data = await streamToPromise(Readable.from(links).pipe(stream));

        createWriteStream(writePath).write(data.toString());
        console.log('Sitemap generated at', writePath);
    } catch (error) {
        console.error('Failed to generate sitemap:', error.message);
        // Don't exit with 1 if we want the build to continue even if sitemap fails, 
        // but here it's likely better to see the error.
    }
};

generateSitemap();
