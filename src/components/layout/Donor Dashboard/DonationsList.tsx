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
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Edit, Trash, Eye, Users } from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";

// Mock data for donations
const donations = [
  {
    id: "1",
    title: "Winter Clothes Collection",
    type: "Clothes",
    status: "active",
    date: "2023-12-15",
    applicants: 8,
  },
  {
    id: "2",
    title: "Non-perishable Food Items",
    type: "Food",
    status: "active",
    date: "2023-12-10",
    applicants: 12,
  },
  {
    id: "3",
    title: "Children's Books",
    type: "Other",
    status: "active",
    date: "2023-12-05",
    applicants: 4,
  },
  {
    id: "4",
    title: "Basic Medications",
    type: "Medicine",
    status: "completed",
    date: "2023-11-20",
    applicants: 6,
  },
  {
    id: "5",
    title: "School Supplies",
    type: "Other",
    status: "completed",
    date: "2023-11-15",
    applicants: 9,
  },
];

export default function DonationsList() {
  const [filter, setFilter] = useState("all");
  const isMobile = useMobile();

  const filteredDonations = donations.filter((donation) => {
    if (filter === "all") return true;
    return donation.status === filter;
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button
            variant={filter === "active" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("active")}
          >
            Active
          </Button>
          <Button
            variant={filter === "completed" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("completed")}
          >
            Completed
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              {!isMobile && <TableHead>Type</TableHead>}
              <TableHead>Status</TableHead>
              {!isMobile && <TableHead>Date</TableHead>}
              <TableHead>Applicants</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDonations.map((donation) => (
              <TableRow key={donation.id}>
                <TableCell className="font-medium">{donation.title}</TableCell>
                {!isMobile && <TableCell>{donation.type}</TableCell>}
                <TableCell>
                  <Badge
                    variant={
                      donation.status === "active" ? "default" : "secondary"
                    }
                  >
                    {donation.status}
                  </Badge>
                </TableCell>
                {!isMobile && <TableCell>{donation.date}</TableCell>}
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{donation.applicants}</span>
                  </div>
                </TableCell>
                <TableCell>
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
                        <Eye className="mr-2 h-4 w-4" /> View details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Users className="mr-2 h-4 w-4" /> View applicants
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" /> Edit donation
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash className="mr-2 h-4 w-4" /> Delete
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
