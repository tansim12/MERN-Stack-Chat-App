import { useQuery } from "@tanstack/react-query";
import { globalInstance } from "./useGlobalInstance";
import useAuthContext from "../Utils/useAuthContext";

const useSearchUsersData = (email) => {
  const { user } = useAuthContext();
  const { data: findOneUserData } = useQuery({
    queryKey: ["findOneUser"],
    queryFn: async () => {
      const fetchData = await globalInstance.get(
        `/findOneUser?email=${user?.email}`
      );
      return fetchData?.data;
    },
  });
  return { findOneUserData };
};

export default useSearchUsersData;
