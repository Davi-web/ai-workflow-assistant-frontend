"use client";

import { useQuery } from "@tanstack/react-query";
import Dashboard from "@/components/Dashboard";
import { fetchPRs } from "@/lib/fetchPRs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { InfoModal } from "@/components/InfoModal";
import { RepositoryModal } from "@/components/RepositoryModal";

const queryClient = new QueryClient();

const DashboardContent = () => {
  const { data: pullRequests = [], refetch, isFetching } = useQuery({
    queryKey: ["prs"],
    queryFn: fetchPRs,
    staleTime: 1000 * 60, // 1 minute
  });

  return (
    <>
      <Dashboard
        pullRequests={pullRequests}
        refetch={refetch}
        isFetching={isFetching}
      />
      <InfoModal />
      <RepositoryModal />
    </>
  );
}

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <DashboardContent />
    </QueryClientProvider>
  );
}
