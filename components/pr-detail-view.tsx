"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  ExternalLink,
  GitPullRequest,
  Calendar,
  User,
  Tag,
  Clock,
  MessageSquare,
  GitCommit,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { IPullRequest } from "@/types"
import { fetchPRById } from "@/lib/fetchPRs"

interface PRDetailViewProps {
    pr_id: string
}

export function PRDetailView({ pr_id }: PRDetailViewProps) {
  const [pullRequest, setPullRequest] = useState<IPullRequest | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchPullRequest()
  }, [pr_id])

  const fetchPullRequest = async () => {
    try {
      const response = await fetchPRById(pr_id)
      
      setPullRequest(response)
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to fetch pull request")
    } finally {
      setLoading(false)
    }
  }

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
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getGitHubUrl = (repo: string, prNumber: number) => {
    return `https://github.com/${repo}/pull/${prNumber}`
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="h-12 bg-muted rounded w-3/4"></div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </div>
    )
  }

  if (error || !pullRequest) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="p-8 text-center">
            <GitPullRequest className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Pull Request Not Found</h3>
            <p className="text-muted-foreground mb-4">{error || "The requested pull request could not be found."}</p>
            <Button onClick={() => router.push("/")} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.push("/")} className="p-2">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Tag className="h-4 w-4" />
          <span>{pullRequest.repo}</span>
          <span>#{pullRequest.pr_number}</span>
        </div>
      </div>

      {/* Title and Status */}
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <GitPullRequest className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-balance leading-tight mb-2">{pullRequest.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <Badge className={getStatusColor(pullRequest.status)}>{pullRequest.status}</Badge>
              {/* {pullRequest.labels && pullRequest.labels.length > 0 &&  pullRequest.labels.map((label) => (
                <Badge key={label} className="outline">
                  {label}
                </Badge>
              ))
              } */}
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span>{pullRequest.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>Created {formatDate(pullRequest.created_at)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>Updated {formatDate(pullRequest.updated_at)}</span>
              </div>
            </div>
          </div>
          <Button asChild>
            <a href={getGitHubUrl(pullRequest.repo, pullRequest.pr_number)} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              View on GitHub
            </a>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-pretty leading-relaxed">{pullRequest.summary}</p>
            </CardContent>
          </Card>

          {/* Changes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitCommit className="h-5 w-5" />
                Changes ({pullRequest.changes ? pullRequest.changes.length : 0})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {
                pullRequest.changes && pullRequest.changes.length > 0 ? (
                  <div className="space-y-3">
                    {pullRequest.changes.map((change, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                        <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <p className="text-sm text-pretty">{change}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No changes information available.</p>
                )
              }
            </CardContent>
          </Card>

          {/* Impact */}
          <Card>
            <CardHeader>
              <CardTitle>Impact Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-pretty leading-relaxed">{pullRequest.impact}</p>
            </CardContent>
          </Card>

          {/* Commit Messages */}
          {pullRequest.commit_messages && pullRequest.commit_messages.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitCommit className="h-5 w-5" />
                  Commits ({pullRequest.commit_messages.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pullRequest.commit_messages.map((message, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <p className="text-sm font-mono text-pretty">{message}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Action Required */}
          {pullRequest.action_required && (
            <Card>
              <CardHeader>
                <CardTitle className="text-destructive">Action Required</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-pretty">{pullRequest.action_required}</p>
              </CardContent>
            </Card>
          )}

          {/* Reviewers */}
          {pullRequest.reviewers && pullRequest.reviewers.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Reviewers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pullRequest.reviewers.map((reviewer, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {reviewer
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{reviewer}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Details */}
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Repository</p>
                <p className="text-sm font-mono">{pullRequest.repo}</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm font-medium text-muted-foreground">PR Number</p>
                <p className="text-sm">#{pullRequest.pr_number}</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Author</p>
                <div className="flex items-center gap-2 mt-1">
                  
                    <Avatar className="h-6 w-6" >
                        <AvatarFallback className="text-xs">
                        {/* {pullRequest.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()} */}
                        </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{pullRequest.author}</span>
                </div>
              </div>
              <Separator />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <Badge className={`${getStatusColor(pullRequest.status)} mt-1`}>{pullRequest.status}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
