import axiosInstance from "../client/index";

export const roomGetFollows = async (id: string) => {
    try {
        const res = await axiosInstance.get(`/room/follwing/${id}`);
        return res;
    } catch (error) {
        console.error("Error getting room/follwing data:", error);
        alert("Failed to get room/follwing data");
        return null;
    }
};

export const roomGetAll = async () => {
    try {
        const res = await axiosInstance.get(`/room`);
        return res;
    } catch (error) {
        console.error("Error getting /room data:", error);
        alert("Failed to get/room data");
        return null;
    }
};

export const roomGetSubscriptions = async (id: string) => {
    try {
        const res = await axiosInstance.get(`/membership/subscriptions/${id}`);
        return res;
    } catch (error) {
        console.error("Error getting /membership/subscriptions/ data:", error);
        alert("Failed to get /membership/subscriptions/ data");
        return null;
    }
};

export const roomGetInfluencerInfo = async (id: string) => {
    try {
        const res = await axiosInstance.get(`/room/influencer/${id}`);
        return res;
    } catch (error) {
        console.error("Error getting /room/influencer/ data:", error);
        alert("Failed to get /room/influencer/ data");
        return null;
    }
};


