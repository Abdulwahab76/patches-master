import { useEffect } from 'react';

const injectSchema = (id: string, schema: object) => {
    let script = document.getElementById(id) as HTMLScriptElement;
    if (!script) {
        script = document.createElement('script');
        script.id = id;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
};

export const OrganizationSchema = () => {
    useEffect(() => {
        const schema = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "PatchMaster Pro",
            "url": "https://patchmaster.pro",
            "logo": "https://picsum.photos/seed/patch_logo/400/400",
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-800-555-7282",
                "contactType": "Customer Service"
            },
            "sameAs": [
                "https://www.facebook.com/patchmasterpro",
                "https://www.instagram.com/patchmasterpro"
            ]
        };
        injectSchema('org-schema', schema);
    }, []);

    return null;
};

export const ProductSchema = ({ name, description, image, price, currency = "USD" }: any) => {
    useEffect(() => {
        const schema = {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": name,
            "image": image,
            "description": description,
            "brand": {
                "@type": "Brand",
                "name": "PatchMaster Pro"
            },
            "offers": {
                "@type": "Offer",
                "url": "https://patchmaster.pro/shop",
                "priceCurrency": currency,
                "price": price,
                "availability": "https://schema.org/InStock"
            }
        };
        injectSchema('product-schema', schema);
    }, [name, description, image, price, currency]);

    return null;
};

export const BreadcrumbSchema = ({ items }: { items: { name: string; url: string }[] }) => {
    useEffect(() => {
        const schema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": items.map((item, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": item.name,
                "item": item.url
            }))
        };
        injectSchema('breadcrumb-schema', schema);
    }, [items]);

    return null;
};
