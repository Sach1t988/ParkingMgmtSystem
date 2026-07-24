import type { ReportItem, ReportResponse } from "~/types/report";

export const useReports = () => {
  const config = useRuntimeConfig();

  const authHeaders = (): Record<string, string> => {
    const token = import.meta.client ? localStorage.getItem("token") : null;

    return token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {};
  };

  const getReports = async (
    limit: number = 20,
    page: number = 1
  ): Promise<ReportItem[]> => {
    try {
      const response = await $fetch<ReportResponse>("/reports/detail", {
        baseURL: config.public.apiBase,
        method: "GET",
        headers: authHeaders(),
        query: {
          limit,
          page,
        },
      });

      return response.data.items;
    } catch (error) {
      console.error("Failed to fetch reports:", error);
      return [];
    }
  };

  return {
    getReports,
  };
};