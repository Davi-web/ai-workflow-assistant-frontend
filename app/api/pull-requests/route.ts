import { NextResponse } from "next/server"
import { getAllPullRequests } from "@/lib/dynamodb"

export async function GET() {
  try {
    const pullRequests = await getAllPullRequests()
    return NextResponse.json(pullRequests)
  } catch (error) {
    console.error("Error in API route:", error)
    return NextResponse.json({ error: "Failed to fetch pull requests" }, { status: 500 })
  }
}



