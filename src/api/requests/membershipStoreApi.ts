import axiosInstance from "../client/index";

export const getFetchProducts = async (influencerId: any) => {
    try {
        const res = await axiosInstance.get(`/membership/products/${influencerId}`);
        return res;
    } catch (error) {
        console.error("Error getFetchProducts", error);
        alert("Failed to getFetchProducts");
        return null;
    }
};

export const putUpdateProduct = async (
    productId: any,
    updatedData: any) => {
    try {
        const res = await axiosInstance.put(`/membership/products/${productId}/benefits`, updatedData);
        return res;
    } catch (error) {
        console.error("Error putUpdateProduct", error);
        alert("Failed to putUpdateProduct");
        return null;
    }
};

