// import { useQuery } from "@tanstack/react-query";
// import { globalInstance } from "./useGlobalInstance";

// const useSearchUsersData = ( name ) => {
//   const { data: searchUsersData } = useQuery({
//     queryKey: ["searchUsers"],
//     queryFn: async () => {
//       const fetchData = await globalInstance.get(`/searchUser?search=${name}`);
//       return fetchData?.data;
//     },
//   });
//   return { searchUsersData };
// };

// export default useSearchUsersData;
