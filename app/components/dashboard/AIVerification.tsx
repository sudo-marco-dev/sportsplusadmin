import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { MetricCard } from "./MetricCard";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Progress } from "../ui/progress";
import { Checkbox } from "../ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Shield, 
  Search,
  Settings,
  Clock,
  MapPin,
  Bot,
  TrendingUp,
  Users,
  AlertCircle,
  Mail
} from "lucide-react";
import { toast } from "sonner@2.0.3";

interface VerificationRecord {
  id: string;
  playerName: string;
  event: string;
  status: "verified" | "unverified" | "suspicious";
  confidence: number;
  lastChecked: string;
  location: string;
  distance: number;
}

const mockVerificationData: VerificationRecord[] = [
  {
    id: "1",
    playerName: "Alex Johnson",
    event: "Summer League Match #42",
    status: "verified",
    confidence: 95,
    lastChecked: "2 mins ago",
    location: "Central Park Field 3",
    distance: 45
  },
  {
    id: "2",
    playerName: "Sarah Mitchell",
    event: "Winter Cup Qualifier",
    status: "suspicious",
    confidence: 32,
    lastChecked: "5 mins ago",
    location: "Unknown (GPS spoofing detected)",
    distance: 2400
  },
  {
    id: "3",
    playerName: "Marcus Williams",
    event: "Spring Tournament Round 1",
    status: "unverified",
    confidence: 68,
    lastChecked: "12 mins ago",
    location: "Riverside Sports Complex",
    distance: 850
  },
  {
    id: "4",
    playerName: "Emily Chen",
    event: "Fall Championship Semi",
    status: "verified",
    confidence: 92,
    lastChecked: "15 mins ago",
    location: "Downtown Arena",
    distance: 78
  },
  {
    id: "5",
    playerName: "David Martinez",
    event: "Friendly Match #15",
    status: "suspicious",
    confidence: 28,
    lastChecked: "18 mins ago",
    location: "Location mismatch detected",
    distance: 3200
  },
  {
    id: "6",
    playerName: "Jessica Taylor",
    event: "Summer League Match #43",
    status: "verified",
    confidence: 89,
    lastChecked: "20 mins ago",
    location: "Central Park Field 3",
    distance: 120
  },
  {
    id: "7",
    playerName: "Ryan Anderson",
    event: "Winter Cup Main Event",
    status: "unverified",
    confidence: 55,
    lastChecked: "25 mins ago",
    location: "Northside Recreation Center",
    distance: 650
  },
  {
    id: "8",
    playerName: "Olivia Brown",
    event: "Spring Tournament Round 2",
    status: "verified",
    confidence: 98,
    lastChecked: "30 mins ago",
    location: "Riverside Sports Complex",
    distance: 32
  }
];

interface AILog {
  id: string;
  timestamp: string;
  action: string;
  player: string;
  result: string;
  type: "auto" | "manual" | "override";
}

const mockAILogs: AILog[] = [
  {
    id: "1",
    timestamp: "2025-10-29 14:32",
    action: "Auto Verification",
    player: "Alex Johnson",
    result: "✓ Verified - 95% confidence",
    type: "auto"
  },
  {
    id: "2",
    timestamp: "2025-10-29 14:28",
    action: "Suspicious Activity Alert",
    player: "Sarah Mitchell",
    result: "⚠ Warning sent - GPS spoofing detected",
    type: "auto"
  },
  {
    id: "3",
    timestamp: "2025-10-29 14:15",
    action: "Manual Override",
    player: "Marcus Williams",
    result: "✓ Admin approved despite distance",
    type: "override"
  },
  {
    id: "4",
    timestamp: "2025-10-29 14:10",
    action: "Auto Ban Triggered",
    player: "David Martinez",
    result: "🚫 User banned - repeated violations",
    type: "auto"
  },
  {
    id: "5",
    timestamp: "2025-10-29 13:55",
    action: "Batch Verification",
    player: "Multiple (12 players)",
    result: "✓ All verified for Summer League",
    type: "auto"
  }
];

export function AIVerification() {
  const [verificationData, setVerificationData] = useState(mockVerificationData);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedRecord, setSelectedRecord] = useState<VerificationRecord | null>(null);
  const [showOverrideDialog, setShowOverrideDialog] = useState(false);
  const [showBulkWarningDialog, setShowBulkWarningDialog] = useState(false);
  const [bulkWarningTarget, setBulkWarningTarget] = useState<"suspicious" | "unverified">("suspicious");
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  
  // Automation settings
  const [autoBanEnabled, setAutoBanEnabled] = useState(false);
  const [distanceThreshold, setDistanceThreshold] = useState("500");
  const [autoWarningEnabled, setAutoWarningEnabled] = useState(true);
  const [confidenceThreshold, setConfidenceThreshold] = useState("70");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <Badge className="bg-green-500 text-white hover:bg-green-600 gap-1">
            <CheckCircle2 className="h-3 w-3" />
            Verified
          </Badge>
        );
      case "unverified":
        return (
          <Badge className="bg-yellow-500 text-white hover:bg-yellow-600 gap-1">
            <AlertTriangle className="h-3 w-3" />
            Unverified
          </Badge>
        );
      case "suspicious":
        return (
          <Badge className="bg-red-500 text-white hover:bg-red-600 gap-1">
            <XCircle className="h-3 w-3" />
            Suspicious
          </Badge>
        );
      default:
        return null;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "bg-green-500";
    if (confidence >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const handleManualReview = (record: VerificationRecord) => {
    setSelectedRecord(record);
    setShowOverrideDialog(true);
  };

  const handleOverride = (approved: boolean) => {
    if (selectedRecord) {
      toast.success(
        approved 
          ? `${selectedRecord.playerName} verification approved`
          : `${selectedRecord.playerName} verification rejected`
      );
      setShowOverrideDialog(false);
      setSelectedRecord(null);
    }
  };

  const handleRunVerification = (playerId: string) => {
    toast.info("Running AI verification...", {
      description: "This may take a few seconds"
    });
    
    setTimeout(() => {
      toast.success("Verification complete!", {
        description: "Results updated"
      });
    }, 2000);
  };

  const handleSendWarning = (playerName: string) => {
    toast.success(`Warning sent to ${playerName}`, {
      description: "Player has been notified about suspicious activity"
    });
  };

  const handleBulkWarning = (target: "suspicious" | "unverified") => {
    setBulkWarningTarget(target);
    setShowBulkWarningDialog(true);
  };

  const confirmBulkWarning = () => {
    const count = verificationData.filter(r => r.status === bulkWarningTarget).length;
    toast.success(`Warning sent to ${count} ${bulkWarningTarget} player(s)`, {
      description: "All affected players have been notified"
    });
    setShowBulkWarningDialog(false);
  };

  const filteredData = verificationData.filter(record => {
    const matchesSearch = 
      record.playerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.event.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || record.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const verifiedCount = verificationData.filter(r => r.status === "verified").length;
  const unverifiedCount = verificationData.filter(r => r.status === "unverified").length;
  const suspiciousCount = verificationData.filter(r => r.status === "suspicious").length;

  const averageConfidence = Math.round(
    verificationData.reduce((sum, r) => sum + r.confidence, 0) / verificationData.length
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2>AI-Powered Auto Verification</h2>
              <p className="text-muted-foreground">
                Automatically verify player locations and detect suspicious activity
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Total Verified" 
          value={verifiedCount.toString()} 
          icon={CheckCircle2} 
          trend={`${Math.round((verifiedCount / verificationData.length) * 100)}%`}
          trendUp 
        />
        <MetricCard 
          title="Pending Checks" 
          value={unverifiedCount.toString()} 
          icon={Clock} 
          trend="Needs review"
          trendUp={false}
        />
        <MetricCard 
          title="Suspicious Alerts" 
          value={suspiciousCount.toString()} 
          icon={AlertCircle} 
          trend="High priority"
          trendUp={false}
        />
        <MetricCard 
          title="Avg. Confidence" 
          value={`${averageConfidence}%`} 
          icon={TrendingUp} 
          trend="+5% this week"
          trendUp
        />
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="review" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="review">AI Review Panel</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="logs">Logs & History</TabsTrigger>
        </TabsList>

        {/* AI Review Panel Tab */}
        <TabsContent value="review" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Verification Review Panel</CardTitle>
                  <CardDescription>
                    Monitor and review AI verification results
                  </CardDescription>
                </div>
                <Button onClick={() => toast.success("Running batch verification...")}>
                  <Shield className="h-4 w-4 mr-2" />
                  Run Batch Verification
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by player or event..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="verified">Verified Only</SelectItem>
                    <SelectItem value="unverified">Unverified Only</SelectItem>
                    <SelectItem value="suspicious">Suspicious Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Bulk Actions */}
              {(suspiciousCount > 0 || unverifiedCount > 0) && (
                <div className="flex flex-wrap gap-3 p-4 bg-muted/50 rounded-lg border">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Bulk Warning Actions:</span>
                  </div>
                  <div className="flex gap-2">
                    {suspiciousCount > 0 && (
                      <Button 
                        variant="destructive"
                        size="sm"
                        onClick={() => handleBulkWarning("suspicious")}
                        className="gap-2"
                      >
                        <AlertTriangle className="h-4 w-4" />
                        Warn All Suspicious ({suspiciousCount})
                      </Button>
                    )}
                    {unverifiedCount > 0 && (
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={() => handleBulkWarning("unverified")}
                        className="gap-2 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-500/20 border-yellow-200 dark:border-yellow-800"
                      >
                        <AlertCircle className="h-4 w-4" />
                        Warn All Unverified ({unverifiedCount})
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {/* Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Player Name</TableHead>
                      <TableHead>Event</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>AI Confidence</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Last Checked</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                          No verification records found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredData.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              {record.playerName}
                            </div>
                          </TableCell>
                          <TableCell>{record.event}</TableCell>
                          <TableCell>{getStatusBadge(record.status)}</TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-sm">{record.confidence}%</span>
                              </div>
                              <Progress 
                                value={record.confidence} 
                                className="h-2"
                                indicatorClassName={getConfidenceColor(record.confidence)}
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-start gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                              <div className="space-y-0.5">
                                <p className="text-sm">{record.location}</p>
                                <p className="text-xs text-muted-foreground">
                                  {record.distance}m from event
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {record.lastChecked}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              {(record.status === "suspicious" || record.status === "unverified") && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleSendWarning(record.playerName)}
                                  className={`gap-2 ${
                                    record.status === "suspicious"
                                      ? "bg-red-500/10 text-red-700 dark:text-red-400 hover:bg-red-500/20 border-red-200 dark:border-red-800"
                                      : "bg-orange-500/10 text-orange-700 dark:text-orange-400 hover:bg-orange-500/20 border-orange-200 dark:border-orange-800"
                                  }`}
                                >
                                  <Mail className="h-4 w-4" />
                                  Warn
                                </Button>
                              )}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRunVerification(record.id)}
                              >
                                Re-verify
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleManualReview(record)}
                              >
                                Review
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Automation Settings Tab */}
        <TabsContent value="automation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Automation Options
              </CardTitle>
              <CardDescription>
                Configure automated verification and response behaviors
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Auto Ban Settings */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <Label className="text-base">Auto Ban High-Risk Users</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically ban users with repeated suspicious activity
                    </p>
                  </div>
                  <Switch
                    checked={autoBanEnabled}
                    onCheckedChange={setAutoBanEnabled}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <Label className="text-base">Auto Warning Messages</Label>
                    <p className="text-sm text-muted-foreground">
                      Send automatic warnings when suspicious activity is detected
                    </p>
                  </div>
                  <Switch
                    checked={autoWarningEnabled}
                    onCheckedChange={setAutoWarningEnabled}
                  />
                </div>
              </div>

              {/* Threshold Settings */}
              <div className="space-y-4">
                <h4 className="text-sm">Verification Thresholds</h4>
                
                <div className="space-y-2">
                  <Label>Distance Threshold</Label>
                  <Select value={distanceThreshold} onValueChange={setDistanceThreshold}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="100">100m - Very Strict</SelectItem>
                      <SelectItem value="500">500m - Strict (Recommended)</SelectItem>
                      <SelectItem value="1000">1km - Moderate</SelectItem>
                      <SelectItem value="2000">2km - Lenient</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Maximum distance from event location for automatic verification
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Minimum Confidence Score</Label>
                  <Select value={confidenceThreshold} onValueChange={setConfidenceThreshold}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="90">90% - Very High</SelectItem>
                      <SelectItem value="80">80% - High</SelectItem>
                      <SelectItem value="70">70% - Moderate (Recommended)</SelectItem>
                      <SelectItem value="60">60% - Low</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Minimum AI confidence required for automatic approval
                  </p>
                </div>
              </div>

              {/* Re-verification Settings */}
              <div className="space-y-4">
                <h4 className="text-sm">Re-verification Schedule</h4>
                
                <div className="space-y-2">
                  <Label>Periodic Re-verification</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time (During events only)</SelectItem>
                      <SelectItem value="hourly">Every Hour</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="manual">Manual Only</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    How often to re-verify active users
                  </p>
                </div>
              </div>

              <Button 
                className="w-full"
                onClick={() => toast.success("Automation settings saved successfully")}
              >
                Save Automation Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Logs & History Tab */}
        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Verification Logs</CardTitle>
              <CardDescription>
                Recent verification results, actions taken, and admin overrides
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockAILogs.map((log) => (
                  <div 
                    key={log.id} 
                    className="flex items-start gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${
                      log.type === "auto" ? "bg-blue-500/10 text-blue-500" :
                      log.type === "manual" ? "bg-purple-500/10 text-purple-500" :
                      "bg-orange-500/10 text-orange-500"
                    }`}>
                      <Bot className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm">{log.action}</p>
                        <Badge variant="outline" className="text-xs">
                          {log.type === "auto" ? "Automated" : 
                           log.type === "manual" ? "Manual" : "Override"}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{log.player}</p>
                      <p className="text-sm">{log.result}</p>
                    </div>
                    <div className="text-xs text-muted-foreground shrink-0">
                      {log.timestamp}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Override Dialog */}
      <AlertDialog open={showOverrideDialog} onOpenChange={setShowOverrideDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Manual Review Override</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedRecord && (
                <div className="space-y-3 mt-4">
                  <div>
                    <span className="text-sm">Player: </span>
                    <span className="text-sm">{selectedRecord.playerName}</span>
                  </div>
                  <div>
                    <span className="text-sm">Event: </span>
                    <span className="text-sm">{selectedRecord.event}</span>
                  </div>
                  <div>
                    <span className="text-sm">Current Status: </span>
                    {getStatusBadge(selectedRecord.status)}
                  </div>
                  <div>
                    <span className="text-sm">AI Confidence: </span>
                    <span className="text-sm">{selectedRecord.confidence}%</span>
                  </div>
                  <div>
                    <span className="text-sm">Location: </span>
                    <span className="text-sm">{selectedRecord.location}</span>
                  </div>
                  <div>
                    <span className="text-sm">Distance: </span>
                    <span className="text-sm">{selectedRecord.distance}m from event</span>
                  </div>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => handleOverride(false)}>
              Reject Verification
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => handleOverride(true)}>
              Approve Override
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk Warning Dialog */}
      <AlertDialog open={showBulkWarningDialog} onOpenChange={setShowBulkWarningDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bulk Warning Confirmation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to send a warning to all {bulkWarningTarget} players?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowBulkWarningDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              toast.success(`Warnings sent to ${bulkWarningTarget} players`);
              setShowBulkWarningDialog(false);
            }}>
              Send Warnings
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}