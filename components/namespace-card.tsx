"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

function capitalizeAndReplaceHyphens(input: string) {
  return (
    input
      // Replace hyphens with spaces
      .replace(/-/g, " ")
      // Capitalize the first letter of each word
      .replace(/\b[a-z]/g, function (match) {
        return match.toUpperCase();
      })
  );
}

export default function NamespaceCard({ namespace }: { namespace: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted && (
      <Card>
        <CardHeader>
          <CardTitle>{capitalizeAndReplaceHyphens(namespace)}</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <p>
            {" "}
            Learn more about{" "}
            <span className="underline">
              {capitalizeAndReplaceHyphens(namespace)}
            </span>{" "}
            with the power of AI{" "}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between p-4">
          <Button>Explore</Button>
        </CardFooter>
      </Card>
    )
  );
}
