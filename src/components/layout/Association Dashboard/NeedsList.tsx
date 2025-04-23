"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for needs
const initialNeeds = [
  {
    id: "1",
    type: "Clothes",
    item: "Winter jackets (all sizes)",
    priority: "high",
  },
  { id: "2", type: "Clothes", item: "Gloves and scarves", priority: "medium" },
  {
    id: "3",
    type: "Food",
    item: "Non-perishable food items",
    priority: "high",
  },
  { id: "4", type: "Food", item: "Baby formula", priority: "high" },
  { id: "5", type: "Other", item: "Hygiene products", priority: "medium" },
];

export default function NeedsList() {
  const [needs, setNeeds] = useState(initialNeeds);
  const [newNeedType, setNewNeedType] = useState("Clothes");
  const [newNeedItem, setNewNeedItem] = useState("");
  const [newNeedPriority, setNewNeedPriority] = useState("medium");

  const handleAddNeed = () => {
    if (newNeedItem.trim() === "") return;

    const newNeed = {
      id: Date.now().toString(),
      type: newNeedType,
      item: newNeedItem,
      priority: newNeedPriority,
    };

    setNeeds([...needs, newNeed]);
    setNewNeedItem("");
  };

  const handleRemoveNeed = (id: string) => {
    setNeeds(needs.filter((need) => need.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <Select value={newNeedType} onValueChange={setNewNeedType}>
          <SelectTrigger className="w-full sm:w-[150px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Clothes">Clothes</SelectItem>
            <SelectItem value="Food">Food</SelectItem>
            <SelectItem value="Medicine">Medicine</SelectItem>
            <SelectItem value="Books">Books</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="Item description"
          value={newNeedItem}
          onChange={(e) => setNewNeedItem(e.target.value)}
          className="flex-1"
        />

        <Select value={newNeedPriority} onValueChange={setNewNeedPriority}>
          <SelectTrigger className="w-full sm:w-[150px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={handleAddNeed} size="sm" className="gap-1">
          <Plus className="h-3 w-3" /> Add
        </Button>
      </div>

      <div className="space-y-2">
        {needs.map((need) => (
          <div
            key={need.id}
            className="flex items-center justify-between p-2 border rounded-md"
          >
            <div className="flex items-center gap-2">
              <div
                className={`h-2 w-2 rounded-full ${getPriorityColor(
                  need.priority
                )}`}
              />
              <Badge variant="outline" className="text-xs">
                {need.type}
              </Badge>
              <span className="text-sm">{need.item}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => handleRemoveNeed(need.id)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
