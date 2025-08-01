import { useQuery, useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { queryHandler, mutationHandler, fileUpload } from "./useQueryFunction";

export const useReusableQuery = ({
  endpoint,          
  params = null,   
  withToken = false,
  enabled = true,    
  options = {},    
}) => {
  const token = withToken ? useSelector((state) => state.user.token) : null;
  const queryKey = [endpoint, { ...(params && { params }), ...(token && { token }) }];

  return useQuery({
    queryKey,
    queryFn: queryHandler,
    enabled,
    retry: false,
    refetchOnWindowFocus: false,
    ...options,
  });
};

export const useReusableMutation = ({
  isFile = false,       
  ...mutationOptions 
}) => {
  return useMutation({
    mutationFn: isFile ? fileUpload : mutationHandler,
    retry: false,
    ...mutationOptions,
  });
};


{/*
Get method
const { data, isLoading } = useReusableQuery({
  endpoint: "users",
  params: { limit: 10 },
  withToken: true,
});

post,put and delete method
const { mutate, isLoading } = useReusableMutation({
  mutationOptions: {
    onSuccess: (data) => {
      // Handle success
    },
    onError: (error) => {
      // Handle error
    },
  },
});

file upload method 
const { mutate: uploadFile } = useReusableMutation({
  isFile: true,
  mutationOptions: {
    onSuccess: (res) => console.log("File uploaded:", res),
  },
});

const formData = new FormData();
formData.append("file", selectedFile);

uploadFile({
  endPoint: "upload",
  formData,
  token: "your-token-here",
});
    */}