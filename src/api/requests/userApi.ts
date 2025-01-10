import axiosInstance from "../client/index";

export const userGet = async (id: string) => {
    try {
        const res = await axiosInstance.get(`/user/${id}`);
        return res;
    } catch (error) {
        console.error("Error getting user data:", error);
        alert("Failed to get user data");
        return null;
    }
};
