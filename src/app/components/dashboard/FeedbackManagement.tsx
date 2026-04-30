import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { MessageSquare, Star, Eye, CheckCircle, ThumbsUp, ThumbsDown } from "lucide-react";
import { toast } from "sonner";

const initialFeedback = [
  {
    id: "FDB-001",
    user: "john_doe",
    category: "Feature Request",
    rating: 5,
    status: "Pending",
    date: "2025-10-05 14:30",
    subject: "Add Live Match Streaming",
    message: "It would be great to have live streaming for matches so spectators can watch remotely.",
    helpful: 12,
  },
  {
    id: "FDB-002",
    user: "player_emma",
    category: "Bug Report",
    rating: 3,
    status: "In Progress",
    date: "2025-10-05 11:20",
    subject: "Calendar Sync Issues",
    message: "The calendar doesn't sync properly with my Google Calendar. Events appear 1 hour late.",
    helpful: 8,
  },
  {
    id: "FDB-003",
    user: "player_chris",
    category: "General Feedback",
    rating: 5,
    status: "Resolved",
    date: "2025-10-04 16:45",
    subject: "Great Platform!",
    message: "Love the new team management features. Makes organizing games so much easier!",
    helpful: 25,
  },
  {
    id: "FDB-004",
    user: "sarah_player",
    category: "Feature Request",
    rating: 4,
    status: "Pending",
    date: "2025-10-04 09:15",
    subject: "Mobile App Needed",
    message: "A dedicated mobile app would make this platform even better. The mobile web version is okay but native app would be ideal.",
    helpful: 18,
  },
  {
    id: "FDB-005",
    user: "mike_athlete",
    category: "Improvement",
    rating: 4,
    status: "Pending",
    date: "2025-10-03 20:10",
    subject: "Notification Settings",
    message: "Would love more granular notification settings. Sometimes I get too many notifications about things I don't care about.",
    helpful: 15,
  },
  {
    id: "FDB-006",
    user: "alex_player",
    category: "Bug Report",
    rating: 2,
    status: "In Progress",
    date: "2025-10-03 15:30",
    subject: "Payment Processing Slow",
    message: "Payment confirmations are taking too long. Waited 2 hours for my membership payment to process.",
    helpful: 6,
  },
  {
    id: "FDB-007",
    user: "jessica_user",
    category: "General Feedback",
    rating: 5,
    status: "Resolved",
    date: "2025-10-02 12:00",
    subject: "Excellent Customer Support",
    message: "Had an issue with my account and support team resolved it within 24 hours. Amazing service!",
    helpful: 20,
  },
  {
    id: "FDB-008",
    user: "david_player",
    category: "Feature Request",
    rating: 4,
    status: "Pending",
    date: "2025-10-01 18:25",
    subject: "Team Chat Feature",
    message: "Would be awesome to have a built-in team chat so we don't have to use external apps to communicate.",
    helpful: 22,
  },
];

export function FeedbackManagement() {
  const [feedback, setFeedback] = useState(initialFeedback);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedFeedback, setSelectedFeedback] = useState<typeof initialFeedback[0] | null>(null);
  const [adminResponse, setAdminResponse] = useState("");

  const filteredFeedback = feedback.filter(item => {
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    return matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return <Badge className="bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-500/20">Pending</Badge>;
      case "In Progress":
        return <Badge className="bg-blue-500/10 text-blue-700 dark:text-blue-400 hover:bg-blue-500/20">In Progress</Badge>;
      case "Resolved":
        return <Badge className="bg-green-500/10 text-green-700 dark:text-green-400 hover:bg-green-500/20">Resolved</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Feature Request":
        return "text-blue-600 dark:text-blue-400";
      case "Bug Report":
        return "text-red-600 dark:text-red-400";
      case "Improvement":
        return "text-purple-600 dark:text-purple-400";
      case "General Feedback":
        return "text-green-600 dark:text-green-400";
      default:
        return "text-muted-foreground";
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300 dark:text-gray-600"
            }`}
          />
        ))}
      </div>
    );
  };

  const handleMarkInProgress = (feedbackId: string) => {
    setFeedback(feedback.map(item =>
      item.id === feedbackId ? { ...item, status: "In Progress" } : item
    ));
    toast.info(`Feedback ${feedbackId} marked as in progress`);
  };

  const handleResolve = (feedbackId: string) => {
    setFeedback(feedback.map(item =>
      item.id === feedbackId ? { ...item, status: "Resolved" } : item
    ));
    toast.success(`Feedback ${feedbackId} has been marked as resolved`);
    setSelectedFeedback(null);
    setAdminResponse("");
  };

  const handleSendResponse = (feedbackId: string) => {
    if (!adminResponse.trim()) {
      toast.error("Please enter a response");
      return;
    }
    toast.success("Response sent to user");
    setAdminResponse("");
  };

  const handleMarkHelpful = (feedbackId: string) => {
    setFeedback(feedback.map(item =>
      item.id === feedbackId ? { ...item, helpful: item.helpful + 1 } : item
    ));
    toast.success("Marked as helpful");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2>Feedback Management</h2>
        <p className="text-muted-foreground">Review and respond to user feedback and suggestions.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Total Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{feedback.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-yellow-600 dark:text-yellow-400">
              {feedback.filter(f => f.status === "Pending").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-blue-600 dark:text-blue-400">
              {feedback.filter(f => f.status === "In Progress").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Avg Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">
              {(feedback.reduce((acc, f) => acc + f.rating, 0) / feedback.length).toFixed(1)} ⭐
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Feature Request">Feature Request</SelectItem>
            <SelectItem value="Bug Report">Bug Report</SelectItem>
            <SelectItem value="Improvement">Improvement</SelectItem>
            <SelectItem value="General Feedback">General Feedback</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Feedback Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredFeedback.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <MessageSquare className={`h-4 w-4 ${getCategoryColor(item.category)}`} />
                    <CardTitle className="text-base">{item.id}</CardTitle>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.category}</p>
                </div>
                {getStatusBadge(item.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="mb-1">{item.subject}</h4>
                <p className="text-sm text-muted-foreground line-clamp-2">{item.message}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {renderStars(item.rating)}
                  </div>
                  <p className="text-xs text-muted-foreground">by {item.user}</p>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{item.helpful}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2 border-t">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2"
                  onClick={() => setSelectedFeedback(item)}
                >
                  <Eye className="h-4 w-4" />
                  View Details
                </Button>
                {item.status === "Pending" && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleMarkInProgress(item.id)}
                  >
                    Mark In Progress
                  </Button>
                )}
                {item.status !== "Resolved" && (
                  <Button 
                    size="sm" 
                    className="gap-2"
                    onClick={() => handleResolve(item.id)}
                  >
                    <CheckCircle className="h-4 w-4" />
                    Resolve
                  </Button>
                )}
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => handleMarkHelpful(item.id)}
                >
                  <ThumbsUp className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Feedback Detail Dialog */}
      <Dialog open={!!selectedFeedback} onOpenChange={() => setSelectedFeedback(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Feedback Details - {selectedFeedback?.id}</DialogTitle>
            <DialogDescription>
              Review feedback and send a response to the user.
            </DialogDescription>
          </DialogHeader>
          {selectedFeedback && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p>{selectedFeedback.category}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <div className="mt-1">{getStatusBadge(selectedFeedback.status)}</div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">User</p>
                  <p>{selectedFeedback.user}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rating</p>
                  <div className="mt-1">{renderStars(selectedFeedback.rating)}</div>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">Submitted</p>
                  <p>{selectedFeedback.date}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">Helpful Votes</p>
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="h-4 w-4 text-green-600" />
                    <span>{selectedFeedback.helpful} users found this helpful</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Subject</p>
                <p className="p-3 bg-muted rounded-lg">{selectedFeedback.subject}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Message</p>
                <p className="text-sm p-3 bg-muted rounded-lg">{selectedFeedback.message}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Admin Response</p>
                <Textarea
                  placeholder="Write your response to the user..."
                  value={adminResponse}
                  onChange={(e) => setAdminResponse(e.target.value)}
                  rows={4}
                />
              </div>

              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => setSelectedFeedback(null)}>
                  Close
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleSendResponse(selectedFeedback.id)}
                >
                  Send Response
                </Button>
                {selectedFeedback.status === "Pending" && (
                  <Button 
                    variant="outline"
                    onClick={() => {
                      handleMarkInProgress(selectedFeedback.id);
                      setSelectedFeedback({ ...selectedFeedback, status: "In Progress" });
                    }}
                  >
                    Mark In Progress
                  </Button>
                )}
                {selectedFeedback.status !== "Resolved" && (
                  <Button 
                    className="gap-2"
                    onClick={() => handleResolve(selectedFeedback.id)}
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
    </div>
  );
}
