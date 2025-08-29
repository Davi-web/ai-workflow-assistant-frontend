export interface IPullRequest {
  pr_id: string;
  repo: string;
  pr_number: number;
  title: string;
  summary: string;
  changes: string[];
  impact: string;
  action_required: string;
  labels: string[];
  commit_messages: string[];
  created_at: string;
  updated_at: string;
  status: "open" | "closed" | "merged" | "draft";
  author: string;
  reviewers: string[];
}
