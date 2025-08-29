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
  const router = useRouter();

  const filteredAndSortedPRs = useMemo(() => {
    const filtered = pullRequests.filter((pr) => {
      const matchesSearch =
        pr.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pr.repo.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLabel =
        !filters.label || filters.label.toLowerCase() === ""
          ? true
          : pr.labels.includes(filters.label);

      const matchesRepo =
        !filters.repo || filters.repo.toLowerCase() === ""
          ? true
          : pr.repo.toLowerCase().includes(filters.repo.toLowerCase());

      const matchesAuthor =
        !filters.author || filters.author.toLowerCase() === ""
          ? true
          : pr.author.toLowerCase().includes(filters.author.toLowerCase());

      return matchesSearch && matchesLabel && matchesRepo && matchesAuthor;
    });

    return filtered.sort((a, b) => {
      const aTime = new Date(a.created_at).getTime();
      const bTime = new Date(b.created_at).getTime();
      return sortOption.direction === "asc" ? aTime - bTime : bTime - aTime;
    });
  }, [pullRequests, searchQuery, filters, sortOption]);

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
  const handleCardClick = (prRepo: string, prId: string) => {
    router.push(`/repo/${prRepo}/pr/${prId}`)
  }
  console.log(pullRequests);
  // 


  return (
    <div className="min-h-screen bg-dashboard-bg">
      <DashboardHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filters={filters}
        onFilterChange={(partial) =>
          setFilters((prev) => ({ ...prev, ...partial }))
        }
        sortOption={sortOption}
        onSortChange={(partial) =>
          setSortOption((prev) => ({ ...prev, ...partial }))
        }
        refetch={refetch}
        pullRequests={pullRequests}
      />
      {isFetching ? (
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

export default Dashboard;
