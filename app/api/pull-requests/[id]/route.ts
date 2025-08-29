import { NextResponse, NextRequest } from "next/server"
import { getPullRequestById } from "@/lib/dynamodb"
import { IPullRequest } from "@/types"

export async function GET(
  request: NextRequest,
  {params}: { params: Promise<{ id: string }> }
): Promise<NextResponse<{ error: string }> | NextResponse<IPullRequest>> {
    const id = (await params).id;
  try {
    const pullRequest = await getPullRequestById(id)
    console.log("Fetched pull request:", pullRequest)

    if (!pullRequest) {
      return NextResponse.json({ error: "Pull request not found" }, { status: 404 })
    }
    return NextResponse.json(pullRequest)
  } catch (error) {
    console.error("Error in API route:", error)
    return NextResponse.json({ error: "Failed to fetch pull request" }, { status: 500 })
  }
}
