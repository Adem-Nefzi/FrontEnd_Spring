import api from "./client";
import { getCurrentUser } from "./auth";

// Type for user data
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  userType: "DONOR" | "RECIPIENT" | "ADMIN";
  createdAt: string;
  updatedAt: string;
  profilePicture?: string;
  bio?: string;
}

// Type for association data
export interface Association {
  id: number;
  name: string;
  email: string;
  description?: string;
  phone?: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
  logoUrl?: string;
  category?: string;
  foundationDate?: string;
}

// Helper function to check if the current user is an admin
const checkAdminAccess = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.userType !== "ADMIN") {
    throw new Error("Unauthorized: Admin access required");
  }
  return currentUser;
};

// Admin User Management
export const adminGetAllUsers = async () => {
  await checkAdminAccess();
  const response = await api.get("/users/admin/all");
  return response.data;
};

export const adminGetUser = async (userId: number) => {
  await checkAdminAccess();
  const response = await api.get(`/users/admin/${userId}`);
  return response.data;
};

// Type for user creation payload
interface UserCreatePayload {
  firstName: string;
  lastName: string;
  email: string;
  password?: string; // Make password optional so it can be deleted
  passwordHash: string;
  phone?: string;
  address?: string;
  userType: "DONOR" | "RECIPIENT" | "ADMIN";
}

export const adminCreateUser = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  userType: "DONOR" | "RECIPIENT" | "ADMIN";
}) => {
  await checkAdminAccess();

  // The backend expects 'passwordHash' not 'password'
  const payload: UserCreatePayload = {
    ...userData,
    passwordHash: userData.password,
  };

  // Remove the plain password from payload
  delete payload.password;

  const response = await api.post("/users/profile", payload, {
    withCredentials: true, // 🧠 Required for session-based auth
  });

  return response.data;
};

export const adminUpdateUser = async (
  userId: number,
  userData: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address?: string;
    userType?: "DONOR" | "RECIPIENT" | "ADMIN";
    passwordHash?: string;
  }
) => {
  await checkAdminAccess();
  const response = await api.put(`/users/admin/${userId}`, userData);
  return response.data;
};

export const adminDeleteUser = async (userId: number) => {
  await checkAdminAccess();
  const response = await api.delete(`/users/admin/${userId}`);
  return response.data;
};

// Admin Association Management
export const adminCreateAssociation = async (associationData: {
  name: string;
  email: string;
  password: string;
  description?: string;
  phone?: string;
  address?: string;
  category?: string;
  logoUrl?: string;
  foundationDate?: string;
}) => {
  await checkAdminAccess();

  const response = await api.post("/associations/admin", associationData, {
    withCredentials: true, // ✅ Required for session-based auth
  });

  return response.data;
};

export const adminDeleteAssociation = async (associationId: number) => {
  await checkAdminAccess();
  const response = await api.delete(`/associations/admin/${associationId}`);
  return response.data;
};

// Public association endpoints (no admin check needed)
export const getAllAssociations = async () => {
  const response = await api.get("/associations");
  return response.data;
};

export const getAssociationById = async (id: number) => {
  const response = await api.get(`/associations/${id}`);
  return response.data;
};

// Admin association management
export const adminUpdateAssociation = async (
  id: number,
  associationData: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    description?: string;
    category?: string;
    logoUrl?: string;
    foundationDate?: string;
    password?: string;
  }
) => {
  await checkAdminAccess();

  const response = await api.put(`/associations/admin/${id}`, associationData, {
    withCredentials: true, // ✅ For session-based auth
  });

  return response.data;
};

export const adminGetAllAssociations = async (params?: {
  name?: string;
  category?: string;
}) => {
  await checkAdminAccess();
  const response = await api.get("/associations/admin/all", { params });
  return response.data;
};

export default {
  // User management
  adminGetAllUsers,
  adminGetUser,
  adminCreateUser,
  adminUpdateUser,
  adminDeleteUser,

  // Association management
  adminGetAllAssociations,
  adminCreateAssociation,
  adminUpdateAssociation,
  adminDeleteAssociation,
  getAllAssociations,
  getAssociationById,
};
