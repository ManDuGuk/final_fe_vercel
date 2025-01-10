import axios from "axios";
import axiosInstance from "../api/client/index";

export const fetchNotifications = async (userId: number) => {
  const response = await axiosInstance.get(
    `/notification/${userId}`,
  );
  return response.data;
};

// 알림 읽음 상태 업데이트
export const markNotificationAsRead = async (notificationId: number) => {
  const response = await axiosInstance.patch(
    `/notification/${notificationId}/read`,
  );
  return response.data;
};
