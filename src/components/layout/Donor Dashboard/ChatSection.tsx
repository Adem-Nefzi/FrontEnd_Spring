"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, User, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMobile } from "@/hooks/use-mobile";

// Mock data for conversations with associations
const associationConversations = [
  {
    id: "1",
    name: "Hope Foundation",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thank you for your recent donation!",
    time: "10:30 AM",
    unread: 2,
    category: "Food",
  },
  {
    id: "2",
    name: "Community Shelter",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "When would you like to schedule the pickup?",
    time: "Yesterday",
    unread: 1,
    category: "Clothing",
  },
  {
    id: "3",
    name: "Education for All",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "We received the school supplies you donated",
    time: "Yesterday",
    unread: 0,
    category: "Education",
  },
];

// Mock data for messages
const messages = [
  {
    id: "1",
    sender: "Hope Foundation",
    content: "Hello John, thank you for your recent food donation!",
    time: "10:15 AM",
    isMe: false,
  },
  {
    id: "2",
    sender: "Me",
    content: "You're welcome! I'm happy to help.",
    time: "10:18 AM",
    isMe: true,
  },
  {
    id: "3",
    sender: "Hope Foundation",
    content: "Your donation helped feed 20 families this week.",
    time: "10:22 AM",
    isMe: false,
  },
  {
    id: "4",
    sender: "Me",
    content: "That's wonderful to hear. I'll have more to donate next week.",
    time: "10:25 AM",
    isMe: true,
  },
  {
    id: "5",
    sender: "Hope Foundation",
    content:
      "We'd be grateful for any additional help. What items will you be donating?",
    time: "10:28 AM",
    isMe: false,
  },
  {
    id: "6",
    sender: "Me",
    content:
      "I'll be bringing canned goods and pasta. Should I drop them off on Monday?",
    time: "10:30 AM",
    isMe: true,
  },
];

export default function DonorChatSection() {
  const [activeConversation, setActiveConversation] = useState(
    associationConversations[0]
  );
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useMobile();
  const [showConversations, setShowConversations] = useState(!isMobile);

  const filteredConversations = associationConversations.filter((conv) =>
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
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search associations..."
                className="pl-8 h-8 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <ScrollArea className="h-[calc(450px-57px)]">
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
                  <span className="text-[10px] text-muted-foreground">
                    {conversation.category}
                  </span>
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
                {activeConversation?.category}
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
