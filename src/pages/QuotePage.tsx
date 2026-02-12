import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import QuoteForm from '../../components/QuoteForm';
import SEO from '../components/SEO';
import { PRODUCTS } from '../../constants';

const QuotePage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const productId = searchParams.get('productId');

    const selectedProduct = useMemo(() => {
        return PRODUCTS.find(p => p.id === productId);
    }, [productId]);

    return (
        <>
            <SEO
                title="Get a Custom Quote | PatchMaster Pro"
                description="Request a free quote for your custom patches. 2 hour turnaround on design proofs."
                canonical="https://patchmaster.pro/quote"
            />
            <div className="bg-slate-50 min-h-screen pt-12 pb-24">
                <QuoteForm selectedProduct={selectedProduct} />
            </div>
        </>
    );
};

export default QuotePage;
