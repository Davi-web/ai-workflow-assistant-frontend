import { NextResponse } from "next/server"
import { getPullRequestById } from "@/lib/dynamodb"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const pullRequest = await getPullRequestById(params.id)
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
