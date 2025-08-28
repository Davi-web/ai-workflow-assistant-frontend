"use client";

import { useQuery } from "@tanstack/react-query";
import DashboardHeader from "@/components/DashboardHeader";
import Dashboard from "@/components/Dashboard";
import { IFilterOptions, ISortOption, IPullRequest } from "@/types";
import { useState, useMemo } from "react";
import { fetchPRs } from "@/lib/fetchPRs";

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<IFilterOptions>({
    status: "",
    author: "",
    repo: "",
    label: "",
  });
  const [sortOption, setSortOption] = useState<ISortOption>({
    field: "created_at",
    direction: "desc",
  });

  const { data: pullRequests = [], refetch, isFetching } = useQuery({
    queryKey: ["prs"],
    queryFn: fetchPRs,
    staleTime: 1000 * 60, // 1 minute
  });
  console.log("Fetched PRs:", pullRequests);

  return (
    <div>


      <Dashboard pullRequests={pullRequests} refetch={refetch} isFetching={isFetching} />
    </div>
  );
}

