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
  Building2,
  Plus,
  AlertCircle,
  RefreshCw,
  Loader2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useMobile } from "@/hooks/use-mobile";
import { toast } from "@/hooks/use-toast";
import {
  adminCreateAssociation,
  adminGetAllAssociations,
  adminUpdateAssociation,
  adminDeleteAssociation,
  type Association,
} from "@/api/admin";

export default function AssociationManagement() {
  const [associations, setAssociations] = useState<Association[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedAssociation, setSelectedAssociation] =
    useState<Association | null>(null);
  const [currentAssociation, setCurrentAssociation] =
    useState<Association | null>(null);
  const [newAssociation, setNewAssociation] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    description: "",
    category: "Food" as
      | "Food"
      | "Clothes"
      | "Healthcare"
      | "Education"
      | "Home supplies",
    logoUrl: "",
  });
  const isMobile = useMobile();

  useEffect(() => {
    const fetchAssociations = async () => {
      try {
        setLoading(true);
        const data = await adminGetAllAssociations();
        setAssociations(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch associations. Please try again later.");
        console.error("Error fetching associations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssociations();
  }, []);

  const filteredAssociations = associations.filter((association) => {
    const matchesSearch =
      association.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      association.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || association.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const handleCreateAssociation = async () => {
    try {
      setLoading(true);
      const createdAssociation = await adminCreateAssociation({
        name: newAssociation.name,
        email: newAssociation.email,
        password: newAssociation.password,
        phone: newAssociation.phone,
        address: newAssociation.address,
        description: newAssociation.description,
        category: newAssociation.category,
        logoUrl: newAssociation.logoUrl,
      });

      setAssociations([...associations, createdAssociation]);
      setNewAssociation({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        description: "",
        category: "Food",
        logoUrl: "",
      });
      toast({
        title: "Association created successfully",
        description: `New Association has been added.`,
        className:
          "border-emerald-200 dark:border-emerald-600/50 bg-emerald-50 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-100 rounded-2xl px-5 py-4 shadow-lg font-medium",
      });
      setIsCreateDialogOpen(false);
    } catch (err) {
      console.error("Error creating association:", err);
      toast({
        title: "Failed to create association",
        description: "Please try again or check the details.",
        variant: "destructive",
      });
      setError("Failed to create association. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditAssociation = async () => {
    if (!currentAssociation) return;
    try {
      setLoading(true);
      const updatedAssociation = await adminUpdateAssociation(
        currentAssociation.id,
        {
          name: currentAssociation.name,
          email: currentAssociation.email,
          phone: currentAssociation.phone,
          address: currentAssociation.address,
          description: currentAssociation.description,
          category: currentAssociation.category,
          logoUrl: currentAssociation.logoUrl,
        }
      );

      setAssociations(
        associations.map((association) =>
          association.id === currentAssociation.id
            ? updatedAssociation
            : association
        )
      );
      toast({
        title: "Association updated successfully",
        description: `Selected Association details have been updated.`,
        className:
          "border-emerald-200 dark:border-emerald-600/50 bg-emerald-50 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-100 rounded-2xl px-5 py-4 shadow-lg font-medium",
      });
      setIsEditDialogOpen(false);
    } catch (err) {
      console.error("Error updating association:", err);
      toast({
        title: "Failed to update association",
        description: "Please try again or check the details.",
        variant: "destructive",
      });
      setError("Failed to update association. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAssociation = async () => {
    if (!currentAssociation) return;
    try {
      setLoading(true);
      await adminDeleteAssociation(currentAssociation.id);
      setAssociations(
        associations.filter(
          (association) => association.id !== currentAssociation.id
        )
      );
      toast({
        title: "Association deleted successfully",
        description: `Selected Association has been removed.`,
        className:
          "border-emerald-200 dark:border-emerald-600/50 bg-emerald-50 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-100 rounded-2xl px-5 py-4 shadow-lg font-medium",
      });
      setIsDeleteDialogOpen(false);
    } catch (err) {
      console.error("Error deleting association:", err);
      toast({
        title: "Failed to delete association",
        description: "Please try again or check permissions.",
        variant: "destructive",
      });
      setError("Failed to delete association. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getCategoryBadge = (category?: string) => {
    if (!category) return <Badge>Unknown</Badge>;

    switch (category) {
      case "Food":
        return <Badge className="bg-green-500">Food</Badge>;
      case "Clothes":
        return <Badge className="bg-blue-500">Clothes</Badge>;
      case "Healthcare":
        return <Badge className="bg-red-500">Healthcare</Badge>;
      case "Education":
        return <Badge className="bg-purple-500">Education</Badge>;
      case "Home supplies":
        return <Badge className="bg-amber-500">Home supplies</Badge>;
      default:
        return <Badge>{category}</Badge>;
    }
  };

  if (loading && !associations.length) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error && !associations.length) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <AlertCircle className="h-10 w-10 text-red-500 mb-4" />
        <h3 className="text-lg font-medium mb-1">Error loading associations</h3>
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
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search associations..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Food">Food</SelectItem>
              <SelectItem value="Clothes">Clothes</SelectItem>
              <SelectItem value="Healthcare">Healthcare</SelectItem>
              <SelectItem value="Education">Education</SelectItem>
              <SelectItem value="Home supplies">Home supplies</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-sm h-9 px-3">
              <Plus size={16} /> Add Association
            </Button>
          </DialogTrigger>

          <DialogContent className="w-[92vw] rounded-lg p-4">
            <DialogHeader className="mb-3">
              <DialogTitle className="text-base font-semibold flex items-center gap-2">
                <Plus className="h-4 w-4 text-purple-600" />
                Register Organization
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Add new charitable association
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
              {["name", "email", "password", "phone", "address"].map(
                (field) => {
                  // Type guard to ensure field is a valid key of newAssociation
                  const isValidField = (
                    key: string
                  ): key is keyof typeof newAssociation => {
                    return key in newAssociation;
                  };

                  if (!isValidField(field)) return null;

                  return (
                    <div key={field} className="space-y-1">
                      <Label className="text-xs font-medium">
                        {field === "name"
                          ? "Organization Name"
                          : field === "email"
                          ? "Contact Email"
                          : field === "password"
                          ? "Password"
                          : field === "phone"
                          ? "Phone"
                          : "Address"}
                      </Label>
                      <Input
                        type={
                          field === "password"
                            ? "password"
                            : field === "email"
                            ? "email"
                            : "text"
                        }
                        value={newAssociation[field]}
                        onChange={(e) =>
                          setNewAssociation({
                            ...newAssociation,
                            [field]: e.target.value,
                          })
                        }
                        className="h-8 text-sm"
                      />
                    </div>
                  );
                }
              )}

              <div className="space-y-1">
                <Label className="text-xs font-medium">Description</Label>
                <Textarea
                  value={newAssociation.description}
                  onChange={(e) =>
                    setNewAssociation({
                      ...newAssociation,
                      description: e.target.value,
                    })
                  }
                  className="min-h-[60px] text-sm"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-medium">Category</Label>
                <Select
                  value={newAssociation.category}
                  onValueChange={(value) =>
                    setNewAssociation({
                      ...newAssociation,
                      category: value as
                        | "Food"
                        | "Clothes"
                        | "Healthcare"
                        | "Education"
                        | "Home supplies",
                    })
                  }
                >
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue placeholder="Select focus area" />
                  </SelectTrigger>
                  <SelectContent className="text-sm">
                    {[
                      "Food",
                      "Clothing",
                      "Healthcare",
                      "Education",
                      "Shelter",
                    ].map((cat) => (
                      <SelectItem key={cat} value={cat} className="text-sm">
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter className="mt-3 gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8"
                onClick={() => setIsCreateDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                className="h-8 bg-gradient-to-r from-blue-600 to-purple-600"
                onClick={handleCreateAssociation}
                disabled={
                  !newAssociation.name ||
                  !newAssociation.email ||
                  !newAssociation.password
                }
              >
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border shadow-sm bg-white dark:bg-slate-900">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead>Association</TableHead>
              {!isMobile && <TableHead>Email</TableHead>}
              <TableHead>Category</TableHead>
              {!isMobile && <TableHead>Created</TableHead>}
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAssociations.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={isMobile ? 3 : 5}
                  className="h-24 text-center"
                >
                  No associations found
                </TableCell>
              </TableRow>
            ) : (
              filteredAssociations.map((association) => (
                <TableRow key={association.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8 border">
                        <AvatarImage
                          src={association.logoUrl || "/placeholder.svg"}
                          alt={association.name}
                        />
                        <AvatarFallback className="bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700">
                          <Building2 className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{association.name}</div>
                    </div>
                  </TableCell>
                  {!isMobile && <TableCell>{association.email}</TableCell>}
                  <TableCell>
                    {getCategoryBadge(association.category)}
                  </TableCell>
                  {!isMobile && (
                    <TableCell>
                      {new Date(
                        association.createdAt || ""
                      ).toLocaleDateString()}
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
                            setSelectedAssociation(association);
                            setIsViewDialogOpen(true);
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" /> View details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentAssociation(association);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" /> Edit association
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => {
                            setCurrentAssociation(association);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash className="mr-2 h-4 w-4" /> Delete association
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

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="w-[92vw] rounded-lg p-4">
          <DialogHeader className="mb-3">
            <DialogTitle className="text-base font-semibold">
              Edit Association
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Update organization details
            </DialogDescription>
          </DialogHeader>

          {currentAssociation && (
            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
              {[
                {
                  id: "name" as keyof Association,
                  label: "Name",
                  type: "text",
                },
                {
                  id: "email" as keyof Association,
                  label: "Email",
                  type: "email",
                },
                {
                  id: "phone" as keyof Association,
                  label: "Phone",
                  type: "tel",
                },
                {
                  id: "address" as keyof Association,
                  label: "Address",
                  type: "text",
                },
              ].map((field) => (
                <div key={field.id} className="space-y-1">
                  <Label className="text-xs font-medium">{field.label}</Label>
                  <Input
                    id={`edit-${field.id}`}
                    type={field.type}
                    value={currentAssociation[field.id] || ""}
                    onChange={(e) =>
                      setCurrentAssociation({
                        ...currentAssociation,
                        [field.id]: e.target.value,
                      })
                    }
                    className="h-8 text-sm"
                  />
                </div>
              ))}

              <div className="space-y-1">
                <Label className="text-xs font-medium">Description</Label>
                <Textarea
                  value={currentAssociation.description || ""}
                  onChange={(e) =>
                    setCurrentAssociation({
                      ...currentAssociation,
                      description: e.target.value,
                    })
                  }
                  className="min-h-[60px] text-sm"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-medium">Category</Label>
                <Select
                  value={currentAssociation.category || "Food"}
                  onValueChange={(value) =>
                    setCurrentAssociation({
                      ...currentAssociation,
                      category: value,
                    })
                  }
                >
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="text-sm">
                    {[
                      "Food",
                      "Clothing",
                      "Healthcare",
                      "Education",
                      "Shelter",
                    ].map((cat) => (
                      <SelectItem key={cat} value={cat} className="text-sm">
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <DialogFooter className="mt-3 gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              className="h-8 bg-gradient-to-r from-blue-600 to-purple-600"
              onClick={handleEditAssociation}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Association</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this association? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {currentAssociation && (
            <div className="flex items-center gap-4 py-4">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={currentAssociation.logoUrl || "/placeholder.svg"}
                  alt={currentAssociation.name}
                />
                <AvatarFallback className="bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700">
                  <Building2 className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{currentAssociation.name}</p>
                <p className="text-sm text-muted-foreground">
                  {currentAssociation.email}
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
            <Button variant="destructive" onClick={handleDeleteAssociation}>
              Delete Association
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Association Profile</DialogTitle>
          </DialogHeader>
          {selectedAssociation && (
            <div className="space-y-4 py-2">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={selectedAssociation.logoUrl || "/placeholder.svg"}
                  />
                  <AvatarFallback className="text-xl bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800">
                    <Building2 className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>

                <div className="space-y-0.5">
                  <h2 className="text-lg font-bold">
                    {selectedAssociation.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {selectedAssociation.email}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="border rounded-lg p-2 text-center">
                  <h3 className="text-xs text-muted-foreground">Category</h3>
                  <div className="mt-0.5 text-sm">
                    {getCategoryBadge(selectedAssociation.category)}
                  </div>
                </div>
                <div className="border rounded-lg p-2 text-center">
                  <h3 className="text-xs text-muted-foreground">Created</h3>
                  <p className="mt-0.5 text-xs">
                    {new Date(
                      selectedAssociation.createdAt || ""
                    ).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="p-2 rounded-lg bg-muted/20">
                  <h3 className="text-xs text-muted-foreground">Description</h3>
                  <p className="text-sm mt-1">
                    {selectedAssociation.description ||
                      "No description provided"}
                  </p>
                </div>

                <div className="p-2 rounded-lg bg-muted/20">
                  <h3 className="text-xs text-muted-foreground">Address</h3>
                  <p className="text-sm mt-1">
                    {selectedAssociation.address || "Not provided"}
                  </p>
                </div>

                <div className="p-2 rounded-lg bg-muted/20">
                  <h3 className="text-xs text-muted-foreground">Phone</h3>
                  <p className="text-sm mt-1">
                    {selectedAssociation.phone || "Not provided"}
                  </p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
