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
import { Filter, GitPullRequest, LucideGithub, LucideInfo, LucideRefreshCcw, Search } from "lucide-react";
import { useInfoModal } from "@/stores/useInfoModal";
import { useRepositoryModal } from "@/stores/useRepositoryModal";
import { Card, CardContent } from "./ui/card";

interface DashboardHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filters: string;
  onFilterChange: (value: string) => void;
  sortOption: string;
  onSortChange: (value: string) => void;
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
    <>
     <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-balance">GitHub Pull Requests</h1>
          <p className="text-muted-foreground text-pretty">
            Manage and review your team's pull requests across all repositories
          </p>
        </div>
        <div className="flex items-center gap-3 pt-1">
          <LucideRefreshCcw
            onClick={refetch}
            className="cursor-pointer text-gray-500 hover:text-gray-700"
            size={20}
          />
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
      </div>
    {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by title, author, or repository..."
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <Select value={filters} onValueChange={onFilterChange}>
            <SelectTrigger className="w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="opened">Open</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="merged">Merged</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortOption} onValueChange={onSortChange}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="updated_at">Last Updated</SelectItem>
              <SelectItem value="created_at">Created Date</SelectItem>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="author">Author</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <GitPullRequest className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total PRs</p>
                <p className="text-2xl font-bold">{pullRequests.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Open</p>
                <p className="text-2xl font-bold">{pullRequests.filter((pr) => pr.status === "opened").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Merged</p>
                <p className="text-2xl font-bold">{pullRequests.filter((pr) => pr.status === "merged").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-muted" />
              <div>
                <p className="text-sm text-muted-foreground">Draft</p>
                <p className="text-2xl font-bold">{pullRequests.filter((pr) => pr.status === "draft").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>

  );
}
// Search
//       <Input
//         type="text"
//         placeholder="Search pull requests..."
//         value={searchQuery}
//         onChange={(e) => onSearchChange(e.target.value)}
//         className="w-full md:w-1/3"
//       />

//       {/* Filters */}
//       {/* Author filter */}
//       <Select
//         value={filters.author || ""}
//         onValueChange={(value) =>
//           onFilterChange({ author: value === "all" ? "" : value })
//         }
//       >
//         <SelectTrigger className="w-[180px]">
//           <SelectValue placeholder="Filter by author" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectItem value="all">All</SelectItem>
//           {Array.from(new Set(pullRequests.map((pr) => pr.author)))
//             .sort()
//             .map((author) => (
//               <SelectItem key={author} value={author}>
//                 {author}
//               </SelectItem>
//             ))}
//         </SelectContent>
//       </Select>

//       {/* Repo filter */}
//       <Select
//         value={filters.repo || ""}
//         onValueChange={(value) =>
//           onFilterChange({ repo: value === "all" ? "" : value })
//         }
//       >
//         <SelectTrigger className="w-[180px]">
//           <SelectValue placeholder="Filter by repo" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectItem value="all">All</SelectItem>
//           {repoOptions.map((repo) => (
//             <SelectItem key={repo} value={repo}>
//               {repo}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>

//       <Select
//         value={filters.label || ""}
//         onValueChange={(value) =>
//           onFilterChange({ label: value === "all" ? "" : value })
//         }
//       >
//         <SelectTrigger className="w-[180px]">
//           <SelectValue placeholder="Filter by type" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectItem value="all">All</SelectItem>
//           <SelectItem value="Feature">Feature</SelectItem>
//           <SelectItem value="Bug">Bug</SelectItem>
//           <SelectItem value="Docs">Docs</SelectItem>
//         </SelectContent>
//       </Select>

//       {/* Sorting */}
//       <Select
//         value={sortOption.direction} // now only direction matters
//         onValueChange={(direction) =>
//           onSortChange({
//             field: "created_at",
//             direction: direction as "asc" | "desc",
//           })
//         }
//       >
//         <SelectTrigger className="w-[180px]">
//           <SelectValue placeholder="Sort by" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectItem value="desc">Newest</SelectItem>
//           <SelectItem value="asc">Oldest</SelectItem>
//         </SelectContent>
//       </Select>
//       <LucideRefreshCcw
//         onClick={refetch}
//         className="cursor-pointer text-gray-500 hover:text-gray-700"
//         size={20}
//       />
//       {/** Info button */}
//       <LucideInfo
//         className="cursor-pointer text-gray-500 hover:text-gray-700"
//         size={20}
//         onClick={openInfo}
//       />
//       <LucideGithub
//         className="cursor-pointer text-gray-500 hover:text-gray-700"
//         size={20}
//         onClick={openRepository}
//       />