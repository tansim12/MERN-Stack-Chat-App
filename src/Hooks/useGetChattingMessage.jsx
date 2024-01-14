import { useQuery } from "@tanstack/react-query";
import { globalInstance } from "./useGlobalInstance";

const useGetChattingMessage = (_id) => {
  const { data: allChattingMessage, refetch: allChattingMessageRefetch } =
    useQuery({
      queryKey: ["chattingMessage", _id],
      queryFn: async () => {
        const fetchData = await globalInstance.get(`/message/${_id}`);
        return fetchData?.data;
      },
    });
  return { allChattingMessage, allChattingMessageRefetch };
};

export default useGetChattingMessage;
