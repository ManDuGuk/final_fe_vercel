import axios from "axios";
import axiosInstance from "../api/client/index";

// 멤버십 목록 가져오기
export const fetchMembershipPlans = async (userId: string) => {
  const response = await axiosInstance.get(
    `/membership/products/${userId}`,
  );
  return response.data;
};

export const updateMembership = async (id: number, formData: FormData) => {
  await axiosInstance.patch(
    `/membership/products/${id}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );
};

// 이미지 삭제
export const deleteMembershipImage = async (
  productId: number,
  imageUrl: string,
) => {
  return axiosInstance.delete(`/membership/image`, {
    headers: { "Content-Type": "application/json" },
    data: { productId, imageUrl },
  });
};
