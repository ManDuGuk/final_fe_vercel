import axiosInstance from "../client/index";

export const postFetchFeeds = async (
    endpoint: any,
    data: { queue: any; limit: any; userId: any }) => {
    try {
        const res = await axiosInstance.post(`/homefeed/${endpoint}`, data);
        return res;
    } catch (error) {
        console.error("Error getFetchFeeds", error);
        alert("Failed to getFetchFeeds");
        return null;
    }
};

export const postInitFeeds = async (
    data: { userId: any; userFollowList: any; }) => {
    try {
        const res = await axiosInstance.post(`homefeed/getFeedsQueue`, data);
        return res;
    } catch (error) {
        console.error("Error postInitFeeds", error);
        alert("Failed to postInitFeeds");
        return null;
    }
};
