import axios from "axios";
import { IPullRequest } from "@/types/IPullRequest";

export const fetchPRs = async (): Promise<IPullRequest[]> => {
  const res = await axios.get("/api/pull-requests");
  return res.data;
};

export const fetchPRById = async (prId: string): Promise<IPullRequest | null> => {
  const res = await axios.get(`/api/pull-requests/${prId}`);
  return res.data;
}
