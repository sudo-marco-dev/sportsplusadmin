import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, Activity, Users, Flag } from "lucide-react";

const activeUsersData = [
  { date: "Sep 1", users: 1200 },
  { date: "Sep 8", users: 1450 },
  { date: "Sep 15", users: 1680 },
  { date: "Sep 22", users: 1920 },
  { date: "Sep 29", users: 2150 },
  { date: "Oct 6", users: 2380 },
];

const participationRateData = [
  { month: "May", rate: 65 },
  { month: "Jun", rate: 71 },
  { month: "Jul", rate: 68 },
  { month: "Aug", rate: 74 },
  { month: "Sep", rate: 79 },
  { month: "Oct", rate: 82 },
];

const topReportedData = [
  { user: "player_toxic", reports: 12 },
  { user: "user_spam", reports: 9 },
  { user: "coach_inappropriate", reports: 7 },
  { user: "player_cheater", reports: 6 },
  { user: "user_harassment", reports: 5 },
];

const resolutionTimeData = [
  { category: "User Misconduct", avgHours: 4.2 },
  { category: "Match Issue", avgHours: 2.8 },
  { category: "System Bug", avgHours: 6.5 },
  { category: "Other", avgHours: 3.1 },
];

export function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h2>Analytics</h2>
        <p className="text-muted-foreground">Platform statistics and insights.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Growth Rate</p>
                <h3>+18.5%</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <Activity className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Active Rate</p>
                <h3>82%</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Retention</p>
                <h3>91.2%</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-500/10 rounded-lg">
                <Flag className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Avg Resolution</p>
                <h3>4.2h</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Users Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Active Users Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={activeUsersData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-sm" />
                <YAxis className="text-sm" />
                <Tooltip />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.2}
                  name="Active Users"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Event Participation Rate */}
        <Card>
          <CardHeader>
            <CardTitle>Event Participation Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={participationRateData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-sm" />
                <YAxis className="text-sm" />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Participation %"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Reported Users */}
        <Card>
          <CardHeader>
            <CardTitle>Top Reported Users</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topReportedData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis type="number" className="text-sm" />
                <YAxis dataKey="user" type="category" className="text-sm" width={120} />
                <Tooltip />
                <Legend />
                <Bar dataKey="reports" fill="#ef4444" name="Reports" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Resolution Times */}
        <Card>
          <CardHeader>
            <CardTitle>Average Resolution Time by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={resolutionTimeData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="category" className="text-sm" />
                <YAxis className="text-sm" />
                <Tooltip />
                <Legend />
                <Bar dataKey="avgHours" fill="#8b5cf6" name="Avg Hours" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
