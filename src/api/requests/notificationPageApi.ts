import axiosInstance from "../client/index";

export const getNotificationsApi = async (userId: any) => {
    try {
        const res = await axiosInstance.get(`/noti/${userId}`);
        return res;
    } catch (error) {
        console.error("Error getNotificationsApi", error);
        alert("Failed to getNotificationsApi");
        return null;
    }
};

export const deleteHandleDeleteNotification = async (notificationId: any) => {
    try {
        const res = await axiosInstance.get(`/noti/${notificationId}`);
        return res;
    } catch (error) {
        console.error("Error deleteHandleDeleteNotification", error);
        alert("Failed to deleteHandleDeleteNotification");
        return null;
    }
};