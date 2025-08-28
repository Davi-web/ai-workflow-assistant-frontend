"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { IFilterOptions } from "@/types/IFilterOptions"
import { ISortOption } from "@/types/ISortOptions"

interface DashboardHeaderProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  filters: IFilterOptions
  onFilterChange: (value: Partial<IFilterOptions>) => void
  sortOption: ISortOption
  onSortChange: (value: Partial<ISortOption>) => void
  refetch: () => void
}

export default function DashboardHeader({
  searchQuery,
  onSearchChange,
  filters,
  onFilterChange,
  sortOption,
  onSortChange,
  refetch,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-white shadow-sm rounded-xl">
      {/* Search */}
      <Input
        type="text"
        placeholder="Search pull requests..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full md:w-1/3"
      />

      {/* Filters */}
      <Select
        value={filters.label || "all"} // fallback to "all"
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
          onSortChange({ field: "created_at", direction: direction as "asc" | "desc" })
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
      <button
        onClick={refetch}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
      >Refresh PRs
      </button>
    </div>
  )
}
