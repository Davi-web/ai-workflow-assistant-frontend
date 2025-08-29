"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IFilterOptions } from "@/types/IFilterOptions";
import { ISortOption } from "@/types/ISortOptions";
import { IPullRequest } from "@/types";
import { LucideGithub, LucideInfo, LucideRefreshCcw } from "lucide-react";
import { useInfoModal } from "@/stores/useInfoModal";
import { useRepositoryModal } from "@/stores/useRepositoryModal";

interface DashboardHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filters: IFilterOptions;
  onFilterChange: (value: Partial<IFilterOptions>) => void;
  sortOption: ISortOption;
  onSortChange: (value: Partial<ISortOption>) => void;
  refetch: () => void;
  pullRequests: IPullRequest[];
}

export default function DashboardHeader({
  searchQuery,
  onSearchChange,
  filters,
  onFilterChange,
  sortOption,
  onSortChange,
  refetch,
  pullRequests,
}: DashboardHeaderProps) {
  const { openInfo } = useInfoModal();
  const { openRepository } = useRepositoryModal();
  const repoOptions = Array.from(
    new Set(pullRequests.map((pr) => pr.repo)), // just repo name, not owner
  ).sort();
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-white shadow-sm rounded-xl">
      {/* Name */}
      <h1 className="text-2xl font-bold">Pull Request Dashboard</h1>
      {/* Search */}
      <Input
        type="text"
        placeholder="Search pull requests..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full md:w-1/3"
      />

      {/* Filters */}
      {/* Author filter */}
      <Select
        value={filters.author || ""}
        onValueChange={(value) =>
          onFilterChange({ author: value === "all" ? "" : value })
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by author" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {Array.from(new Set(pullRequests.map((pr) => pr.author)))
            .sort()
            .map((author) => (
              <SelectItem key={author} value={author}>
                {author}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      {/* Repo filter */}
      <Select
        value={filters.repo || ""}
        onValueChange={(value) =>
          onFilterChange({ repo: value === "all" ? "" : value })
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by repo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {repoOptions.map((repo) => (
            <SelectItem key={repo} value={repo}>
              {repo}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.label || ""}
        onValueChange={(value) =>
          onFilterChange({ label: value === "all" ? "" : value })
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="Feature">Feature</SelectItem>
          <SelectItem value="Bug">Bug</SelectItem>
          <SelectItem value="Docs">Docs</SelectItem>
        </SelectContent>
      </Select>

      {/* Sorting */}
      <Select
        value={sortOption.direction} // now only direction matters
        onValueChange={(direction) =>
          onSortChange({
            field: "created_at",
            direction: direction as "asc" | "desc",
          })
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="desc">Newest</SelectItem>
          <SelectItem value="asc">Oldest</SelectItem>
        </SelectContent>
      </Select>
      <LucideRefreshCcw
        onClick={refetch}
        className="cursor-pointer text-gray-500 hover:text-gray-700"
        size={20}
      />
      {/** Info button */}
      <LucideInfo
        className="cursor-pointer text-gray-500 hover:text-gray-700"
        size={20}
        onClick={openInfo}
      />
      <LucideGithub
        className="cursor-pointer text-gray-500 hover:text-gray-700"
        size={20}
        onClick={openRepository}
      />
    </div>
  );
}
