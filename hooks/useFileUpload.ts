import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// API call to upload the file
const uploadFile = async (file: File): Promise<any> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axiosInstance.post("/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    if (!response || response.status !== 200) {
        throw new Error("Failed to upload file");
    }

    return response.data;
};

// Custom hook
const useFileUpload = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: uploadFile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["files"] });
        },
    });
};

export default useFileUpload;
