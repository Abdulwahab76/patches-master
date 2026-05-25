import { PatchProduct } from "./types";

export interface QuoteItem extends PatchProduct {
  quantity: number;
  width: string;
  height: string;
  backing: string;
  notes: string;
  designFile?: File | null;
}

export interface QuoteFormData {
  fullName: string;
  email: string;
  phone: string;

  patchType: string;
  quantity: string;

  width: string;
  height: string;

  designInspiration: string;
  details: string;

  designFile?: File;
}
