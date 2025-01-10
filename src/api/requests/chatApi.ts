import axiosInstance from "../client/index";

export const chatSaveMessage = async (data: { room_id: string; user_id: string; message_content: string }) => {
    try {
        const res = await axiosInstance.post(`/message`, data);
        return res;
    } catch (error) {
        console.error("Error chatSaveMessage", error);
        alert("Failed to chatSaveMessage");
        return null;
    }
};


export const chatHandleImageUpload = async (formData: FormData) => {
    try {
        const res = await axiosInstance.post("message/upload", formData);

        return res;
    } catch (error) {
        console.error("Error chatHandleImageUpload", error);
        alert("Failed to chatHandleImageUpload");
    }
};


export const chatFetchMessages = async (roomId: string, currentPage: number, limit: number) => {
    try {
        const res = await axiosInstance.get(`message/room?roomId=${roomId}&page=${currentPage}&limit=${limit}`);
        return res;
    } catch (error) {
        console.error("Error chatFetchMessages", error);
        alert("Failed to chatFetchMessages");
    }
};


export const chatHandleDeleteImage = async (data: { id: string, key: string }) => {
    try {
        const res = await axiosInstance.post("message/delete", data);

        return res;
    } catch (error) {
        console.error("Error chatHandleDeleteImage", error);
        alert("Failed to chatHandleDeleteImage");
    }
};