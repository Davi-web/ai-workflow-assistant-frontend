// app/api/prs/route.ts
import { NextRequest, NextResponse } from "next/server";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { IPullRequest } from "@/types/IPullRequest";

export async function GET(req: NextRequest) {
  const client = new DynamoDBClient({ region: process.env.AWS_REGION });
  const docClient = DynamoDBDocumentClient.from(client);

  try {
    const res = await docClient.send(
      new ScanCommand({ TableName: process.env.DYNAMODB_TABLE_NAME })
    );

    const pullRequests: IPullRequest[] = (res.Items || []).map((item) => ({
      pr_id: item.pr_id,
      repo: item.repo,
      pr_number: item.pr_number,
      title: item.title,
      summary: item.summary,
      changes: JSON.parse(item.changes || "[]"),
      impact: item.impact,
      action_required: item.action_required,
      labels: JSON.parse(item.labels || "[]"),
      commit_messages: JSON.parse(item.commit_messages || "[]"),
      created_at: item.created_at,
      updated_at: item.updated_at,
      status: item.status,
      author: item.author,
      reviewers: JSON.parse(item.reviewers || "[]"),
    }));

    return NextResponse.json(pullRequests);
  } catch (err) {
    console.error("Failed to fetch PRs from DynamoDB:", err);
    return NextResponse.json([], { status: 500 });
  }
}
