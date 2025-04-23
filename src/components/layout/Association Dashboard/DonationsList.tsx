"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  Eye,
  MessageSquare,
  CheckCircle,
  User,
} from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data for donations
const donations = [
  {
    id: "1",
    donor: "John Doe",
    donorAvatar: "/placeholder.svg?height=40&width=40",
    type: "Clothes",
    items: "Winter jackets, gloves, scarves",
    status: "received",
    date: "2023-12-15",
  },
  {
    id: "2",
    donor: "Sarah Johnson",
    donorAvatar: "/placeholder.svg?height=40&width=40",
    type: "Food",
    items: "Non-perishable food items",
    status: "in transit",
    date: "2023-12-14",
  },
  {
    id: "3",
    donor: "Michael Chen",
    donorAvatar: "/placeholder.svg?height=40&width=40",
    type: "Books",
    items: "Children's books and educational materials",
    status: "received",
    date: "2023-12-12",
  },
  {
    id: "4",
    donor: "Emily Rodriguez",
    donorAvatar: "/placeholder.svg?height=40&width=40",
    type: "Medicine",
    items: "Over-the-counter medications",
    status: "received",
    date: "2023-12-10",
  },
  {
    id: "5",
    donor: "David Kim",
    donorAvatar: "/placeholder.svg?height=40&width=40",
    type: "Other",
    items: "Gardening tools and seeds",
    status: "scheduled",
    date: "2023-12-18",
  },
];

type DonationsListProps = {
  limit?: number;
};

export default function DonationsList({ limit }: DonationsListProps) {
  const [filter, setFilter] = useState("all");
  const isMobile = useMobile();

  const filteredDonations = donations
    .filter((donation) => {
      if (filter === "all") return true;
      return donation.status === filter;
    })
    .slice(0, limit || donations.length);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "received":
        return "bg-green-500";
      case "in transit":
        return "bg-yellow-500";
      case "scheduled":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
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
            variant={filter === "received" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("received")}
          >
            Received
          </Button>
          <Button
            variant={filter === "in transit" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("in transit")}
          >
            In Transit
          </Button>
          <Button
            variant={filter === "scheduled" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("scheduled")}
          >
            Scheduled
          </Button>
        </div>
      )}

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Donor</TableHead>
              {!isMobile && <TableHead>Type</TableHead>}
              {!isMobile && <TableHead>Items</TableHead>}
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDonations.map((donation) => (
              <TableRow key={donation.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={donation.donorAvatar || "/placeholder.svg"}
                        alt={donation.donor}
                      />
                      <AvatarFallback>
                        <User className="h-3 w-3" />
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-xs">
                      {donation.donor}
                    </span>
                  </div>
                </TableCell>
                {!isMobile && (
                  <TableCell className="text-xs">{donation.type}</TableCell>
                )}
                {!isMobile && (
                  <TableCell className="text-xs">{donation.items}</TableCell>
                )}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2 w-2 rounded-full ${getStatusColor(
                        donation.status
                      )}`}
                    />
                    <span className="capitalize text-xs">
                      {donation.status}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-xs">{donation.date}</TableCell>
                <TableCell>
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
                      <DropdownMenuItem className="text-xs">
                        <Eye className="mr-2 h-3 w-3" /> View details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-xs">
                        <MessageSquare className="mr-2 h-3 w-3" /> Message donor
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-xs">
                        <CheckCircle className="mr-2 h-3 w-3" /> Mark as
                        received
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
