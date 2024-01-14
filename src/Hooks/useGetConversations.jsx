import { useQuery } from "@tanstack/react-query";
import { globalInstance } from "./useGlobalInstance";


const useGetConversations = (creatorEmail) => {
  
  const { data: allConversationData, refetch: allConversationDataRefetch } =
    useQuery({
      queryKey: ["allConversation", creatorEmail],
      queryFn: async () => {
        const fetchData = await globalInstance.get(
          `/conversation?creatorEmail=${creatorEmail}`
        );
        return fetchData?.data;
      },
    });
  return { allConversationData, allConversationDataRefetch };
};

export default useGetConversations;
