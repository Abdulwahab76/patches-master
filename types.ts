
export type PatchCategory =
  | 'Embroidered'
  | 'Chenille'
  | 'PVC'
  | 'Silicone'
  | 'Leather'
  | 'Woven'
  | 'Sublimated'
  | 'Metflex';

export interface PatchProduct {
  id: string;
  name: string;
  description: string;
  image: string;
  category: PatchCategory;
  priceStart: number;
}

export interface DesignIdea {
  title: string;
  concept: string;
  style: string;
  recommendedBacking: string;
}

export interface QuoteFormData {
  fullName: string;
  email: string;
  phone: string;
  patchType: string;
  quantity: string;
  width: string;
  height: string;
  designInspiration: string; // URL or description
  designFile?: File | null;
  details: string;
  productId?: string;
}

export interface CartItem {
  product: PatchProduct;
  quantity: number;
}
