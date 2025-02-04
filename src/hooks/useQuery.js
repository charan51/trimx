import { useQuery } from "react-query";
import api from "../api/app";
export const useFetchTotalClicks = (token, onError) => {
  return useQuery(
    "url-totalclick",
    async () => {
      return await api.get("/urls/totalClicks?startDate=2025-01-27&endDate=2025-02-27", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
    },
    {
        select: (data) => {
            const converToArray = Object.keys(data.data).map((key) => ({
                clickDate: key,
                count: data.data[key]
            }));
            return converToArray;
        },
        onError,
        staleTime: 5000
    }
  );
};
export const useFetchAllUrls = (token, onError) => {
  return useQuery(
    "my-shortenUrls",
    async () => {
      return await api.get("/urls/myUrls", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
    },
    {
        select: (data) => {

            const sortedData = data.data.sort(
              (a,b) => new Date(b.createdDate) - new Date(a.createdDate)
            )
            return sortedData;
        },
        onError,
        staleTime: 5000
    }
  );
};