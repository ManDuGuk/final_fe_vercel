import { create } from "zustand";
import axios from "axios";
import { getFetchProducts, putUpdateProduct } from '../api/requests/membershipStoreApi';

export interface MembershipProduct {
  id: number;
  influencer_id: number;
  level: number;
  name: string;
  image?: string | null;
  price: number;
  benefits?: string[] | string | null; // 배열과 문자열 모두 허용
}

interface MembershipStore {
  products: MembershipProduct[];
  fetchProducts: (influencerId: number) => Promise<void>;
  updateProduct: (
    productId: number,
    updatedData: Partial<MembershipProduct>,
  ) => Promise<void>;
}

export const useMembershipStore = create<MembershipStore>((set) => ({
  products: [],

  // Fetch all products for a specific influencer
  fetchProducts: async (influencerId: number) => {
    try {
      const response = await getFetchProducts(influencerId);
      if (!response || !response.data) {
        console.error('User postUserResponse is not available.');
        return; // 빈 결과 반환
      }

      set({ products: response.data });
    } catch (error) {
      console.error("Failed to fetch membership products:", error);
    }
  },

  // Update a specific membership product
  updateProduct: async (productId, updatedData) => {
    try {
      const response = await putUpdateProduct(productId, updatedData);
      if (!response || !response.data) {
        console.error('User postUserResponse is not available.');
        return; // 빈 결과 반환
      }

      set((state) => ({
        products: state.products.map((product) =>
          product.id === productId ? { ...product, ...updatedData } : product,
        ),
      }));
    } catch (error) {
      console.error("Failed to update membership product:", error);
    }
  },
}));
