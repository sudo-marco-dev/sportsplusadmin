import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Search, Eye, Ban, UserCheck, Download } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";
import { VerificationBadge } from "./VerificationBadge";
import { toast } from "sonner";

const initialUsers = [
  { id: 1, username: "john_doe", email: "john@example.com", role: "Player", status: "Active", lastLogin: "2025-10-04 14:32", verification: "verified" as const, validId: "https://images.unsplash.com/photo-1623795457659-f6b530b2e383?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcml2ZXJzJTIwbGljZW5zZSUyMElEJTIwY2FyZHxlbnwxfHx8fDE3NjU4NjYzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", idType: "Driver's License", dob: "1995-08-15", skillLevel: "Advanced" },
  { id: 2, username: "sarah_player", email: "sarah@example.com", role: "Player", status: "Active", lastLogin: "2025-10-05 09:15", verification: "suspicious" as const, validId: "https://images.unsplash.com/photo-1635231152740-dcfba853f33d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXNzcG9ydCUyMGlkZW50aWZpY2F0aW9uJTIwZG9jdW1lbnR8ZW58MXx8fHwxNzY1ODE2NTQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", idType: "Passport", dob: "1998-03-22", skillLevel: "Intermediate" },
  { id: 3, username: "sports_org_alpha", email: "contact@sportsorg.com", role: "Organization", status: "Active", lastLogin: "2025-10-05 11:20", verification: "verified" as const, validId: "https://images.unsplash.com/photo-1613826488523-b537c0cab318?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3Zlcm5tZW50JTIwSUQlMjBjYXJkfGVufDF8fHx8MTc2NTg2NjMwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", idType: "Business License", orgName: "Alpha Sports Association", officialDesignation: "Regional Director", businessAddress: "123 Stadium Way, Metro City" },
  { id: 4, username: "player_emma", email: "emma@example.com", role: "Player", status: "Banned", lastLogin: "2025-09-28 16:45", verification: "suspicious" as const, validId: "https://images.unsplash.com/photo-1623795457659-f6b530b2e383?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcml2ZXJzJTIwbGljZW5zZSUyMElEJTIwY2FyZHxlbnwxfHx8fDE3NjU4NjYzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", idType: "Driver's License", dob: "2000-11-05", skillLevel: "Beginner" },
  { id: 5, username: "community_league", email: "info@communityleague.org", role: "Organization", status: "Active", lastLogin: "2025-10-05 08:10", verification: "verified" as const, validId: "https://images.unsplash.com/photo-1635231152740-dcfba853f33d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXNzcG9ydCUyMGlkZW50aWZpY2F0aW9uJTIwZG9jdW1lbnR8ZW58MXx8fHwxNzY1ODE2NTQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", idType: "Government Permit", orgName: "City Community League", officialDesignation: "Executive Coordinator", businessAddress: "456 Community Hub, West Side" },
  { id: 6, username: "player_chris", email: "chris@example.com", role: "Player", status: "Active", lastLogin: "2025-10-04 19:22", verification: "unverified" as const, validId: "https://images.unsplash.com/photo-1613826488523-b537c0cab318?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3Zlcm5tZW50JTIwSUQlMjBjYXJkfGVufDF8fHx8MTc2NTg2NjMwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", idType: "National ID", dob: "1992-12-30", skillLevel: "Advanced" },
  { id: 7, username: "player_jessica", email: "jessica@example.com", role: "Player", status: "Inactive", lastLogin: "2025-09-15 12:30", verification: "verified" as const, validId: "https://images.unsplash.com/photo-1623795457659-f6b530b2e383?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcml2ZXJzJTIwbGljZW5zZSUyMElEJTIwY2FyZHxlbnwxfHx8fDE3NjU4NjYzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", idType: "Driver's License", dob: "1996-05-18", skillLevel: "Intermediate" },
  { id: 8, username: "elite_coaches_org", email: "admin@elitecoaches.net", role: "Organization", status: "Active", lastLogin: "2025-10-05 10:05", verification: "verified" as const, validId: "https://images.unsplash.com/photo-1635231152740-dcfba853f33d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXNzcG9ydCUyMGlkZW50aWZpY2F0aW9uJTIwZG9jdW1lbnR8ZW58MXx8fHwxNzY1ODE2NTQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", idType: "Business License", orgName: "Elite Coaching Network", officialDesignation: "Operations Manager", businessAddress: "789 Elite Plaza, North District" },
];

export function UserManagement() {
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<typeof initialUsers[0] | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-500/10 text-green-700 dark:text-green-400 hover:bg-green-500/20">Active</Badge>;
      case "Banned":
        return <Badge variant="destructive">Banned</Badge>;
      case "Inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Organization":
        return <Badge className="bg-purple-500/10 text-purple-700 dark:text-purple-400 hover:bg-purple-500/20">Organization</Badge>;
      case "Player":
        return <Badge variant="outline">Player</Badge>;
      default:
        return <Badge>{role}</Badge>;
    }
  };

  const handleViewUser = (user: typeof initialUsers[0]) => {
    setSelectedUser(user);
    setViewDialogOpen(true);
  };

  const handleBanUser = (userId: number) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === "Banned" ? "Active" : "Banned" }
        : user
    ));
    const user = users.find(u => u.id === userId);
    if (user?.status === "Banned") {
      toast.success(`User ${user.username} has been unbanned`);
    } else {
      toast.success(`User ${user?.username} has been banned`);
    }
  };



  return (
    <div className="space-y-6">
      <div>
        <h2>User Management</h2>
        <p className="text-muted-foreground">Manage all users, roles, and permissions.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User List</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by username or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="Player">Player</SelectItem>
                <SelectItem value="Organization">Organization</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Banned">Banned</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  {roleFilter === "Organization" ? (
                    <>
                      <TableHead>Organization Name</TableHead>
                      <TableHead>Official Designation</TableHead>
                    </>
                  ) : (
                    <>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                    </>
                  )}
                  <TableHead>Status</TableHead>
                  <TableHead>AI Verification</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.username}</TableCell>
                    {roleFilter === "Organization" ? (
                      <>
                        <TableCell>{(user as any).orgName || "N/A"}</TableCell>
                        <TableCell>{(user as any).officialDesignation || "N/A"}</TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{getRoleBadge(user.role)}</TableCell>
                      </>
                    )}
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell><VerificationBadge status={user.verification} size="sm" /></TableCell>
                    <TableCell className="text-muted-foreground">{user.lastLogin}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={() => handleViewUser(user)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={() => handleBanUser(user.id)}
                        >
                          {user.status === "Banned" ? (
                            <UserCheck className="h-4 w-4" />
                          ) : (
                            <Ban className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>

      {/* View User Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>User Profile</DialogTitle>
            <DialogDescription>
              Detailed information about {selectedUser?.username}
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Username</p>
                  <p>{selectedUser.username}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p>{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Role</p>
                  <div className="mt-1">{getRoleBadge(selectedUser.role)}</div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <div className="mt-1">{getStatusBadge(selectedUser.status)}</div>
                </div>
                {selectedUser.role === "Player" && (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground">Date of Birth</p>
                      <p>{(selectedUser as any).dob || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Skill Level</p>
                      <p>{(selectedUser as any).skillLevel || "N/A"}</p>
                    </div>
                  </>
                )}
                {selectedUser.role === "Organization" && (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground">Organization Name</p>
                      <p>{(selectedUser as any).orgName || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Official Designation</p>
                      <p>{(selectedUser as any).officialDesignation || "N/A"}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-muted-foreground">Official Business Address</p>
                      <p>{(selectedUser as any).businessAddress || "N/A"}</p>
                    </div>
                  </>
                )}
                <div>
                  <p className="text-sm text-muted-foreground">
                    {selectedUser.role === "Organization" ? "Business Permit Status" : "AI Verification Status"}
                  </p>
                  <div className="mt-1"><VerificationBadge status={selectedUser.verification} size="md" /></div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Login</p>
                  <p>{selectedUser.lastLogin}</p>
                </div>
              </div>

              {/* Valid ID Section */}
              <div className="space-y-3 border-t pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm">
                      {selectedUser.role === "Organization" 
                        ? "Government Permit or Business License" 
                        : "Uploaded Valid ID"}
                    </h4>
                    <p className="text-xs text-muted-foreground">{selectedUser.idType}</p>
                  </div>
                  <a href={selectedUser.validId} target="_blank" rel="noopener noreferrer" download>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </a>
                </div>
                <div className="border rounded-lg overflow-hidden bg-muted/20">
                  <img 
                    src={selectedUser.validId} 
                    alt={`${selectedUser.username}'s identification document`}
                    className="w-full h-auto object-contain max-h-[300px]"
                  />
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Click the image to view full size or use the download button above
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}