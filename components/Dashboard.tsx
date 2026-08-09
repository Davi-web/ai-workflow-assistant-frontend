"use client";
import PRCard from "@/components/PRCard";
import DashboardHeader from "@/components/DashboardHeader";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, FC } from "react";
import Link from "next/link";
import { IFilterOptions } from "@/types/IFilterOptions";
import { ISortOption } from "@/types/ISortOptions";
import { IPullRequest } from "@/types/IPullRequest";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge, Calendar, GitPullRequest, Tag, User } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
interface DashboardProps {
  pullRequests: IPullRequest[];
  refetch: () => void;
  isFetching?: boolean;
}
const labelColors: Record<string, string> = {
  Feature: "bg-green-100 text-green-800",
  Bug: "bg-red-100 text-red-800",
  Docs: "bg-blue-100 text-blue-800",
  "Small Size": "bg-purple-100 text-purple-800",
  "Medium Size": "bg-yellow-100 text-yellow-800",
  "Large Size": "bg-pink-100 text-pink-800",
};

const Dashboard: FC<DashboardProps> = ({
  pullRequests,
  refetch,
  isFetching,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<string>("all");
    const [sortBy, setSortBy] = useState<string>("updated_at")
  
  const router = useRouter();
  const filteredPRs = useMemo(() => {
    const filtered = pullRequests.filter((pr) => {
      const matchesSearch =
        pr.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pr.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pr.repo.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = filters === "all" || pr.status === filters

      return matchesSearch && matchesStatus
    })
  // Sort PRs
  return filtered.sort((a, b) => {
    switch (sortBy) {
      case "created_at":
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      case "updated_at":
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      case "title":
        return a.title.localeCompare(b.title)
      case "author":
        return a.author.localeCompare(b.author)
      default:
        return 0
    }
  })
}, [pullRequests, searchQuery, filters, sortBy])
  console.log("Filtered PRs:", filteredPRs, filters, sortBy);


  // const filteredAndSortedPRs = useMemo(() => {
  //   const filtered = pullRequests.filter((pr) => {
  //     const matchesSearch =
  //       pr.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       pr.repo.toLowerCase().includes(searchQuery.toLowerCase());

  //     const matchesLabel =
  //       !filters.label || filters.label.toLowerCase() === ""
  //         ? true
  //         : pr.labels.includes(filters.label);

  //     const matchesRepo =
  //       !filters.repo || filters.repo.toLowerCase() === ""
  //         ? true
  //         : pr.repo.toLowerCase().includes(filters.repo.toLowerCase());

  //     const matchesAuthor =
  //       !filters.author || filters.author.toLowerCase() === ""
  //         ? true
  //         : pr.author.toLowerCase().includes(filters.author.toLowerCase());

  //     return matchesSearch && matchesLabel && matchesRepo && matchesAuthor;
  //   });

  //   return filtered.sort((a, b) => {
  //     const aTime = new Date(a.created_at).getTime();
  //     const bTime = new Date(b.created_at).getTime();
  //     return sortOption.direction === "asc" ? aTime - bTime : bTime - aTime;
  //   });
  // }, [pullRequests, searchQuery, filters, sortOption]);

   const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-primary text-primary-foreground"
      case "merged":
        return "bg-accent text-accent-foreground"
      case "closed":
        return "bg-destructive text-destructive-foreground"
      case "draft":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const handleCardClick = (prId: string) => {
      router.push(`/${prId}`)
    }

    if (isFetching) {
      return <DashboardSkeleton />
    }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <DashboardHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filters={filters}
        onFilterChange={(value) =>
          setFilters(value)
        }
        sortOption={sortBy}
        onSortChange={(value) =>
          setSortBy(value)
        }
        refetch={refetch}
        pullRequests={pullRequests}
      />
      {/* {isFetching ? (
        <div className="flex justify-center items-center mt-10">
          <motion.div
            className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          />
        </div>
      ) : (
        <Table className="mt-6">
          <TableHeader>
            <TableRow>
              <TableHead>Author</TableHead>
              <TableHead>Repo</TableHead>
              <TableHead>PR #</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Labels</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedPRs.map((pr) => (
              <TableRow key={pr.pr_id}>
                <TableCell>{pr.author}</TableCell>
                <TableCell>{pr.repo.split("/")[1]}</TableCell>
                <TableCell>{pr.pr_number}</TableCell>
                <TableCell>
                  <Link
                    href={`/${pr.pr_id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {pr.title}
                  </Link>
                </TableCell>
                <TableCell className="flex flex-wrap gap-2">
                  {pr.labels.map((label) => (
                    <span
                      key={label}
                      className={`px-2 py-1 text-sm font-medium rounded-full ${
                        labelColors[label] || "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {label}
                    </span>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {filteredAndSortedPRs.length === 0 && (
        <motion.div className="text-center py-12">
          <div className="bg-dashboard-card rounded-lg border p-8 max-w-md mx-auto shadow-[var(--shadow-card)]">
            <h3 className="text-lg font-semibold mb-2">
              No pull requests found
            </h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or filters
            </p>
          </div>
        </motion.div>
      )} */}
      {filteredPRs.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <GitPullRequest className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No pull requests found</h3>
            <p className="text-muted-foreground">
              {searchQuery || filters !== "all"
                ? "Try adjusting your search or filters"
                : "No pull requests available"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <Table className="mt-6">
          <TableHeader>
            <TableRow>
              <TableHead>Author</TableHead>
              <TableHead>Repo</TableHead>
              <TableHead>PR #</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Labels</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPRs.map((pr) => (
              <TableRow key={pr.pr_id}>
                <TableCell>{pr.author}</TableCell>
                <TableCell>{pr.repo.split("/")[1]}</TableCell>
                <TableCell>{pr.pr_number}</TableCell>
                <TableCell>
                  <Link
                    href={`/${pr.pr_id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {pr.title}
                  </Link>
                </TableCell>
                <TableCell className="flex flex-wrap gap-2">
                  {pr.labels.map((label) => (
                    <span
                      key={label}
                      className={`px-2 py-1 text-sm font-medium rounded-full ${
                        labelColors[label] || "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {label}
                    </span>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* <div className="container mx-auto px-6 py-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredAndSortedPRs.length} of {initialPRs.length} pull requests
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${searchQuery}-${JSON.stringify(filters)}-${JSON.stringify(sortOption)}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredAndSortedPRs.map((pr) => (
              <Link key={pr.pr_id} href={`/pr/${pr.pr_id}`}>
                <PRCard
                  title={pr.title}
                  summary={pr.summary}
                  changes={pr.changes}
                  labels={pr.labels}
                />
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredAndSortedPRs.length === 0 && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
            <div className="bg-dashboard-card rounded-lg border p-8 max-w-md mx-auto shadow-[var(--shadow-card)]">
              <h3 className="text-lg font-semibold mb-2">No pull requests found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or filters
              </p>
            </div>
          </motion.div>
        )}
      </div> */}
    </div>
  );
};


function DashboardSkeleton() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>
      <div className="flex gap-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-20" />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-4" />
              <Skeleton className="h-16 w-full mb-4" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Dashboard;
