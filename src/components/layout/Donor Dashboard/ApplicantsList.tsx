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
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    donation: "Winter Clothes Collection",
    status: "pending",
    date: "2023-12-14",
    message:
      "I'm working with a homeless shelter and these clothes would help many people this winter.",
  },
  {
    id: "2",
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    donation: "Non-perishable Food Items",
    status: "pending",
    date: "2023-12-13",
    message:
      "Our community food bank is running low on supplies and your donation would help many families.",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    donation: "Children's Books",
    status: "approved",
    date: "2023-12-12",
    message:
      "I run an after-school program for underprivileged children and these books would be wonderful.",
  },
  {
    id: "4",
    name: "David Kim",
    avatar: "/placeholder.svg?height=40&width=40",
    donation: "Winter Clothes Collection",
    status: "pending",
    date: "2023-12-11",
    message:
      "I work with refugee families who have recently arrived and need warm clothing.",
  },
  {
    id: "5",
    name: "Lisa Patel",
    avatar: "/placeholder.svg?height=40&width=40",
    donation: "Non-perishable Food Items",
    status: "rejected",
    date: "2023-12-10",
    message:
      "I'm organizing a food drive for elderly residents in my neighborhood who can't easily shop.",
  },
  {
    id: "6",
    name: "James Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    donation: "Basic Medications",
    status: "approved",
    date: "2023-12-09",
    message:
      "Our rural health clinic serves patients who often can't afford basic medications.",
  },
  {
    id: "7",
    name: "Olivia Martinez",
    avatar: "/placeholder.svg?height=40&width=40",
    donation: "School Supplies",
    status: "pending",
    date: "2023-12-08",
    message:
      "I'm a teacher at a low-income school and many of my students can't afford basic supplies.",
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
        <div className="flex gap-2">
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
          <Card key={applicant.id} className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10 border-2 border-background">
                    <AvatarImage
                      src={applicant.avatar || "/placeholder.svg"}
                      alt={applicant.name}
                    />
                    <AvatarFallback>
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{applicant.name}</h4>
                      <div
                        className={`h-2 w-2 rounded-full ${getStatusColor(
                          applicant.status
                        )}`}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      For: {applicant.donation}
                    </p>
                    <p className="text-sm mt-1">{applicant.message}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
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
                      >
                        {applicant.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <MessageSquare className="mr-2 h-4 w-4" /> Message
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleStatusChange(applicant.id, "approved")
                        }
                      >
                        <Check className="mr-2 h-4 w-4" /> Approve
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleStatusChange(applicant.id, "rejected")
                        }
                      >
                        <X className="mr-2 h-4 w-4" /> Reject
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
