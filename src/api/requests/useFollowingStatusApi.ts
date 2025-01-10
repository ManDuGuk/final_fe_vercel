import axiosInstance from "../client/index";


export const patchToggleIsFollowingInfluencer = async (data: { userId: any; influencerId: any; isFollowing: any }) => {
    try {
        const res = await axiosInstance.patch(`/homefeed/patchuserfollow`, data);
        return res;
    } catch (error) {
        console.error("Error patchToggleIsFollowingInfluencer", error);
        alert("Failed to patchToggleIsFollowingInfluencer");
        return null;
    }
};

export const getInfluencerResponse = async (params: { influencerId: any }) => {
    try {
        const res = await axiosInstance.get(`/homefeed/getMembershipProductsFromInfluencerId`, { params });
        return res;
    } catch (error) {
        console.error("Error getFetchFeeds", error);
        alert("Failed to getFetchFeeds");
        return null;
    }
};

export const postUserResponse = async (data: { userId: any; }) => {
    try {
        const res = await axiosInstance.post(`/homefeed/getMembershipFromUserId`, data);
        return res;
    } catch (error) {
        console.error("Error postUserResponse", error);
        alert("Failed to postUserResponse");
        return null;
    }
};