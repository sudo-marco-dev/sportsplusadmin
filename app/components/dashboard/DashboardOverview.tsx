import { MetricCard } from "./MetricCard";
import { Users, Shield, Flag, UserCheck, Bot, AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { toast } from "sonner@2.0.3";

const userGrowthData = [
  { month: "Jan", users: 1200 },
  { month: "Feb", users: 1800 },
  { month: "Mar", users: 2400 },
  { month: "Apr", users: 3200 },
  { month: "May", users: 4100 },
  { month: "Jun", users: 5300 },
];

const reportTypesData = [
  { name: "User Misconduct", value: 35, color: "#3b82f6" },
  { name: "Match Issue", value: 28, color: "#8b5cf6" },
  { name: "System Bug", value: 22, color: "#ec4899" },
  { name: "Other", value: 15, color: "#6b7280" },
];

const eventParticipationData = [
  { event: "Summer League", participants: 450 },
  { event: "Winter Cup", participants: 380 },
  { event: "Spring Tournament", participants: 520 },
  { event: "Fall Championship", participants: 610 },
  { event: "Friendly Matches", participants: 290 },
];

interface DashboardOverviewProps {
  onNavigate: (page: string) => void;
}

export function DashboardOverview({ onNavigate }: DashboardOverviewProps) {
  const handleCreateEvent = () => {
    toast.info("Events feature coming soon!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2>Dashboard Overview</h2>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with Sports+ today.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Users" value="5,342" icon={Users} trend="+12.5%" trendUp />
        <MetricCard title="Total Teams" value="284" icon={Shield} trend="+8.3%" trendUp />
        <MetricCard title="Reports Received" value="48" icon={Flag} trend="+5 today" trendUp={false} />
        <MetricCard title="AI Verified Players" value="89%" icon={Bot} trend="Suspicious: 3" trendUp={false} />
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => onNavigate("reports")}
            >
              <Flag className="h-4 w-4" />
              Review Reports
            </Button>
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => onNavigate("ai-verification")}
            >
              <Bot className="h-4 w-4" />
              AI Verification
            </Button>
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => onNavigate("users")}
            >
              <Users className="h-4 w-4" />
              Manage Users
            </Button>
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => onNavigate("teams")}
            >
              <Shield className="h-4 w-4" />
              Manage Teams
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-sm" />
                <YAxis className="text-sm" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Report Types Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Report Types Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={reportTypesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {reportTypesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Team Participation Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Team Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={eventParticipationData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="event" className="text-sm" />
              <YAxis className="text-sm" />
              <Tooltip />
              <Legend />
              <Bar dataKey="participants" fill="#3b82f6" name="Active Members" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
