import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteData, getId, getList, patchData, postData, putData } from "../service/api";
import { message } from "antd";

export const useListResources = (resource: string) => {  
    return useQuery({
        queryKey: [resource],
        queryFn: () => getList(resource),
    });
};

export const useResourceById = (resource: string, id: string) => {
    return useQuery({
        queryKey: [resource, id],
        queryFn: () => getId(resource, id),
        enabled: !!id,
    });
};

export const useDeleteResource = (resource: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteData(resource, id),
        onSuccess: () => {
            alert("Xóa thành công")
            queryClient.invalidateQueries({ queryKey: [resource] });
        },
        onError: () => {
           alert("Xóa thất bại");
        },
    });
};

export const usePostResource = (resource: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (values: any) => postData(resource, values),
        onSuccess: () => {
            alert("Thêm mới thành công")
            queryClient.invalidateQueries({ queryKey: [resource] });
        },
        onError: () => {
            alert("Thêm mới thất bại");
        },
    });
};

export const usePutResource = (resource: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, values }: { id: string; values: any }) =>
            putData(resource, id, values),
        onSuccess: () => {
            message.success("Cập nhật thành công");
            queryClient.invalidateQueries({ queryKey: [resource] });
        },
        onError: () => {
           alert("Cập nhật thất bại");
        },
    });
};


export const usePatchResource = (resource: string) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: ({ id, values }: { id: string; values: any }) =>
        patchData(resource, id, values),
      onSuccess: () => {
        message.success("Cập nhật thành công");
        queryClient.invalidateQueries({ queryKey: [resource] });
      },
      onError: () => {
        alert("Cập nhật thất bại");
      },
    });
  };
  
