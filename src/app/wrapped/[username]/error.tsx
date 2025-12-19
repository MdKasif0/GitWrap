"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Frown, SearchX } from "lucide-react"
import { useEffect } from "react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  const isNotFound = error.message.includes("Not Found");

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
             {isNotFound ? (
              <SearchX className="h-10 w-10 text-destructive" />
            ) : (
              <Frown className="h-10 w-10 text-destructive" />
            )}
          </div>
          <CardTitle className="mt-4">
            {isNotFound ? "User Not Found" : "Oops! Something went wrong."}
            </CardTitle>
          <CardDescription>
            {isNotFound
              ? "We couldn't find a GitHub user with that name. Please check the username and try again."
              : error.message || "We couldn't generate your GitWrap report."}
            </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
           {!isNotFound && <Button onClick={() => reset()}>Try Again</Button>}
          <Button variant="outline" asChild>
            <Link href="/">Go to Homepage</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
