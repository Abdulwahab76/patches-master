import React from 'react';
import { Helmet } from 'react-helmet-async';

export const OrganizationSchema = () => {
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

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
        </Helmet>
    );
};

export const ProductSchema = ({ name, description, image, price, currency = "USD" }: any) => {
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

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
        </Helmet>
    );
};

export const BreadcrumbSchema = ({ items }: { items: { name: string; url: string }[] }) => {
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

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
        </Helmet>
    );
};
