import React from 'react';

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
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content={name} />

      {canonical && <link rel="canonical" href={canonical} />}
    </>
  );
}
