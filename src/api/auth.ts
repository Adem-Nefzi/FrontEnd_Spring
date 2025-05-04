// src/api/auth.ts
import api from "./client";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  userType: "DONOR" | "RECIPIENT" | "ADMIN";
  profilePicture?: string;
  // Add other fields from your Spring User model
}

export interface Association {
  id: number;
  name: string;
  description?: string;
  // Add other fields from your Spring Association model
}

export interface LoginResponse {
  user: User;
  association?: Association; // Only present for association logins
}

export interface RegisterUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: "DONOR" | "RECIPIENT";
}

export interface RegisterAssociationPayload extends RegisterUserPayload {
  associationName: string;
  associationEmail: string;
  associationPhone?: string;
  associationAddress?: string;
  description?: string;
  category?: string;
  logoUrl?: string;
}

// Auth functions
export const AuthService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },

  async registerUser(userData: RegisterUserPayload): Promise<User> {
    const response = await api.post("/auth/register/user", {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      passwordHash: userData.password, // Spring will hash this
      userType: userData.userType,
    });
    return response.data;
  },

  async registerAssociation(
    associationData: RegisterAssociationPayload
  ): Promise<{ user: User; association: Association }> {
    const response = await api.post("/auth/register/association", {
      firstName: associationData.firstName,
      lastName: associationData.lastName,
      email: associationData.email,
      password: associationData.password,
      associationName: associationData.associationName,
      associationEmail: associationData.associationEmail,
      associationPhone: associationData.associationPhone,
      associationAddress: associationData.associationAddress,
      description: associationData.description,
      category: associationData.category,
      logoUrl: associationData.logoUrl,
    });
    return response.data;
  },

  async logout(): Promise<void> {
    await api.post("/auth/logout");
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get("/users/profile");
    return response.data;
  },

  // Helper to check if user is association
  isAssociation(user: User, association?: Association): boolean {
    return user.userType === "RECIPIENT" && !!association;
  },
};
