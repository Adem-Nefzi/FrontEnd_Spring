"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Building,
  Camera,
  MapPin,
  Phone,
  Mail,
  Globe,
  Save,
} from "lucide-react";

// Mock data for association profile
const initialProfile = {
  name: "Helping Hands Foundation",
  avatar: "/placeholder.svg?height=100&width=100",
  description:
    "Supporting homeless individuals with essential supplies and shelter",
  address: "123 Main St, New York, NY 10001",
  phone: "(555) 123-4567",
  email: "contact@helpinghands.org",
  website: "www.helpinghands.org",
};

export default function AssociationProfile() {
  const [profile, setProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = () => {
    // In a real app, you would save the profile to the backend
    console.log("Saving profile:", profile);
    setIsEditing(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
        <div className="relative">
          <Avatar className="h-20 w-20 border-2 border-background">
            <AvatarImage
              src={profile.avatar || "/placeholder.svg"}
              alt={profile.name}
            />
            <AvatarFallback>
              <Building className="h-10 w-10" />
            </AvatarFallback>
          </Avatar>
          {isEditing && (
            <Button
              variant="secondary"
              size="icon"
              className="absolute bottom-0 right-0 h-6 w-6 rounded-full"
            >
              <Camera className="h-3 w-3" />
            </Button>
          )}
        </div>

        <div className="flex-1 space-y-3 text-center sm:text-left">
          {isEditing ? (
            <>
              <Input
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="text-lg font-semibold"
              />
              <Textarea
                name="description"
                value={profile.description}
                onChange={handleChange}
                className="h-20 text-sm"
                placeholder="Description"
              />
            </>
          ) : (
            <>
              <h2 className="text-lg font-semibold">{profile.name}</h2>
              <p className="text-sm text-muted-foreground">
                {profile.description}
              </p>
            </>
          )}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          {isEditing ? (
            <Input
              name="address"
              value={profile.address}
              onChange={handleChange}
              className="text-sm"
              placeholder="Address"
            />
          ) : (
            <span className="text-sm">{profile.address}</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-muted-foreground" />
          {isEditing ? (
            <Input
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="text-sm"
              placeholder="Phone"
            />
          ) : (
            <span className="text-sm">{profile.phone}</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-muted-foreground" />
          {isEditing ? (
            <Input
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="text-sm"
              placeholder="Email"
            />
          ) : (
            <span className="text-sm">{profile.email}</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-muted-foreground" />
          {isEditing ? (
            <Input
              name="website"
              value={profile.website}
              onChange={handleChange}
              className="text-sm"
              placeholder="Website"
            />
          ) : (
            <span className="text-sm">{profile.website}</span>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        {isEditing ? (
          <Button onClick={handleSave} size="sm" className="gap-1">
            <Save className="h-3 w-3" /> Save Changes
          </Button>
        ) : (
          <Button onClick={() => setIsEditing(true)} size="sm">
            Edit Profile
          </Button>
        )}
      </div>
    </div>
  );
}
