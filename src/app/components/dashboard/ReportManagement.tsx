import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Flag, Eye, CheckCircle, X, Ban, AlertCircle, AlertTriangle } from "lucide-react";
import { VerificationBadge } from "./VerificationBadge";
import { toast } from "sonner";

// Report frequency tracking data
const reportFrequencyData: Record<string, { count: number; status: "high" | "mild" | "low" }> = {
  "player_toxic": { count: 8, status: "high" },
  "player_suspicious": { count: 4, status: "mild" },
  "player_cheater": { count: 6, status: "high" },
  "player_bob": { count: 1, status: "low" },
};

const initialReports = [
  {
    id: "RPT-001",
    reporter: "john_doe",
    accused: "player_toxic",
    accusedVerification: "verified" as const,
    category: "User Misconduct",
    status: "Pending",
    date: "2025-10-05 10:30",
    description: "Player using offensive language in chat during match.",
    evidence: "Screenshots attached showing repeated offensive messages.",
  },
  {
    id: "RPT-002",
    reporter: "sarah_player",
    target: "Match #4532",
    category: "Match Issue",
    status: "Reviewed",
    date: "2025-10-05 09:15",
    description: "Match result not recorded properly in the system.",
    evidence: "Match ended 3-2 but system shows 0-0.",
  },
  {
    id: "RPT-003",
    reporter: "player_emma",
    accused: "player_suspicious",
    accusedVerification: "verified" as const,
    category: "User Misconduct",
    status: "Resolved",
    date: "2025-10-04 16:20",
    description: "Player inappropriately messaging others.",
    evidence: "Chat logs provided by multiple players.",
  },
  {
    id: "RPT-004",
    reporter: "admin_mike",
    target: "System",
    category: "System Bug",
    status: "Pending",
    date: "2025-10-04 14:45",
    description: "User registration form not submitting on mobile devices.",
    evidence: "Error logs and screenshots from multiple devices.",
  },
  {
    id: "RPT-005",
    reporter: "org_admin_alex",
    accused: "player_cheater",
    accusedVerification: "verified" as const,
    category: "User Misconduct",
    status: "Pending",
    date: "2025-10-03 18:30",
    description: "Suspected use of third-party tools to gain unfair advantage.",
    evidence: "Video evidence and match statistics anomalies.",
  },
];

export function ReportManagement() {
  const [reports, setReports] = useState(initialReports);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedReport, setSelectedReport] = useState<typeof initialReports[0] | null>(null);
  const [adminComment, setAdminComment] = useState("");
  const [showBanDialog, setShowBanDialog] = useState(false);
  const [banType, setBanType] = useState<"full" | "create-game" | "play-game">("full");
  const [banDuration, setBanDuration] = useState("24");

  const filteredReports = reports.filter(report => {
    const matchesCategory = categoryFilter === "all" || report.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || report.status === statusFilter;
    return matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return <Badge className="bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-500/20">
          <AlertCircle className="h-3 w-3 mr-1" />
          Pending
        </Badge>;
      case "Reviewed":
        return <Badge className="bg-blue-500/10 text-blue-700 dark:text-blue-400 hover:bg-blue-500/20">Reviewed</Badge>;
      case "Resolved":
        return <Badge className="bg-green-500/10 text-green-700 dark:text-green-400 hover:bg-green-500/20">
          <CheckCircle className="h-3 w-3 mr-1" />
          Resolved
        </Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "User Misconduct":
        return "text-red-600 dark:text-red-400";
      case "Match Issue":
        return "text-blue-600 dark:text-blue-400";
      case "System Bug":
        return "text-purple-600 dark:text-purple-400";
      default:
        return "text-muted-foreground";
    }
  };

  const handleResolveReport = (reportId: string) => {
    setReports(reports.map(report =>
      report.id === reportId ? { ...report, status: "Resolved" } : report
    ));
    toast.success(`Report ${reportId} has been marked as resolved`);
    setSelectedReport(null);
  };

  const handleDismissReport = (reportId: string) => {
    setReports(reports.filter(report => report.id !== reportId));
    toast.info(`Report ${reportId} has been dismissed`);
  };

  const handleOpenBanDialog = (report: typeof initialReports[0]) => {
    setSelectedReport(report);
    setShowBanDialog(true);
  };

  const handleBanUser = () => {
    if (!selectedReport?.accused) return;
    
    const banTypeText = banType === "full" 
      ? "completely banned" 
      : banType === "create-game" 
        ? "banned from creating games" 
        : "banned from playing games";
    
    setReports(reports.map(report =>
      report.id === selectedReport.id ? { ...report, status: "Resolved" } : report
    ));
    
    toast.success(
      `Player/Organization ${selectedReport.accused} has been ${banTypeText} for ${banDuration} hours`
    );
    
    setShowBanDialog(false);
    setSelectedReport(null);
    setBanType("full");
    setBanDuration("24");
  };

  const handleSendWarning = (reportId: string, accused: string) => {
    setReports(reports.map(report =>
      report.id === reportId ? { ...report, status: "Resolved" } : report
    ));
    toast.success(`Warning sent to ${accused}. User has been notified of their behavior.`);
    setSelectedReport(null);
  };

  const getReportFrequencyBadge = (username: string) => {
    const data = reportFrequencyData[username];
    if (!data) return null;

    const { count, status } = data;
    
    switch (status) {
      case "high":
        return (
          <Badge className="bg-red-500/10 text-red-700 dark:text-red-400 hover:bg-red-500/20 gap-1">
            <AlertTriangle className="h-3 w-3" />
            Frequently Reported ({count})
          </Badge>
        );
      case "mild":
        return (
          <Badge className="bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-500/20 gap-1">
            <AlertCircle className="h-3 w-3" />
            Reported {count}x
          </Badge>
        );
      case "low":
        return (
          <Badge className="bg-green-500/10 text-green-700 dark:text-green-400 hover:bg-green-500/20 gap-1">
            <CheckCircle className="h-3 w-3" />
            Clean Record ({count})
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2>Report Management</h2>
        <p className="text-muted-foreground">Review and manage incoming reports from the community.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="User Misconduct">User Misconduct</SelectItem>
            <SelectItem value="Match Issue">Match Issue</SelectItem>
            <SelectItem value="System Bug">System Bug</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Reviewed">Reviewed</SelectItem>
            <SelectItem value="Resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredReports.map((report) => (
          <Card key={report.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Flag className={`h-4 w-4 ${getCategoryColor(report.category)}`} />
                    <CardTitle className="text-base">{report.id}</CardTitle>
                  </div>
                  <p className="text-sm text-muted-foreground">{report.category}</p>
                </div>
                {getStatusBadge(report.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Reporter:</span>
                  <span>{report.reporter}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {report.accused ? "Accused:" : "Target:"}
                  </span>
                  <div className="flex items-center gap-2">
                    <span>{report.accused || report.target}</span>
                    {report.accused && "accusedVerification" in report && (
                      <VerificationBadge status={report.accusedVerification} size="sm" />
                    )}
                  </div>
                </div>
                {report.accused && getReportFrequencyBadge(report.accused) && (
                  <div className="flex justify-between text-sm items-center">
                    <span className="text-muted-foreground">Report History:</span>
                    {getReportFrequencyBadge(report.accused)}
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Date:</span>
                  <span>{report.date}</span>
                </div>
              </div>
              
              <p className="text-sm">{report.description}</p>
              
              <div className="flex flex-wrap gap-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2"
                  onClick={() => setSelectedReport(report)}
                >
                  <Eye className="h-4 w-4" />
                  View Details
                </Button>
                {report.status === "Pending" && (
                  <>
                    <Button 
                      size="sm" 
                      className="gap-2"
                      onClick={() => handleResolveReport(report.id)}
                    >
                      <CheckCircle className="h-4 w-4" />
                      Resolve
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-2"
                      onClick={() => handleDismissReport(report.id)}
                    >
                      <X className="h-4 w-4" />
                      Dismiss
                    </Button>
                    {report.accused && (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="gap-2 bg-orange-500/10 text-orange-700 dark:text-orange-400 hover:bg-orange-500/20 border-orange-200 dark:border-orange-800"
                          onClick={() => handleSendWarning(report.id, report.accused!)}
                        >
                          <AlertTriangle className="h-4 w-4" />
                          Send Warning
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          className="gap-2"
                          onClick={() => handleOpenBanDialog(report)}
                        >
                          <Ban className="h-4 w-4" />
                          Ban User
                        </Button>
                      </>
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Report Detail Dialog */}
      <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Report Details - {selectedReport?.id}</DialogTitle>
            <DialogDescription>
              Review all information and evidence for this report.
            </DialogDescription>
          </DialogHeader>
          {selectedReport && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p>{selectedReport.category}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <div className="mt-1">{getStatusBadge(selectedReport.status)}</div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Reporter</p>
                  <p>{selectedReport.reporter}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {selectedReport.accused ? "Accused" : "Target"}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <p>{selectedReport.accused || selectedReport.target}</p>
                    {selectedReport.accused && "accusedVerification" in selectedReport && (
                      <VerificationBadge status={selectedReport.accusedVerification} size="sm" />
                    )}
                  </div>
                </div>
                {selectedReport.accused && getReportFrequencyBadge(selectedReport.accused) && (
                  <div>
                    <p className="text-sm text-muted-foreground">Report History</p>
                    <div className="mt-1">
                      {getReportFrequencyBadge(selectedReport.accused)}
                    </div>
                  </div>
                )}
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">Submitted</p>
                  <p>{selectedReport.date}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Description</p>
                <p className="text-sm p-3 bg-muted rounded-lg">{selectedReport.description}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Evidence</p>
                <p className="text-sm p-3 bg-muted rounded-lg">{selectedReport.evidence}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Admin Notes</p>
                <Textarea
                  placeholder="Add your comments or resolution notes..."
                  value={adminComment}
                  onChange={(e) => setAdminComment(e.target.value)}
                  rows={4}
                />
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedReport(null)}>
                  Close
                </Button>
                {selectedReport.accused && selectedReport.status === "Pending" && (
                  <>
                    <Button 
                      variant="outline" 
                      className="gap-2 bg-orange-500/10 text-orange-700 dark:text-orange-400 hover:bg-orange-500/20 border-orange-200 dark:border-orange-800"
                      onClick={() => handleSendWarning(selectedReport.id, selectedReport.accused!)}
                    >
                      <AlertTriangle className="h-4 w-4" />
                      Send Warning
                    </Button>
                    <Button 
                      variant="destructive" 
                      className="gap-2"
                      onClick={() => handleOpenBanDialog(selectedReport)}
                    >
                      <Ban className="h-4 w-4" />
                      Ban User
                    </Button>
                  </>
                )}
                {selectedReport.status === "Pending" && (
                  <Button 
                    className="gap-2"
                    onClick={() => handleResolveReport(selectedReport.id)}
                  >
                    <CheckCircle className="h-4 w-4" />
                    Mark as Resolved
                  </Button>
                )}
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Ban User Dialog */}
      <Dialog open={showBanDialog} onOpenChange={setShowBanDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Ban User</DialogTitle>
            <DialogDescription>
              Configure ban settings for {selectedReport?.accused}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-3">
              <Label>Ban Type</Label>
              <RadioGroup value={banType} onValueChange={(value: any) => setBanType(value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="full" id="full" />
                  <Label htmlFor="full" className="font-normal cursor-pointer">
                    Full Ban - User cannot access the platform
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="create-game" id="create-game" />
                  <Label htmlFor="create-game" className="font-normal cursor-pointer">
                    Ban from Creating Games - User can play but not create
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="play-game" id="play-game" />
                  <Label htmlFor="play-game" className="font-normal cursor-pointer">
                    Ban from Playing Games - User can browse but not join games
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Ban Duration (hours)</Label>
              <Select value={banDuration} onValueChange={setBanDuration}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 hour</SelectItem>
                  <SelectItem value="3">3 hours</SelectItem>
                  <SelectItem value="6">6 hours</SelectItem>
                  <SelectItem value="12">12 hours</SelectItem>
                  <SelectItem value="24">24 hours (1 day)</SelectItem>
                  <SelectItem value="48">48 hours (2 days)</SelectItem>
                  <SelectItem value="72">72 hours (3 days)</SelectItem>
                  <SelectItem value="168">168 hours (1 week)</SelectItem>
                  <SelectItem value="336">336 hours (2 weeks)</SelectItem>
                  <SelectItem value="720">720 hours (1 month)</SelectItem>
                  <SelectItem value="permanent">Permanent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm">
                <strong>Summary:</strong> {selectedReport?.accused} will be{" "}
                {banType === "full" 
                  ? "completely banned from the platform" 
                  : banType === "create-game"
                    ? "banned from creating games"
                    : "banned from playing games"}{" "}
                for {banDuration === "permanent" ? "permanently" : `${banDuration} hours`}.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBanDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleBanUser}>
              Confirm Ban
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}