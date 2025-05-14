import api from "./client";

interface LoginData {
  email: string;
  password: string;
  userType?: "user" | "association";
}

interface UserRegisterData {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  userType: "DONOR" | "RECIPIENT";
  phone?: string;
  address?: string;
  bio?: string;
  profilePicture?: string;
}

interface AssociationRegisterData {
  associationName: string;
  associationEmail: string;
  password: string;
  associationPhone?: string;
  associationAddress?: string;
  description?: string;
  category?: string;
  logoUrl?: string;
}

interface AuthResponse {
  user?: User;
  association?: Association;
  message?: string;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  userType: "DONOR" | "RECIPIENT" | "ADMIN";
  phone?: string;
  address?: string;
  bio?: string;
  profilePicture?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface Association {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  description?: string;
  category?: string;
  logoUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

// User Login
export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await api.post("/auth/login", {
    email: data.email,
    password: data.password,
  });
  return response.data; // Properly propagate the error to be handled by the caller
};

// User Registration
export const registerUser = async (data: UserRegisterData): Promise<User> => {
  const response = await api.post("/auth/register/user", {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    passwordHash: data.passwordHash,
    userType: data.userType,
    phone: data.phone,
    address: data.address,
    bio: data.bio,
    profilePicture: data.profilePicture,
  });
  return response.data;
};

// Association Registration
export const registerAssociation = async (
  data: AssociationRegisterData
): Promise<Association> => {
  const response = await api.post("/auth/register/association", {
    associationName: data.associationName,
    associationEmail: data.associationEmail,
    password: data.password,
    associationPhone: data.associationPhone,
    associationAddress: data.associationAddress,
    description: data.description,
    category: data.category,
    logoUrl: data.logoUrl,
  });
  return response.data;
};

// Association Login
export const associationLogin = async (
  data: LoginData
): Promise<AuthResponse> => {
  const response = await api.post("/auth/login", {
    email: data.email,
    password: data.password,
    userType: "association",
  });
  return response.data;
};

// Logout
export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

// Admin Login (uses same login endpoint with ADMIN userType)
export const adminLogin = async (data: LoginData): Promise<AuthResponse> => {
  const response = await api.post("/auth/login", {
    email: data.email,
    password: data.password,
  });
  return response.data;
};

// Get current user session
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const response = await api.get("/users/profile");
    return response.data;
  } catch {
    return null;
  }
};

// Get current association session
export const getCurrentAssociation = async (): Promise<Association | null> => {
  try {
    const response = await api.get("/associations/profile");
    return response.data;
  } catch {
    return null;
  }
};

// Check if user is admin
export const isAdmin = (user: User | null): boolean => {
  return user?.userType === "ADMIN";
};

// Check if user is association
export const isAssociation = (
  user: User | null,
  association?: Association | null
): boolean => {
  return user?.userType === "RECIPIENT" && !!association;
};
