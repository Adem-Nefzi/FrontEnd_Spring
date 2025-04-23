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
  FileText,
  Building,
} from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data for donation history
const donations = [
  {
    id: "1",
    association: "Helping Hands Foundation",
    associationAvatar: "/placeholder.svg?height=40&width=40",
    type: "Clothes",
    items: "Winter jackets, gloves, scarves",
    status: "delivered",
    date: "2023-12-15",
  },
  {
    id: "2",
    association: "Food for All",
    associationAvatar: "/placeholder.svg?height=40&width=40",
    type: "Food",
    items: "Non-perishable food items",
    status: "in transit",
    date: "2023-12-10",
  },
  {
    id: "3",
    association: "Children's Hope Alliance",
    associationAvatar: "/placeholder.svg?height=40&width=40",
    type: "Books",
    items: "Children's books and educational materials",
    status: "delivered",
    date: "2023-12-05",
  },
  {
    id: "4",
    association: "Medical Relief Initiative",
    associationAvatar: "/placeholder.svg?height=40&width=40",
    type: "Medicine",
    items: "Over-the-counter medications",
    status: "delivered",
    date: "2023-11-20",
  },
  {
    id: "5",
    association: "Green Earth Project",
    associationAvatar: "/placeholder.svg?height=40&width=40",
    type: "Other",
    items: "Gardening tools and seeds",
    status: "processing",
    date: "2023-11-15",
  },
];

export default function DonationHistory() {
  const [filter, setFilter] = useState("all");
  const isMobile = useMobile();

  const filteredDonations = donations.filter((donation) => {
    if (filter === "all") return true;
    return donation.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-500";
      case "in transit":
        return "bg-yellow-500";
      case "processing":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
        >
          All
        </Button>
        <Button
          variant={filter === "delivered" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("delivered")}
        >
          Delivered
        </Button>
        <Button
          variant={filter === "in transit" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("in transit")}
        >
          In Transit
        </Button>
        <Button
          variant={filter === "processing" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("processing")}
        >
          Processing
        </Button>
      </div>

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Association</TableHead>
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
                        src={donation.associationAvatar || "/placeholder.svg"}
                        alt={donation.association}
                      />
                      <AvatarFallback>
                        <Building className="h-3 w-3" />
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-xs">
                      {donation.association}
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
                        <MessageSquare className="mr-2 h-3 w-3" /> Message
                        association
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-xs">
                        <FileText className="mr-2 h-3 w-3" /> View receipt
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
