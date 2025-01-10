import axios from "axios";
import axiosInstance from "../api/client/index";

export const fetchUserInfo = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/user/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error; // 필요시 호출부에서 에러 처리
  }
};

export const fetchUserLikes = async (id: string) => {
  try {
    const response = await axiosInstance.get(`user/${id}/likes`);
    return response.data; // 정상적인 데이터 반환
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return [];
    }

    // 다른 에러는 그대로 던짐
    console.error("Error fetching likes:", error);
    throw error;
  }
};

export const fetchUserFeeds = async (userId: string | number) => {
  try {
    const response = await axiosInstance.get(`/user/${userId}/feeds`);
    return response.data;
  } catch (error) {
    console.error("Error fetching feeds:", error);
    throw error;
  }
};

export const fetchUserFollowings = async (id: string) => {
  try {
    const response = await axiosInstance.get(
      `/user/${id}/follows`,
    );
    // console.log('response.data:', response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching follows:", error);
    throw error;
  }
};

export const fetchUserModify = async (id: string, updatedData: FormData) => {
  try {
    const response = await axiosInstance.put(
      `/user/${id}`,
      updatedData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // FormData 전송을 위한 헤더 설정
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user info:", error);
    throw error;
  }
};

export const fetchInfluencers = async () => {
  try {
    const response = await axiosInstance.get("/influencer/all");
    return response.data;
  } catch (error) {
    console.error("Error fetching influencers:", error);
    throw error;
  }
};

export const fetchInfluencer = async (influencerId: string) => {
  try {
    const response = await axiosInstance.get(
      `/influencer/${influencerId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching influencer:", error);
    throw error;
  }
};

export const fetchFollow = async (userId: string, influencerId: string) => {
  try {
    const response = await axiosInstance.post(
      `/influencer/follow`,
      {
        userId,
        influencerId,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error toggling follow:", error);
    throw error;
  }
};

export const toggleProductStatus = async (productId: any) => {
  try {
    const response = await axiosInstance.patch(
      `/membership/product/${productId}`,
    );
    console.log("활성화 상태 변경: ", response.data ? "활성화" : "비활성화");
    return response.data;
  } catch (error) {
    console.error("Error toggling product status:", error);
    throw error;
  }
};

export const fetchUserSubscriptions = async (userId: string) => {
  const response = await axiosInstance.get(
    `/membership/subscriptions/${userId}`,
  );
  return response.data.map((sub: any) => ({
    influencerId: sub.product?.influencer_id,
    productName: sub.product?.name,
    productId: sub.product?.id,
    price: sub.product?.price,
    benefits: sub.product?.benefits || [],
  }));
};

export const registerInfluencer = async (influencerData: {
  user_id: number | undefined;
  follower: string[];
  banner_picture: string;
  category: string;
}) => {
  try {
    const response = await axiosInstance.post(
      "/influencer/register", // API 엔드포인트
      influencerData,
    );
    return response.data;
  } catch (error) {
    console.error("Error registering influencer:", error);
    throw error;
  }
};

export const exitInfluencer = async (influencer_id: number) => {
  try {
    const response = await axiosInstance.delete(
      `/influencer/${influencer_id}`, // API 엔드포인트
    );
    return response.data;
  } catch (error) {
    console.error("Error registering influencer:", error);
    throw error;
  }
};

export const applyInfluencer = async (influencerData: {
  user_id: number;
  category: string;
  banner_picture: string;
}) => {
  try {
    const response = await axiosInstance.post(
      "/influencer/apply", // 신청 API 엔드포인트
      influencerData,
    );
    return response.data;
  } catch (error) {
    console.error("Error applying for influencer:", error);
    throw error;
  }
};

export const checkPendingApplication = async (
  userId: number,
): Promise<boolean> => {
  try {
    const response = await fetch(
      `/influencer/apply/check/${userId}`,
    );
    const data = await response.json();
    return data.isPending;
  } catch (error) {
    console.error("Error checking pending application:", error);
    throw error;
  }
};
