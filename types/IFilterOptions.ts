export interface IFilterOptions {
  status: string; // e.g., "open", "closed"
  author: string; // e.g., GitHub username
  repo: string; // repository name
  label: string; // e.g., "Bug", "Feature", "Docs"
}
