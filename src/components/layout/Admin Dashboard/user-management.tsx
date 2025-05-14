"use client";

import { useState, useEffect } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MoreHorizontal,
  Search,
  Edit,
  Trash,
  Eye,
  UserPlus,
  Phone,
  MapPin,
  RefreshCw,
  Users,
  AlertCircle,
  Loader2,
  ShieldAlert,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMobile } from "@/hooks/use-mobile";
import {
  adminGetAllUsers,
  adminCreateUser,
  adminUpdateUser,
  adminDeleteUser,
  User as ApiUser,
} from "@/api/admin";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
export default function UserManagement() {
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<ApiUser | null>(null);
  const [currentUser, setCurrentUser] = useState<ApiUser | null>(null);
  const [isAdmin, setIsAdminState] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userType: "DONOR" as "DONOR" | "RECIPIENT" | "ADMIN",
    phone: "",
    address: "",
  });
  const isMobile = useMobile();
  const navigate = useNavigate();

  // Check if user is admin
  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        const currentUser = await import("@/api/auth").then((module) =>
          module.getCurrentUser()
        );
        if (!currentUser || currentUser.userType !== "ADMIN") {
          toast({
            title: "Access Denied",
            description: "You don't have permission to access this page.",
            variant: "destructive",
          });
          return;
        }
        setIsAdminState(true);
      } catch (err) {
        console.error("Error checking admin access:", err);
        toast({
          title: "Authentication Error",
          description: "Please log in again to continue.",
          variant: "destructive",
        });
      }
    };

    checkAdminAccess();
  }, [navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!isAdmin) return;

      try {
        setLoading(true);
        const data = await adminGetAllUsers();
        setUsers(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch users. Please try again later.");
        console.error("Error fetching users:", err);
        toast({
          title: "Error",
          description:
            "Failed to fetch users. You may not have admin permissions.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

  const activeUsers = users.filter(
    (user) => !("deletedAt" in user && user.deletedAt)
  );
  const filteredUsers = activeUsers.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const matchesSearch =
      fullName.includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole =
      roleFilter === "all" || user.userType.toLowerCase() === roleFilter;
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && !("deletedAt" in user && user.deletedAt)) ||
      (statusFilter === "inactive" && "deletedAt" in user && user.deletedAt);

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleCreateUser = async () => {
    if (!isAdmin) return;

    try {
      const createdUser = await adminCreateUser({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        password: newUser.password,
        userType: newUser.userType,
        phone: newUser.phone,
        address: newUser.address,
      });

      setUsers([...users, createdUser]);
      setNewUser({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        userType: "DONOR",
        phone: "",
        address: "",
      });

      toast({
        title: "User created successfully",
        description: `New User has been added.`,
        className:
          "border-emerald-200 dark:border-emerald-600/50 bg-emerald-50 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-100 rounded-2xl px-5 py-4 shadow-lg font-medium",
      });

      setIsCreateDialogOpen(false);
    } catch (err) {
      console.error("Error creating user:", err);
      toast({
        title: "Failed to create user",
        description: "Please try again or check the details.",
        variant: "destructive",
      });
      setError("Failed to create user. Please try again.");
    }
  };

  const handleEditUser = async () => {
    if (!currentUser || !isAdmin) return;

    try {
      const updatedUser = await adminUpdateUser(currentUser.id, {
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        userType: currentUser.userType,
        phone: currentUser.phone,
        address: currentUser.address,
      });

      setUsers(
        users.map((user) => (user.id === currentUser.id ? updatedUser : user))
      );

      toast({
        title: "User updated successfully",
        description: `Selected User details have been updated.`,
        className:
          "border-emerald-200 dark:border-emerald-600/50 bg-emerald-50 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-100 rounded-2xl px-5 py-4 shadow-lg font-medium",
      });

      setIsEditDialogOpen(false);
    } catch (err) {
      console.error("Error updating user:", err);
      toast({
        title: "Failed to update user",
        description: "Please try again or check the details.",
        variant: "destructive",
      });
      setError("Failed to update user. Please try again.");
    }
  };

  const handleDeleteUser = async () => {
    if (!currentUser || !isAdmin) return;

    try {
      await adminDeleteUser(currentUser.id);

      // Remove the user from the list
      setUsers(users.filter((user) => user.id !== currentUser.id));

      toast({
        title: "User deleted successfully",
        description: `Selected User has been removed.`,
        className:
          "border-emerald-200 dark:border-emerald-600/50 bg-emerald-50 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-100 rounded-2xl px-5 py-4 shadow-lg font-medium",
      });

      setIsDeleteDialogOpen(false);
    } catch (err) {
      console.error("Error deleting user:", err);
      toast({
        title: "Failed to delete user",
        description: "Please try again or check permissions.",
        variant: "destructive",
      });
      setError("Failed to delete user. Please try again.");
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return <Badge className="bg-red-500">Admin</Badge>;
      case "donor":
        return <Badge className="bg-blue-500">Donor</Badge>;
      case "recipient":
        return <Badge className="bg-green-500">Recipient</Badge>;
      default:
        return <Badge>{role}</Badge>;
    }
  };

  const getStatusBadge = (user: ApiUser) => {
    if ("deletedAt" in user && user.deletedAt) {
      return <Badge variant="secondary">Inactive</Badge>;
    }
    return <Badge variant="default">Active</Badge>;
  };

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <ShieldAlert className="h-16 w-16 text-red-500 mb-4" />
        <h3 className="text-xl font-medium mb-2">Access Denied</h3>
        <p className="text-muted-foreground mb-4">
          You don't have permission to access this page.
        </p>
      </div>
    );
  }

  if (loading && !users.length) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error && !users.length) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <AlertCircle className="h-10 w-10 text-red-500 mb-4" />
        <h3 className="text-lg font-medium mb-1">Error loading users</h3>
        <p className="text-sm text-muted-foreground mb-4">{error}</p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-bold">User Management</h2>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all">
              <UserPlus className="h-4 w-4" /> Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[90vw] sm:max-w-md rounded-xl">
            <div className="relative">
              <div className="absolute -top-4 -right-4 h-16 w-16 bg-purple-200/20 rounded-full blur-md" />
              <div className="absolute -bottom-4 -left-4 h-12 w-12 bg-blue-200/20 rounded-full blur-md" />

              <DialogHeader>
                <DialogTitle className="text-lg font-bold flex items-center gap-2">
                  <UserPlus className="h-5 w-5 text-purple-600" />
                  Create New User
                </DialogTitle>
                <DialogDescription className="text-sm">
                  Add a new member to your organization
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-3 py-3">
                <div className="grid gap-1.5">
                  <Label htmlFor="firstName" className="text-sm">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    value={newUser.firstName}
                    onChange={(e) =>
                      setNewUser({ ...newUser, firstName: e.target.value })
                    }
                    className="focus-visible:ring-2 focus-visible:ring-purple-500/50"
                  />
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="lastName" className="text-sm">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    value={newUser.lastName}
                    onChange={(e) =>
                      setNewUser({ ...newUser, lastName: e.target.value })
                    }
                    className="focus-visible:ring-2 focus-visible:ring-blue-500/50"
                  />
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="email" className="text-sm">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                    className="focus-visible:ring-2 focus-visible:ring-purple-500/50"
                  />
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="password" className="text-sm">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={newUser.password}
                    onChange={(e) =>
                      setNewUser({ ...newUser, password: e.target.value })
                    }
                    className="focus-visible:ring-2 focus-visible:ring-blue-500/50"
                  />
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="role" className="text-sm">
                    Role
                  </Label>
                  <Select
                    value={newUser.userType}
                    onValueChange={(value) =>
                      setNewUser({
                        ...newUser,
                        userType: value as "DONOR" | "RECIPIENT" | "ADMIN",
                      })
                    }
                  >
                    <SelectTrigger
                      id="role"
                      className="focus-visible:ring-2 focus-visible:ring-purple-500/50"
                    >
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="DONOR">Donor</SelectItem>
                      <SelectItem value="RECIPIENT">Recipient</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DialogFooter className="pt-2">
                <Button
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateUser}
                  disabled={
                    !newUser.firstName ||
                    !newUser.lastName ||
                    !newUser.email ||
                    !newUser.password
                  }
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all disabled:opacity-70"
                >
                  Create User
                </Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-3 mb-4">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="donor">Donor</SelectItem>
              <SelectItem value="recipient">Recipient</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border shadow-sm bg-white dark:bg-slate-900">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead>User</TableHead>
              {!isMobile && <TableHead>Email</TableHead>}
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              {!isMobile && <TableHead>Created</TableHead>}
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={isMobile ? 4 : 6}
                  className="h-24 text-center"
                >
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <AlertCircle className="h-8 w-8 mb-2 opacity-40" />
                    <p>No users found</p>
                    <p className="text-sm">Try adjusting your filters</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8 border">
                        <AvatarImage
                          src={user.profilePicture || "/placeholder.svg"}
                          alt={`${user.firstName} ${user.lastName}`}
                        />
                        <AvatarFallback className="bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700">
                          {user.firstName?.charAt(0) || ""}
                          {user.lastName?.charAt(0) || ""}
                        </AvatarFallback>
                      </Avatar>
                      <div className="font-medium">
                        {user.firstName} {user.lastName}
                      </div>
                    </div>
                  </TableCell>
                  {!isMobile && <TableCell>{user.email}</TableCell>}
                  <TableCell>{getRoleBadge(user.userType)}</TableCell>
                  <TableCell>{getStatusBadge(user)}</TableCell>
                  {!isMobile && (
                    <TableCell>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>
                  )}
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
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedUser(user);
                            setIsViewDialogOpen(true);
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" /> View details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentUser(user);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" /> Edit user
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => {
                            setCurrentUser(user);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash className="mr-2 h-4 w-4" /> Delete user
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user information.</DialogDescription>
          </DialogHeader>
          {currentUser && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-firstName">First Name</Label>
                <Input
                  id="edit-firstName"
                  value={currentUser.firstName}
                  onChange={(e) =>
                    setCurrentUser({
                      ...currentUser,
                      firstName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-lastName">Last Name</Label>
                <Input
                  id="edit-lastName"
                  value={currentUser.lastName}
                  onChange={(e) =>
                    setCurrentUser({
                      ...currentUser,
                      lastName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={currentUser.email}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, email: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-role">Role</Label>
                <Select
                  value={currentUser.userType}
                  onValueChange={(value) =>
                    setCurrentUser({
                      ...currentUser,
                      userType: value as "DONOR" | "RECIPIENT" | "ADMIN",
                    })
                  }
                >
                  <SelectTrigger id="edit-role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="DONOR">Donor</SelectItem>
                    <SelectItem value="RECIPIENT">Recipient</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEditUser}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user?
            </DialogDescription>
          </DialogHeader>
          {currentUser && (
            <div className="flex items-center gap-4 py-4">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={currentUser.profilePicture || "/placeholder.svg"}
                  alt={`${currentUser.firstName} ${currentUser.lastName}`}
                />
                <AvatarFallback>
                  {currentUser.firstName.charAt(0)}
                  {currentUser.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">
                  {currentUser.firstName} {currentUser.lastName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {currentUser.email}
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser}>
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-[500px] rounded-xl">
          <DialogHeader className="px-1">
            <DialogTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              User Profile
            </DialogTitle>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-4 py-2">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={selectedUser.profilePicture || "/placeholder.svg"}
                  />
                  <AvatarFallback className="text-xl bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800">
                    {selectedUser.firstName?.charAt(0)}
                    {selectedUser.lastName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="space-y-0.5">
                  <h2 className="text-lg font-bold line-clamp-1">
                    {selectedUser.firstName} {selectedUser.lastName}
                  </h2>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-muted-foreground line-clamp-1">
                      {selectedUser.email}
                    </span>
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        "deletedAt" in selectedUser && selectedUser.deletedAt
                          ? "bg-red-500"
                          : "bg-green-500"
                      }`}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="border rounded-lg p-2 text-center">
                  <h3 className="text-xs text-muted-foreground">Role</h3>
                  <div className="mt-0.5 text-sm">
                    {getRoleBadge(selectedUser.userType)}
                  </div>
                </div>

                <div className="border rounded-lg p-2 text-center">
                  <h3 className="text-xs text-muted-foreground">Status</h3>
                  <div className="mt-0.5 text-sm">
                    {getStatusBadge(selectedUser)}
                  </div>
                </div>

                <div className="border rounded-lg p-2 text-center">
                  <h3 className="text-xs text-muted-foreground">Joined</h3>
                  <p className="mt-0.5 text-xs">
                    {new Date(selectedUser.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {selectedUser.phone && (
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/20">
                    <Phone className="h-4 w-4 flex-shrink-0 text-blue-500" />
                    <div className="overflow-hidden">
                      <h3 className="text-xs text-muted-foreground">Phone</h3>
                      <p className="text-sm truncate">{selectedUser.phone}</p>
                    </div>
                  </div>
                )}

                {selectedUser.address && (
                  <div className="flex items-start gap-2 p-2 rounded-lg bg-muted/20">
                    <MapPin className="h-4 w-4 flex-shrink-0 text-green-500 mt-0.5" />
                    <div className="overflow-hidden">
                      <h3 className="text-xs text-muted-foreground">Address</h3>
                      <p className="text-xs line-clamp-2">
                        {selectedUser.address}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full h-[0.5px] bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-2 bg-background text-[10px] text-muted-foreground">
                    ID: {selectedUser.id}
                  </span>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="px-1 pt-2">
            <Button
              onClick={() => setIsViewDialogOpen(false)}
              className="h-8 px-3 text-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
