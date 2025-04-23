"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Building, Filter, Heart, MessageSquare, Search } from "lucide-react";

// Mock data for associations
// const associationsData = [
//   {
//     id: "1",
//     name: "Helping Hands Foundation",
//     avatar: "/placeholder.svg?height=80&width=80",
//     description:
//       "Supporting homeless individuals with essential supplies and shelter",
//     needs: ["Clothes", "Food", "Hygiene Products"],
//     location: "New York, NY",
//     category: "Homelessness",
//   },
//   {
//     id: "2",
//     name: "Children's Hope Alliance",
//     avatar: "/placeholder.svg?height=80&width=80",
//     description:
//       "Providing educational resources and support for underprivileged children",
//     needs: ["Books", "School Supplies", "Toys"],
//     location: "Chicago, IL",
//     category: "Education",
//   },
//   {
//     id: "3",
//     name: "Food for All",
//     avatar: "/placeholder.svg?height=80&width=80",
//     description: "Fighting hunger by distributing food to families in need",
//     needs: ["Non-perishable Food", "Fresh Produce", "Volunteers"],
//     location: "Los Angeles, CA",
//     category: "Food Security",
//   },
// ];

// // Categories for filtering
// const categories = [
//   "All",
//   "Homelessness",
//   "Education",
//   "Food Security",
//   "Healthcare",
//   "Environment",
//   "Veterans",
// ];

export default function AssociationsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // const filteredAssociations = associationsData.filter((association) => {
  //   const matchesSearch =
  //     association.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     association.description.toLowerCase().includes(searchQuery.toLowerCase());
  //   const matchesCategory =
  //     selectedCategory === "All" || association.category === selectedCategory;

  //   return matchesSearch && matchesCategory;
  // });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search associations..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" /> {selectedCategory}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {/* {categories.map((category) => (
              <DropdownMenuItem
                key={category}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </DropdownMenuItem>
            ))} */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* {filteredAssociations.map((association) => (
          <Card key={association.id} className="overflow-hidden h-full">
            <div className="p-4 pb-0 flex justify-center">
              <Avatar className="h-16 w-16 border-2 border-background">
                <AvatarImage
                  src={association.avatar || "/placeholder.svg"}
                  alt={association.name}
                />
                <AvatarFallback>
                  <Building className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
            </div>
            <CardContent className="p-4 flex-grow">
              <div className="text-center mb-3">
                <h3 className="font-semibold text-base">{association.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {association.location}
                </p>
              </div>
              <p className="text-xs mb-3">{association.description}</p>
              <div className="flex flex-wrap gap-1 mb-2">
                <Badge variant="outline" className="bg-primary/10 text-xs">
                  {association.category}
                </Badge>
              </div>
              <div className="mt-3">
                <h4 className="text-xs font-medium mb-1">Current Needs:</h4>
                <div className="flex flex-wrap gap-1">
                  {association.needs.map((need) => (
                    <Badge key={need} variant="secondary" className="text-xs">
                      {need}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2 p-4 pt-0">
              <Button className="flex-1 gap-2 text-xs" size="sm">
                <Heart className="h-3 w-3" /> Donate
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <MessageSquare className="h-3 w-3" />
              </Button>
            </CardFooter>
          </Card>
        ))} */}
      </div>
    </div>
  );
}
