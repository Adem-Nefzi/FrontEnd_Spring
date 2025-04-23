"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Building, Search, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMobile } from "@/hooks/use-mobile";

// Mock data for conversations with associations
const conversations = [
  {
    id: "1",
    name: "Helping Hands Foundation",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thank you for your generous donation!",
    time: "10:30 AM",
    unread: 2,
  },
  {
    id: "2",
    name: "Food for All",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage:
      "When would be a good time to arrange pickup for the food items?",
    time: "Yesterday",
    unread: 1,
  },
  {
    id: "3",
    name: "Children's Hope Alliance",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage:
      "The books you donated will help many children in our program.",
    time: "Yesterday",
    unread: 0,
  },
];

// Mock data for messages
const messages = [
  {
    id: "1",
    sender: "Helping Hands Foundation",
    content: "Hello! Thank you for your interest in our organization.",
    time: "10:15 AM",
    isMe: false,
  },
  {
    id: "2",
    sender: "Me",
    content:
      "I saw your post about needing winter clothes. I have some jackets and gloves I'd like to donate.",
    time: "10:18 AM",
    isMe: true,
  },
  {
    id: "3",
    sender: "Helping Hands Foundation",
    content:
      "That would be wonderful! We're currently helping about 50 people who need warm clothing for the winter.",
    time: "10:22 AM",
    isMe: false,
  },
  {
    id: "4",
    sender: "Helping Hands Foundation",
    content:
      "Would you be able to drop them off at our center, or would you need us to arrange a pickup?",
    time: "10:23 AM",
    isMe: false,
  },
  {
    id: "5",
    sender: "Me",
    content:
      "I can drop them off. What's your address and when would be a good time?",
    time: "10:25 AM",
    isMe: true,
  },
  {
    id: "6",
    sender: "Helping Hands Foundation",
    content:
      "Thank you for your generous donation! Our address is 123 Main St, and we're open from 9 AM to 5 PM Monday through Friday.",
    time: "10:30 AM",
    isMe: false,
  },
];

export default function ChatSection({ theme = "light" }) {
  const [activeConversation, setActiveConversation] = useState(
    conversations[0]
  );
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useMobile();
  const [showConversations, setShowConversations] = useState(!isMobile);

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    // In a real app, you would send the message to the backend
    console.log("Sending message:", newMessage);
    setNewMessage("");
  };

  const isDark = theme === "dark";

  return (
    <div
      className={`flex h-[450px] rounded-md border ${
        isDark ? "border-slate-700" : ""
      } overflow-hidden`}
    >
      {showConversations && (
        <div
          className={`w-full md:w-2/5 ${
            isDark ? "border-r border-slate-700" : "border-r"
          }`}
        >
          <div
            className={`p-3 ${
              isDark ? "border-b border-slate-700" : "border-b"
            } flex items-center justify-between`}
          >
            <h3 className="text-sm font-medium">Conversations</h3>
            {isMobile && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 rounded-full p-0"
                onClick={() => setShowConversations(false)}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div
            className={`p-3 ${
              isDark ? "border-b border-slate-700" : "border-b"
            }`}
          >
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search associations..."
                className={`pl-9 h-9 text-sm ${
                  isDark ? "bg-slate-800 border-slate-700" : ""
                }`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <ScrollArea className="h-[calc(450px-106px)]">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => {
                  setActiveConversation(conversation);
                  if (isMobile) setShowConversations(false);
                }}
                className={`hover:bg-muted/50 cursor-pointer ${
                  activeConversation.id === conversation.id
                    ? isDark
                      ? "bg-slate-700/40"
                      : "bg-indigo-50"
                    : ""
                }`}
              >
                <div className="flex items-start gap-3 p-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={conversation.avatar || "/placeholder.svg"}
                      alt={conversation.name}
                    />
                    <AvatarFallback
                      className={isDark ? "bg-slate-600" : "bg-indigo-100"}
                    >
                      <Building
                        className={`h-4 w-4 ${
                          isDark ? "text-slate-300" : "text-indigo-600"
                        }`}
                      />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center gap-2">
                      <h4 className="font-medium text-base truncate mt-1">
                        {conversation.name}
                      </h4>
                      <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
                        {conversation.time}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate mt-1">
                      {conversation.lastMessage}
                    </p>
                  </div>
                  {conversation.unread > 0 && (
                    <Badge
                      className={`ml-auto h-5 w-5 flex items-center justify-center p-0 text-xs ${
                        isDark ? "bg-indigo-600" : "bg-indigo-500"
                      }`}
                    >
                      {conversation.unread}
                    </Badge>
                  )}
                </div>

                {/* Add a clean thin separator */}
                <div
                  className={`${
                    isDark ? "bg-slate-700" : "bg-border"
                  } h-px w-full`}
                />
              </div>
            ))}
          </ScrollArea>
        </div>
      )}

      <div className="flex flex-col w-full md:w-3/5">
        <div
          className={`flex items-center gap-3 p-3 ${
            isDark ? "border-b border-slate-700" : "border-b"
          }`}
        >
          {isMobile && !showConversations && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowConversations(true)}
              className="h-8 w-8 rounded-full"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={activeConversation?.avatar || "/placeholder.svg"}
              alt={activeConversation?.name}
            />
            <AvatarFallback
              className={isDark ? "bg-slate-600" : "bg-indigo-100"}
            >
              <Building
                className={`h-4 w-4 ${
                  isDark ? "text-slate-300" : "text-indigo-600"
                }`}
              />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h4 className="font-medium text-sm">{activeConversation?.name}</h4>
            <p className="text-xs text-muted-foreground">
              Donation: Winter Clothes
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className={`rounded-full text-xs ${
              isDark ? "border-slate-700 hover:bg-slate-700" : ""
            }`}
          >
            View Details
          </Button>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.isMe ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 shadow-sm ${
                    message.isMe
                      ? isDark
                        ? "bg-indigo-600 text-white"
                        : "bg-indigo-500 text-white"
                      : isDark
                      ? "bg-slate-700"
                      : "bg-gray-100"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <span className="text-xs opacity-70 block text-right mt-1">
                    {message.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div
          className={`p-3 ${isDark ? "border-t border-slate-700" : "border-t"}`}
        >
          <div className="flex gap-2">
            <Input
              placeholder="Type a message..."
              className={`h-10 text-sm ${
                isDark ? "bg-slate-800 border-slate-700" : ""
              }`}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
            />
            <Button
              size="icon"
              className={`h-10 w-10 rounded-full ${
                isDark ? "bg-indigo-600 hover:bg-indigo-700" : ""
              }`}
              onClick={handleSendMessage}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
