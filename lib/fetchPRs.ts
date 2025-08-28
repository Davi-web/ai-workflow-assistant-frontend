import axios from "axios";
import { IPullRequest } from "@/types/IPullRequest";

export const fetchPRs = async (): Promise<IPullRequest[]> => {
  const res = await axios.get("/api/prs");
  return res.data;
};