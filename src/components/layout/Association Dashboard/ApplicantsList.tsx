"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, MessageSquare, Check, X, User } from "lucide-react";

// Mock data for applicants
const applicantsData = [
  {
    id: "1",
    name: "Maria Garcia",
    avatar: "/placeholder.svg?height=40&width=40",
    need: "Winter Clothes",
    status: "pending",
    date: "2023-12-15",
    message:
      "I'm a single mother with 3 children and we need warm clothes for the winter.",
  },
  {
    id: "2",
    name: "Robert Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    need: "Food Assistance",
    status: "approved",
    date: "2023-12-14",
    message: "Recently lost my job and need help with groceries for my family.",
  },
  {
    id: "3",
    name: "Aisha Patel",
    avatar: "/placeholder.svg?height=40&width=40",
    need: "School Supplies",
    status: "pending",
    date: "2023-12-13",
    message: "Need school supplies for my children for the upcoming semester.",
  },
  {
    id: "4",
    name: "James Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    need: "Medical Supplies",
    status: "rejected",
    date: "2023-12-12",
    message: "I have a chronic condition and need help with medical supplies.",
  },
  {
    id: "5",
    name: "Sofia Martinez",
    avatar: "/placeholder.svg?height=40&width=40",
    need: "Winter Clothes",
    status: "approved",
    date: "2023-12-11",
    message:
      "My family recently moved here and we're not prepared for the cold weather.",
  },
];

type ApplicantsListProps = {
  limit?: number;
};

export default function ApplicantsList({ limit }: ApplicantsListProps) {
  const [filter, setFilter] = useState("all");
  const [applicants, setApplicants] = useState(applicantsData);

  const filteredApplicants = applicants
    .filter((applicant) => {
      if (filter === "all") return true;
      return applicant.status === filter;
    })
    .slice(0, limit || applicants.length);

  const handleStatusChange = (id: string, newStatus: string) => {
    setApplicants(
      applicants.map((app) =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500";
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-yellow-500";
    }
  };

  return (
    <div className="space-y-4">
      {!limit && (
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button
            variant={filter === "pending" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("pending")}
          >
            Pending
          </Button>
          <Button
            variant={filter === "approved" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("approved")}
          >
            Approved
          </Button>
          <Button
            variant={filter === "rejected" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("rejected")}
          >
            Rejected
          </Button>
        </div>
      )}

      <div className="space-y-3">
        {filteredApplicants.map((applicant) => (
          <Card key={applicant.id}>
            <CardContent className="p-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2">
                  <Avatar className="h-8 w-8 border-2 border-background">
                    <AvatarImage
                      src={applicant.avatar || "/placeholder.svg"}
                      alt={applicant.name}
                    />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-sm">
                        {applicant.name}
                      </h4>
                      <div
                        className={`h-2 w-2 rounded-full ${getStatusColor(
                          applicant.status
                        )}`}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Need: {applicant.need}
                    </p>
                    <p className="text-xs mt-1">{applicant.message}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-[10px]">
                        {applicant.date}
                      </Badge>
                      <Badge
                        variant={
                          applicant.status === "approved"
                            ? "default"
                            : applicant.status === "rejected"
                            ? "destructive"
                            : "secondary"
                        }
                        className="text-[10px]"
                      >
                        {applicant.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <MoreHorizontal className="h-3 w-3" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel className="text-xs">
                        Actions
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-xs" onClick={() => {}}>
                        <MessageSquare className="mr-2 h-3 w-3" /> Message
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-xs"
                        onClick={() =>
                          handleStatusChange(applicant.id, "approved")
                        }
                      >
                        <Check className="mr-2 h-3 w-3" /> Approve
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-xs"
                        onClick={() =>
                          handleStatusChange(applicant.id, "rejected")
                        }
                      >
                        <X className="mr-2 h-3 w-3" /> Reject
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
