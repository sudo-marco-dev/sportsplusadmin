import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { Search, Eye, ShieldCheck, ShieldAlert, Shield, Download, Building2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";
import { VerificationBadge } from "./VerificationBadge";
import { toast } from "sonner";

const initialUsers = [
  { id: 1, username: "john_doe", email: "john@example.com", role: "Player", status: "Active", lastLogin: "2025-10-04 14:32", verification: "verified" as const, validId: "https://images.unsplash.com/photo-1623795457659-f6b530b2e383?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcml2ZXJzJTIwbGljZW5zZSUyMElEJTIwY2FyZHxlbnwxfHx8fDE3NjU4NjYzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", idType: "Driver's License", dob: "1995-08-15", skillLevel: "Advanced" },
  { id: 2, username: "sarah_player", email: "sarah@example.com", role: "Player", status: "Active", lastLogin: "2025-10-05 09:15", verification: "suspicious" as const, validId: "https://images.unsplash.com/photo-1635231152740-dcfba853f33d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXNzcG9ydCUyMGlkZW50aWZpY2F0aW9uJTIwZG9jdW1lbnR8ZW58MXx8fHwxNzY1ODE2NTQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", idType: "Passport", dob: "1998-03-22", skillLevel: "Intermediate" },
  { id: 3, username: "sports_org_alpha", email: "contact@sportsorg.com", role: "Organization", status: "Active", lastLogin: "2025-10-05 11:20", verification: "verified" as const, validId: "https://images.unsplash.com/photo-1613826488523-b537c0cab318?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3Zlcm5tZW50JTIwSUQlMjBjYXJkfGVufDF8fHx8MTc2NTg2NjMwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", idType: "Business License", orgName: "Alpha Sports Association", officialDesignation: "Regional Director", businessAddress: "123 Stadium Way, Metro City", joinedDate: "2026-02-15", totalEventsHosted: 24, contactEmail: "admin@sportsorg.alpha" },
  { id: 4, username: "player_emma", email: "emma@example.com", role: "Player", status: "Banned", lastLogin: "2025-09-28 16:45", verification: "suspicious" as const, validId: "https://images.unsplash.com/photo-1623795457659-f6b530b2e383?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcml2ZXJzJTIwbGljZW5zZSUyMElEJTIwY2FyZHxlbnwxfHx8fDE3NjU4NjYzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", idType: "Driver's License", dob: "2000-11-05", skillLevel: "Beginner" },
  { id: 5, username: "community_league", email: "info@communityleague.org", role: "Organization", status: "Active", lastLogin: "2025-10-05 08:10", verification: "unverified" as const, validId: "https://images.unsplash.com/photo-1635231152740-dcfba853f33d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXNzcG9ydCUyMGlkZW50aWZpY2F0aW9uJTIwZG9jdW1lbnR8ZW58MXx8fHwxNzY1ODE2NTQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", idType: "Government Permit", orgName: "City Community League", officialDesignation: "Executive Coordinator", businessAddress: "456 Community Hub, West Side", joinedDate: "2026-01-10", totalEventsHosted: 12, contactEmail: "info@cityleague.org" },
  { id: 6, username: "player_chris", email: "chris@example.com", role: "Player", status: "Active", lastLogin: "2025-10-04 19:22", verification: "unverified" as const, validId: "https://images.unsplash.com/photo-1613826488523-b537c0cab318?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3Zlcm5tZW50JTIwSUQlMjBjYXJkfGVufDF8fHx8MTc2NTg2NjMwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", idType: "National ID", dob: "1992-12-30", skillLevel: "Advanced" },
  { id: 7, username: "player_jessica", email: "jessica@example.com", role: "Player", status: "Inactive", lastLogin: "2025-09-15 12:30", verification: "verified" as const, validId: "https://images.unsplash.com/photo-1623795457659-f6b530b2e383?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcml2ZXJzJTIwbGljZW5zZSUyMElEJTIwY2FyZHxlbnwxfHx8fDE3NjU4NjYzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", idType: "Driver's License", dob: "1996-05-18", skillLevel: "Intermediate" },
  { id: 8, username: "elite_coaches_org", email: "admin@elitecoaches.net", role: "Organization", status: "Active", lastLogin: "2025-10-05 10:05", verification: "suspicious" as const, validId: "https://images.unsplash.com/photo-1635231152740-dcfba853f33d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXNzcG9ydCUyMGlkZW50aWZpY2F0aW9uJTIwZG9jdW1lbnR8ZW58MXx8fHwxNzY1ODE2NTQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", idType: "Business License", orgName: "Elite Coaching Network", officialDesignation: "Operations Manager", businessAddress: "789 Elite Plaza, North District", joinedDate: "2026-03-01", totalEventsHosted: 8, contactEmail: "ops@elitecoaches.net" },
];

const hostedEvents = [
  { id: 101, orgId: 3, name: "City-Wide 3x3 Tournament", sportType: "Basketball", dateTime: "April 12, 2026, 9:00 AM", venue: "Central Sports Complex", status: "Completed", participantCount: 48 },
  { id: 102, orgId: 3, name: "Youth Volleyball Open", sportType: "Volleyball", dateTime: "May 05, 2026, 10:30 AM", venue: "East Side Courts", status: "Ongoing", participantCount: 32 },
  { id: 103, orgId: 3, name: "Regional Qualifiers", sportType: "Basketball", dateTime: "May 20, 2026, 8:00 AM", venue: "Grand Arena", status: "Ongoing", participantCount: 120 },
  { id: 104, orgId: 3, name: "Summer Bash", sportType: "Badminton", dateTime: "June 15, 2026, 2:00 PM", venue: "City Gym", status: "Cancelled", participantCount: 0 },
  { id: 105, orgId: 5, name: "Community League Opener", sportType: "Soccer", dateTime: "April 10, 2026, 3:00 PM", venue: "Sunset Field", status: "Completed", participantCount: 64 },
  { id: 106, orgId: 5, name: "Weekend Scrimmage", sportType: "Soccer", dateTime: "May 02, 2026, 4:00 PM", venue: "Sunset Field", status: "Ongoing", participantCount: 22 },
  { id: 107, orgId: 8, name: "Pro Coaching Clinic", sportType: "Training", dateTime: "April 25, 2026, 9:00 AM", venue: "Elite Plaza B1", status: "Completed", participantCount: 15 },
];

export function OrganizationManagement() {
  const [organizations, setOrganizations] = useState(initialUsers.filter(u => u.role === "Organization"));
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrg, setSelectedOrg] = useState<typeof initialUsers[0] | null>(null);
  const [licenseDialogOpen, setLicenseDialogOpen] = useState(false);
  const [eventsDialogOpen, setEventsDialogOpen] = useState(false);

  const filteredOrgs = organizations.filter(org => {
    const matchesSearch = (org as any).orgName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         org.username.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleReviewLicense = (org: typeof initialUsers[0]) => {
    setSelectedOrg(org);
    setLicenseDialogOpen(true);
  };

  const handleViewEvents = (org: typeof initialUsers[0]) => {
    setSelectedOrg(org);
    setEventsDialogOpen(true);
  };

  const handleUpdateStatus = (orgId: number, newVerification: "verified" | "unverified" | "suspicious") => {
    setOrganizations(organizations.map(org => 
      org.id === orgId ? { ...org, verification: newVerification } : org
    ));
    
    const statusLabels = {
      verified: "Verified",
      unverified: "Pending",
      suspicious: "Flagged"
    };
    
    toast.success(`Organization status updated to ${statusLabels[newVerification]}`);
    setLicenseDialogOpen(false);
  };

  const getEventsForOrg = (orgId: number) => {
    return hostedEvents.filter(event => event.orgId === orgId);
  };

  const calculateMetrics = (events: typeof hostedEvents) => {
    const total = events.length;
    if (total === 0) return { total: 0, completionRate: 0, avgEngagement: 0 };
    
    const nonCancelled = events.filter(e => e.status !== "Cancelled").length;
    const completionRate = Math.round((nonCancelled / total) * 100);
    const avgEngagement = Math.round(events.reduce((acc, curr) => acc + curr.participantCount, 0) / total);
    
    return { total, completionRate, avgEngagement };
  };

  const getEventStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-green-500/10 text-green-700 dark:text-green-400">Completed</Badge>;
      case "Ongoing":
        return <Badge className="bg-blue-500/10 text-blue-700 dark:text-blue-400">Ongoing</Badge>;
      case "Cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
          <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h2>Organization Management</h2>
          <p className="text-muted-foreground">Review and verify organizational accounts and licenses.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Organizations</CardTitle>
          <CardDescription>
            A list of all registered organizations and their verification status.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by organization name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Table */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Organization Name</TableHead>
                  <TableHead>Official Designation</TableHead>
                  <TableHead>Business Address</TableHead>
                  <TableHead>Joined Date</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Verification Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrgs.map((org) => (
                  <TableRow key={org.id}>
                    <TableCell className="font-medium">{(org as any).orgName}</TableCell>
                    <TableCell>{(org as any).officialDesignation}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{(org as any).businessAddress}</TableCell>
                    <TableCell>{(org as any).joinedDate}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{(org as any).totalEventsHosted}</span>
                        <span className="text-xs text-muted-foreground text-[10px] uppercase">Events Hosted</span>
                      </div>
                    </TableCell>
                    <TableCell className="relative z-0">
                      <VerificationBadge status={org.verification} size="sm" />
                    </TableCell>
                    <TableCell className="text-right relative z-0">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="gap-2"
                          onClick={() => handleViewEvents(org)}
                        >
                          <Eye className="h-4 w-4" />
                          View Events
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="gap-2"
                          onClick={() => handleReviewLicense(org)}
                        >
                          <ShieldCheck className="h-4 w-4" />
                          Review License
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* License Review Dialog */}
      <Dialog open={licenseDialogOpen} onOpenChange={setLicenseDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>License Review - {selectedOrg && (selectedOrg as any).orgName}</DialogTitle>
            <DialogDescription>
              Verify the uploaded government permit or business license.
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrg && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Organization Name</p>
                  <p className="font-medium">{(selectedOrg as any).orgName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Official Designation</p>
                  <p>{(selectedOrg as any).officialDesignation}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Admin Username</p>
                  <p>{selectedOrg.username}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Contact Email</p>
                  <p>{(selectedOrg as any).contactEmail || selectedOrg.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Joined Date</p>
                  <p>{(selectedOrg as any).joinedDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Activity</p>
                  <p>{(selectedOrg as any).totalEventsHosted} Events Hosted</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Status</p>
                  <div className="mt-1">
                    <VerificationBadge status={selectedOrg.verification} size="sm" />
                  </div>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">Official Business Address</p>
                  <p>{(selectedOrg as any).businessAddress}</p>
                </div>
              </div>

              <div className="space-y-3 border-t pt-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Government Permit or Business License</h4>
                  <a href={selectedOrg.validId} target="_blank" rel="noopener noreferrer" download>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </a>
                </div>
                <div className="border rounded-lg overflow-hidden bg-muted/20">
                  <img 
                    src={selectedOrg.validId} 
                    alt="Business License"
                    className="w-full h-auto object-contain max-h-[400px]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-4 border-t">
                <p className="text-sm font-medium text-center">Set Organization Verification Status</p>
                <div className="flex justify-center gap-4">
                  <Button 
                    className="flex-1 gap-2 bg-green-600 hover:bg-green-700" 
                    onClick={() => handleUpdateStatus(selectedOrg.id, "verified")}
                  >
                    <ShieldCheck className="h-4 w-4" />
                    Mark as Verified
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 gap-2 border-yellow-500 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-50"
                    onClick={() => handleUpdateStatus(selectedOrg.id, "unverified")}
                  >
                    <Shield className="h-4 w-4" />
                    Keep Pending
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="flex-1 gap-2"
                    onClick={() => handleUpdateStatus(selectedOrg.id, "suspicious")}
                  >
                    <ShieldAlert className="h-4 w-4" />
                    Flag Organization
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="ghost" onClick={() => setLicenseDialogOpen(false)}>
              Close Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Hosted Events Drill-Down Dialog */}
      <Dialog open={eventsDialogOpen} onOpenChange={setEventsDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedOrg && (selectedOrg as any).orgName} - Hosted Events</DialogTitle>
            <DialogDescription>
              Detailed history and performance metrics of events organized by this entity.
            </DialogDescription>
          </DialogHeader>

          {selectedOrg && (
            <div className="space-y-6 pt-4">
              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4">
                {(() => {
                  const metrics = calculateMetrics(getEventsForOrg(selectedOrg.id));
                  return (
                    <>
                      <div className="bg-white dark:bg-card p-4 rounded-xl border shadow-sm z-10 relative">
                        <p className="text-xs text-muted-foreground uppercase font-semibold">Total Events</p>
                        <p className="text-2xl font-bold">{metrics.total}</p>
                      </div>
                      <div className="bg-white dark:bg-card p-4 rounded-xl border shadow-sm z-10 relative">
                        <p className="text-xs text-muted-foreground uppercase font-semibold">Hosting Health</p>
                        <div className="flex items-center gap-2">
                          <p className="text-2xl font-bold">{metrics.completionRate}%</p>
                          <span className="text-xs text-muted-foreground font-normal">Completion Rate</span>
                        </div>
                      </div>
                      <div className="bg-white dark:bg-card p-4 rounded-xl border shadow-sm z-10 relative">
                        <p className="text-xs text-muted-foreground uppercase font-semibold">Avg Engagement</p>
                        <div className="flex items-center gap-2">
                          <p className="text-2xl font-bold">{metrics.avgEngagement}</p>
                          <span className="text-xs text-muted-foreground font-normal">Participants / Event</span>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>

              {/* Events Table */}
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event Name</TableHead>
                      <TableHead>Sport</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Participants</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getEventsForOrg(selectedOrg.id).length > 0 ? (
                      getEventsForOrg(selectedOrg.id).map((event) => (
                        <TableRow key={event.id}>
                          <TableCell className="font-medium">{event.name}</TableCell>
                          <TableCell>{event.sportType}</TableCell>
                          <TableCell className="text-sm">{event.dateTime}</TableCell>
                          <TableCell>{event.participantCount}</TableCell>
                          <TableCell>{getEventStatusBadge(event.status)}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                          No event history found for this organization.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setEventsDialogOpen(false)}>
              Close Events View
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

