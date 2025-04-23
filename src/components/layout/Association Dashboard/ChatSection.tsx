"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, User, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMobile } from "@/hooks/use-mobile";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for conversations with applicants
const applicantConversations = [
  {
    id: "1",
    name: "Maria Garcia",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thank you for approving my request!",
    time: "10:30 AM",
    unread: 2,
    type: "applicant",
  },
  {
    id: "2",
    name: "Robert Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "When can I come to pick up the food items?",
    time: "Yesterday",
    unread: 1,
    type: "applicant",
  },
  {
    id: "3",
    name: "Aisha Patel",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Do you have any notebooks available?",
    time: "Yesterday",
    unread: 0,
    type: "applicant",
  },
];

// Mock data for conversations with donors
const donorConversations = [
  {
    id: "4",
    name: "John Doe",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "I have some more clothes to donate.",
    time: "11:45 AM",
    unread: 1,
    type: "donor",
  },
  {
    id: "5",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "When would be a good time to drop off the food items?",
    time: "Yesterday",
    unread: 0,
    type: "donor",
  },
];

// Mock data for messages
const messages = [
  {
    id: "1",
    sender: "Maria Garcia",
    content: "Hello, I submitted a request for winter clothes for my family.",
    time: "10:15 AM",
    isMe: false,
  },
  {
    id: "2",
    sender: "Me",
    content: "Hi Maria, we've received your request and are reviewing it.",
    time: "10:18 AM",
    isMe: true,
  },
  {
    id: "3",
    sender: "Maria Garcia",
    content:
      "Thank you. We really need warm jackets and gloves for the children.",
    time: "10:22 AM",
    isMe: false,
  },
  {
    id: "4",
    sender: "Me",
    content:
      "I'm happy to let you know that we've approved your request. We have jackets, gloves, and scarves available.",
    time: "10:25 AM",
    isMe: true,
  },
  {
    id: "5",
    sender: "Maria Garcia",
    content: "That's wonderful news! When can I come to pick them up?",
    time: "10:28 AM",
    isMe: false,
  },
  {
    id: "6",
    sender: "Me",
    content:
      "You can come to our center at 123 Main St anytime between 9 AM and 5 PM Monday through Friday.",
    time: "10:30 AM",
    isMe: true,
  },
];

export default function ChatSection() {
  const [activeTab, setActiveTab] = useState("applicants");
  const [activeConversation, setActiveConversation] = useState(
    applicantConversations[0]
  );
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useMobile();
  const [showConversations, setShowConversations] = useState(!isMobile);

  const conversations =
    activeTab === "applicants" ? applicantConversations : donorConversations;

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    // In a real app, you would send the message to the backend
    console.log("Sending message:", newMessage);
    setNewMessage("");
  };

  return (
    <div className="flex h-[450px] rounded-md border">
      {showConversations && (
        <div className="w-full md:w-1/3 border-r">
          <div className="p-2 border-b">
            <Tabs
              defaultValue="applicants"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="applicants" className="text-xs">
                  Applicants
                </TabsTrigger>
                <TabsTrigger value="donors" className="text-xs">
                  Donors
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="relative mt-2">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-8 h-8 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <ScrollArea className="h-[calc(450px-85px)]">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`flex items-start gap-2 p-2 hover:bg-muted/50 cursor-pointer ${
                  activeConversation.id === conversation.id ? "bg-muted" : ""
                }`}
                onClick={() => {
                  setActiveConversation(conversation);
                  if (isMobile) setShowConversations(false);
                }}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={conversation.avatar || "/placeholder.svg"}
                    alt={conversation.name}
                  />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-xs">{conversation.name}</h4>
                    <span className="text-[10px] text-muted-foreground">
                      {conversation.time}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {conversation.lastMessage}
                  </p>
                </div>
                {conversation.unread > 0 && (
                  <Badge className="ml-auto h-4 w-4 flex items-center justify-center p-0 text-[10px]">
                    {conversation.unread}
                  </Badge>
                )}
              </div>
            ))}
          </ScrollArea>
        </div>
      )}

      <div className="flex flex-col w-full md:w-2/3">
        <div className="flex items-center justify-between p-2 border-b">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowConversations(true)}
              className="md:hidden h-8 w-8"
            >
              <User className="h-4 w-4" />
            </Button>
          )}
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage
                src={activeConversation?.avatar || "/placeholder.svg"}
                alt={activeConversation?.name}
              />
              <AvatarFallback>
                <User className="h-3 w-3" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-medium text-xs">
                {activeConversation?.name}
              </h4>
              <p className="text-[10px] text-muted-foreground">
                {activeConversation?.type === "applicant"
                  ? "Need: Winter Clothes"
                  : "Donor"}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {/* Additional actions could go here */}
          </div>
        </div>

        <ScrollArea className="flex-1 p-3">
          <div className="space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.isMe ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-2 ${
                    message.isMe
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-xs">{message.content}</p>
                  <span className="text-[10px] opacity-70 block text-right mt-1">
                    {message.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-2 border-t">
          <div className="flex gap-2">
            <Input
              placeholder="Type a message..."
              className="h-8 text-sm"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
            />
            <Button size="icon" className="h-8 w-8" onClick={handleSendMessage}>
              <Send className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
