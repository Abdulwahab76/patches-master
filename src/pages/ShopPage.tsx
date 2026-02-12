import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Shop from '../../components/Shop';
import SEO from '../components/SEO';
import { ProductSchema } from '../components/Schema';
import { PatchProduct } from '../../types';
import { CATEGORIES, PRODUCTS } from '../../constants';

interface ShopPageProps {
    onAddToCart: (p: PatchProduct) => void;
}

const ShopPage: React.FC<ShopPageProps> = ({ onAddToCart }) => {
    const { categorySlug } = useParams<{ categorySlug?: string }>();
    const navigate = useNavigate();

    // Find category name from slug, or default to 'All'
    const activeCategory = categorySlug
        ? CATEGORIES.find(c => c.slug === categorySlug)?.name || 'All'
        : 'All';

    const handleCategoryChange = (newCategory: string) => {
        if (newCategory === 'All') {
            navigate('/shop');
        } else {
            const cat = CATEGORIES.find(c => c.name === newCategory);
            if (cat) {
                navigate(`/shop/${cat.slug}`);
            }
        }
    };

    const handleRequestQuote = (product: PatchProduct) => {
        navigate(`/quote?productId=${product.id}`);
    };

    // Generate Schema for visible products
    const visibleProducts = activeCategory === 'All'
        ? PRODUCTS
        : PRODUCTS.filter(p => p.category === activeCategory);

    return (
        <>
            <SEO
                title={`Shop ${activeCategory === 'All' ? 'Custom Patches' : activeCategory + ' Patches'} | PatchMaster Pro`}
                description={`Browse our collection of ${activeCategory} patches. High quality, custom designs.`}
                canonical={`https://patchmaster.pro/shop${categorySlug ? '/' + categorySlug : ''}`}
            />

            {visibleProducts.slice(0, 5).map(p => (
                <ProductSchema
                    key={p.id}
                    name={p.name}
                    description={p.description}
                    image={p.image}
                    price={p.priceStart}
                />
            ))}

            <Shop
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
                onAddToCart={onAddToCart}
                onRequestQuote={handleRequestQuote}
            />
        </>
    );
};

export default ShopPage;
