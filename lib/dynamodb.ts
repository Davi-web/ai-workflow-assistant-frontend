import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient, ScanCommand, QueryCommand } from "@aws-sdk/lib-dynamodb"
import { IPullRequest } from "@/types"

// Initialize DynamoDB client
const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})


const docClient = DynamoDBDocumentClient.from(client)

export async function getAllPullRequests(): Promise<IPullRequest[]> {
  try {
    const command = new ScanCommand({
      TableName: process.env.DYNAMODB_TABLE_NAME,
    })

    const response = await docClient.send(command)
    const pullRequests: IPullRequest[] = (response.Items || []).map((item) => ({
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
    console.log("Fetched pull requests:", pullRequests)
    return (pullRequests) || []
  } catch (error) {
    console.error("Error fetching pull requests:", error)
    return []
  }
}

export async function getPullRequestById(prId: string): Promise<IPullRequest | null> {
  try {
    const command = new QueryCommand({
      TableName: process.env.DYNAMODB_TABLE_NAME,
      KeyConditionExpression: "pr_id = :pr_id",
      ExpressionAttributeValues: {
        ":pr_id": prId,
      },
    })

    const response = await docClient.send(command);
    // make sure to json.parse the fields that are stored as JSON strings
    response.Items && console.log("DynamoDB item:", response.Items[0]);
    if (response.Items && response.Items.length > 0) {
        const item = response.Items[0];
        return {
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
        } as IPullRequest;
    }
    return null;
    // const pullRequests: IPullRequest[] = (response.Items || []).map((item) => ({
    //       pr_id: item.pr_id,
    //       repo: item.repo,
    //       pr_number: item.pr_number,
    //       title: item.title,
    //       summary: item.summary,
    //       changes: JSON.parse(item.changes || "[]"),
    //       impact: item.impact,
    //       action_required: item.action_required,
    //       labels: JSON.parse(item.labels || "[]"),
    //       commit_messages: JSON.parse(item.commit_messages || "[]"),
    //       created_at: item.created_at,
    //       updated_at: item.updated_at,
    //       status: item.status,
    //       author: item.author,
    //       reviewers: JSON.parse(item.reviewers || "[]"),
    //     }));
    
    // return (pullRequests) || []
  } catch (error) {
    console.error("Error fetching pull request:", error)
    return null
  }
}