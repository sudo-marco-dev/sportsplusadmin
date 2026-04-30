import { 
  BookOpen, 
  LayoutDashboard, 
  Users, 
  Flag, 
  Shield, 
  BarChart3, 
  Settings as SettingsIcon,
  Lightbulb,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Keyboard,
  HelpCircle,
  Bot
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Separator } from "../ui/separator";

export function HelpGuide() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2">Help & Guide Center</h1>
        <p className="text-muted-foreground">
          Everything you need to know about managing the Sports+ platform
        </p>
      </div>

      {/* Quick Start Alert */}
      <Alert>
        <Lightbulb className="h-4 w-4" />
        <AlertTitle>New to Sports+ Admin?</AlertTitle>
        <AlertDescription>
          Start with the "Getting Started" section below to learn the basics of navigating and managing the platform.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="getting-started" className="space-y-4">
        <TabsList className="grid grid-cols-2 lg:grid-cols-4 gap-2 h-auto p-1">
          <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
          <TabsTrigger value="features">Features Guide</TabsTrigger>
          <TabsTrigger value="best-practices">Best Practices</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        {/* Getting Started Tab */}
        <TabsContent value="getting-started" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Welcome to Sports+ Admin Dashboard</CardTitle>
              <CardDescription>
                Your complete guide to becoming an effective Sports+ administrator
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3>What is the Admin Dashboard?</h3>
                <p className="text-muted-foreground">
                  The Sports+ Admin Dashboard is your central hub for managing users, teams, reports, 
                  and analytics for the Sports+ platform. As an administrator, you have the tools to 
                  maintain a healthy community, monitor platform activity, and make data-driven decisions.
                </p>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3>Your First Steps</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary">1</span>
                        </div>
                        <CardTitle className="text-base">Explore the Dashboard</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Familiarize yourself with the key metrics and recent activity on the main dashboard.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary">2</span>
                        </div>
                        <CardTitle className="text-base">Review Pending Reports</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Check the Reports section for any pending moderation actions that need attention.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary">3</span>
                        </div>
                        <CardTitle className="text-base">Customize Settings</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Set your preferences, enable dark mode, and configure notification settings.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary">4</span>
                        </div>
                        <CardTitle className="text-base">Monitor Analytics</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Track platform growth, user engagement, and team activity in the Analytics section.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3>Admin Responsibilities</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Content Moderation</p>
                      <p className="text-sm text-muted-foreground">
                        Review and respond to user reports promptly to maintain community standards
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">User Management</p>
                      <p className="text-sm text-muted-foreground">
                        Manage user accounts, roles, and permissions appropriately
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Team Oversight</p>
                      <p className="text-sm text-muted-foreground">
                        Monitor team activities and ensure compliance with platform policies
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Data Analysis</p>
                      <p className="text-sm text-muted-foreground">
                        Use analytics to identify trends and make informed platform decisions
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Features Guide Tab */}
        <TabsContent value="features" className="space-y-4">
          <Accordion type="single" collapsible className="space-y-2">
            {/* Dashboard Overview */}
            <AccordionItem value="dashboard" className="border rounded-lg px-4">
              <AccordionTrigger>
                <div className="flex items-center gap-3">
                  <LayoutDashboard className="h-5 w-5 text-primary" />
                  <span>Dashboard Overview</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <p className="text-muted-foreground">
                  The Dashboard provides a comprehensive overview of your platform's health and activity.
                </p>
                
                <div className="space-y-3">
                  <h4>Key Metrics Cards</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary" />
                      <span><strong>Total Users:</strong> Track your user base growth with percentage change indicators</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary" />
                      <span><strong>Active Teams:</strong> Monitor team participation and engagement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary" />
                      <span><strong>Reports:</strong> Keep track of pending moderation items</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary" />
                      <span><strong>Revenue:</strong> View financial performance metrics</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4>Interactive Charts</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary" />
                      <span><strong>User Growth:</strong> Line chart showing user acquisition trends over time</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary" />
                      <span><strong>Team Distribution:</strong> Bar chart displaying team categories and sizes</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4>Recent Activity</h4>
                  <p className="text-sm text-muted-foreground">
                    View real-time updates of user registrations, team creations, and report submissions. 
                    Click on any activity to navigate to the relevant section for more details.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* User Management */}
            <AccordionItem value="users" className="border rounded-lg px-4">
              <AccordionTrigger>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <span>User Management</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <p className="text-muted-foreground">
                  Manage all platform users, their roles, and account statuses.
                </p>
                
                <div className="space-y-3">
                  <h4>User Table Features</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary" />
                      <span><strong>Search:</strong> Find users by name or email instantly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary" />
                      <span><strong>Filter by Role:</strong> View users by Admin, User, or Moderator roles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary" />
                      <span><strong>Filter by Status:</strong> Show Active, Suspended, or Banned accounts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary" />
                      <span><strong>Pagination:</strong> Navigate through users with customizable page sizes</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4>User Actions</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary" />
                      <span><strong>View Details:</strong> Access comprehensive user profiles and activity history</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary" />
                      <span><strong>Edit User:</strong> Modify user information and settings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary" />
                      <span><strong>Suspend/Ban:</strong> Take disciplinary action when necessary</span>
                    </li>
                  </ul>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Important</AlertTitle>
                  <AlertDescription>
                    Always review user activity history before taking suspension or ban actions. Document your reasons for moderation decisions.
                  </AlertDescription>
                </Alert>
              </AccordionContent>
            </AccordionItem>

            {/* Report Management */}
            <AccordionItem value="reports" className="border rounded-lg px-4">
              <AccordionTrigger>
                <div className="flex items-center gap-3">
                  <Flag className="h-5 w-5 text-primary" />
                  <span>Report Management</span>
                  <Badge className="ml-2 bg-red-500 text-white">Critical</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <p className="text-muted-foreground">
                  Handle user-submitted reports to maintain community safety and platform integrity.
                </p>
                
                <div className="space-y-3">
                  <h4>Report Categories</h4>
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Badge variant="outline">Spam</Badge>
                      <span className="text-muted-foreground">Unwanted promotional or repetitive content</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Badge variant="outline">Harassment</Badge>
                      <span className="text-muted-foreground">Bullying, threats, or targeted abuse</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Badge variant="outline">Inappropriate Content</Badge>
                      <span className="text-muted-foreground">Offensive or unsuitable material</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Badge variant="outline">Other</Badge>
                      <span className="text-muted-foreground">Miscellaneous violations</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4>Report Workflow</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">1.</span>
                      <span><strong>Review:</strong> Read the report details and examine the reported content</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">2.</span>
                      <span><strong>Investigate:</strong> Check user history and context around the incident</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">3.</span>
                      <span><strong>Decide:</strong> Determine appropriate action (dismiss, warn, suspend, or ban)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">4.</span>
                      <span><strong>Action:</strong> Apply the decision and notify relevant parties</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">5.</span>
                      <span><strong>Document:</strong> Add notes explaining your decision for future reference</span>
                    </li>
                  </ul>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Best Practice</AlertTitle>
                  <AlertDescription>
                    Aim to resolve reports within 24 hours. Prioritize harassment and safety-related reports first.
                  </AlertDescription>
                </Alert>
              </AccordionContent>
            </AccordionItem>

            {/* Team Management */}
            <AccordionItem value="teams" className="border rounded-lg px-4">
              <AccordionTrigger>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>Team Management</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <p className="text-muted-foreground">
                  Monitor and manage teams across different sports categories.
                </p>
                
                <div className="space-y-3">
                  <h4>Team Overview</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary" />
                      <span>View team statistics including member count and activity level</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary" />
                      <span>Search teams by name or filter by sport category</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary" />
                      <span>Monitor team creation dates and growth trends</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4>Team Actions</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary" />
                      <span><strong>View Team:</strong> Access detailed team information and member list</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary" />
                      <span><strong>Edit Team:</strong> Modify team details and settings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary" />
                      <span><strong>Manage Members:</strong> Add or remove team members as needed</span>
                    </li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* AI Verification */}
            <AccordionItem value="ai-verification" className="border rounded-lg px-4">
              <AccordionTrigger>
                <div className="flex items-center gap-3">
                  <Bot className="h-5 w-5 text-primary" />
                  <span>AI-Powered Auto Verification</span>
                  <Badge className="ml-2 bg-purple-500 text-white">New</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <p className="text-muted-foreground">
                  Automatically verify player GPS locations and detect suspicious activity using AI technology.
                </p>
                
                <div className="space-y-3">
                  <h4>What is AI Verification?</h4>
                  <p className="text-sm text-muted-foreground">
                    The AI Verification system automatically checks if a player's GPS location matches the expected 
                    event or team area. It analyzes location proximity, frequency of mismatches, and consistency 
                    between claimed playtime and GPS activity logs to assign verification statuses.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4>Verification Status Badges</h4>
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Badge className="bg-green-500 text-white">🟢 Verified</Badge>
                      <span className="text-muted-foreground">Player location is consistent with others in the same game</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Badge className="bg-yellow-500 text-white">🟡 Unverified</Badge>
                      <span className="text-muted-foreground">Data incomplete or slightly mismatched</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Badge className="bg-red-500 text-white">🔴 Suspicious</Badge>
                      <span className="text-muted-foreground">Location far from participants or shows GPS spoofing signs</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4>AI Review Panel Features</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary" />
                      <span><strong>Confidence Score:</strong> 0-100% AI confidence displayed with colored progress bars</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary" />
                      <span><strong>Manual Review:</strong> Option to manually review or override AI decisions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary" />
                      <span><strong>Location Data:</strong> View player's location and distance from event</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary" />
                      <span><strong>Re-verification:</strong> Run verification checks again on specific players</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4>Automation Options</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary" />
                      <span><strong>Auto Ban:</strong> Automatically ban users with repeated suspicious activity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary" />
                      <span><strong>Distance Threshold:</strong> Set maximum acceptable distance (100m to 2km)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary" />
                      <span><strong>Auto Warnings:</strong> Send automatic warning messages when suspicious activity detected</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary" />
                      <span><strong>Re-verification Schedule:</strong> Configure periodic re-checks (real-time to weekly)</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4>AI Logs & History</h4>
                  <p className="text-sm text-muted-foreground">
                    View recent verification results, actions taken, and admin overrides for transparency. 
                    Logs include timestamps, event references, and action types (automated, manual, or override).
                  </p>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Integration Note</AlertTitle>
                  <AlertDescription>
                    Verification badges appear beside player names throughout the dashboard including Reports, 
                    User Management, and Map sections. Use these badges for quick reference during moderation decisions.
                  </AlertDescription>
                </Alert>
              </AccordionContent>
            </AccordionItem>

            {/* Analytics */}
            <AccordionItem value="analytics" className="border rounded-lg px-4">
              <AccordionTrigger>
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <span>Analytics</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <p className="text-muted-foreground">
                  Gain insights into platform performance and user behavior.
                </p>
                
                <div className="space-y-3">
                  <h4>Available Charts</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary" />
                      <span><strong>User Growth:</strong> Track user acquisition over 6 months</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary" />
                      <span><strong>Active Users:</strong> Monitor daily and monthly active user trends</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary" />
                      <span><strong>Team Activity:</strong> View team creation and participation rates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary" />
                      <span><strong>Report Trends:</strong> Analyze moderation workload patterns</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4>Using Analytics Effectively</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Look for unusual spikes or drops that may indicate issues</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Compare month-over-month growth to track platform health</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Use data to make informed decisions about features and policies</span>
                    </li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Settings */}
            <AccordionItem value="settings" className="border rounded-lg px-4">
              <AccordionTrigger>
                <div className="flex items-center gap-3">
                  <SettingsIcon className="h-5 w-5 text-primary" />
                  <span>Settings</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <p className="text-muted-foreground">
                  Customize your admin experience and manage account preferences.
                </p>
                
                <div className="space-y-3">
                  <h4>Profile Settings</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary" />
                      <span>Update your name, email, and contact information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary" />
                      <span>Change your password regularly for security</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary" />
                      <span>Set your timezone for accurate timestamps</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4>Appearance Settings</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary" />
                      <span><strong>Dark Mode:</strong> Toggle between light and dark themes for comfortable viewing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary" />
                      <span><strong>Language:</strong> Select your preferred interface language</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4>Notification Settings</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary" />
                      <span>Configure email notifications for new reports</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary" />
                      <span>Enable push notifications for critical alerts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary" />
                      <span>Set quiet hours to avoid notifications during off-hours</span>
                    </li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>

        {/* Best Practices Tab */}
        <TabsContent value="best-practices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Administrator Best Practices</CardTitle>
              <CardDescription>
                Guidelines for effective and responsible platform administration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3>Moderation Principles</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <Lightbulb className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Be Consistent</p>
                      <p className="text-sm text-muted-foreground">
                        Apply rules and policies uniformly to all users. Inconsistent moderation damages trust and credibility.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <Lightbulb className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Stay Objective</p>
                      <p className="text-sm text-muted-foreground">
                        Make decisions based on facts and platform policies, not personal opinions or biases.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <Lightbulb className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Document Everything</p>
                      <p className="text-sm text-muted-foreground">
                        Keep detailed notes of your moderation decisions. This helps with appeals and ensures accountability.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <Lightbulb className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Respond Promptly</p>
                      <p className="text-sm text-muted-foreground">
                        Address reports and issues quickly. Delayed responses can escalate problems and frustrate users.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3>Security Practices</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Use Strong Passwords</p>
                      <p className="text-sm text-muted-foreground">
                        Your admin account has elevated privileges. Use a unique, complex password and change it regularly.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Enable Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to protect your account from unauthorized access.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Log Out When Done</p>
                      <p className="text-sm text-muted-foreground">
                        Always log out after your admin session, especially on shared or public computers.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Monitor Access Logs</p>
                      <p className="text-sm text-muted-foreground">
                        Regularly review login activity to detect any suspicious access attempts.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3>Communication Guidelines</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Be Professional</p>
                      <p className="text-sm text-muted-foreground">
                        Maintain a professional tone in all communications, even when dealing with difficult users.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Be Transparent</p>
                      <p className="text-sm text-muted-foreground">
                        Clearly explain moderation decisions and cite specific policy violations when taking action.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Protect User Privacy</p>
                      <p className="text-sm text-muted-foreground">
                        Never share private user information publicly or with unauthorized parties.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3>Keyboard Shortcuts</h3>
                <p className="text-sm text-muted-foreground">
                  Speed up your workflow with these keyboard shortcuts:
                </p>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                    <span className="text-sm">Global Search</span>
                    <Badge variant="outline" className="gap-1">
                      <Keyboard className="h-3 w-3" />
                      Ctrl + K
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                    <span className="text-sm">Toggle Dark Mode</span>
                    <Badge variant="outline" className="gap-1">
                      <Keyboard className="h-3 w-3" />
                      Ctrl + Shift + D
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                    <span className="text-sm">Go to Dashboard</span>
                    <Badge variant="outline" className="gap-1">
                      <Keyboard className="h-3 w-3" />
                      Ctrl + 1
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                    <span className="text-sm">Go to Reports</span>
                    <Badge variant="outline" className="gap-1">
                      <Keyboard className="h-3 w-3" />
                      Ctrl + 3
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* FAQ Tab */}
        <TabsContent value="faq" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Quick answers to common admin questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-2">
                <AccordionItem value="faq-1" className="border-b">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-start gap-2">
                      <HelpCircle className="h-4 w-4 mt-1 text-primary" />
                      <span>How do I prioritize which reports to handle first?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Prioritize reports in this order: 1) Harassment and safety threats, 2) Spam affecting multiple users, 
                    3) Inappropriate content, 4) Other violations. The badge count on the Reports menu shows pending items 
                    that need attention.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-2" className="border-b">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-start gap-2">
                      <HelpCircle className="h-4 w-4 mt-1 text-primary" />
                      <span>Can I undo a ban or suspension?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes, go to User Management, find the user, and click "Edit" to modify their status. Always document 
                    the reason for reversing the action. Consider if a warning or reduced penalty is more appropriate.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-3" className="border-b">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-start gap-2">
                      <HelpCircle className="h-4 w-4 mt-1 text-primary" />
                      <span>What should I do if I'm unsure about a moderation decision?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Consult with other administrators before taking action. Document the situation and seek guidance 
                    from senior admins or review platform policies. It's better to take time to make the right decision 
                    than to act hastily.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-4" className="border-b">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-start gap-2">
                      <HelpCircle className="h-4 w-4 mt-1 text-primary" />
                      <span>How often should I check the analytics?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Review analytics at least weekly to track platform health. Look for unusual patterns that might 
                    indicate technical issues or abuse. Monthly deep dives help with strategic planning and identifying 
                    long-term trends.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-5" className="border-b">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-start gap-2">
                      <HelpCircle className="h-4 w-4 mt-1 text-primary" />
                      <span>What's the difference between suspending and banning a user?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    A suspension is temporary and can have a set duration (e.g., 7 days). The user can return after the 
                    period ends. A ban is permanent and prevents the user from accessing the platform. Use suspensions 
                    for first-time or moderate violations, bans for severe or repeated violations.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-6" className="border-b">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-start gap-2">
                      <HelpCircle className="h-4 w-4 mt-1 text-primary" />
                      <span>How do I export data or reports?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Use the "Export" buttons available in each section (User Management, Teams, Analytics). You can 
                    export data as CSV files for further analysis or record-keeping. Always handle exported data 
                    securely as it may contain sensitive information.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-7" className="border-b">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-start gap-2">
                      <HelpCircle className="h-4 w-4 mt-1 text-primary" />
                      <span>Can users appeal moderation decisions?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes, users can submit appeals through the support system. Appeals appear in the Reports section with 
                    a special "Appeal" category. Review the original decision and any new evidence provided before making 
                    a final determination.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-8">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-start gap-2">
                      <HelpCircle className="h-4 w-4 mt-1 text-primary" />
                      <span>Who can I contact if I need help with the admin dashboard?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    For technical issues, contact the development team at dev@sportsplus.com. For policy questions or 
                    moderation guidance, reach out to senior administrators. You can also use the feedback form in 
                    Settings to report bugs or suggest improvements.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertTitle>Still have questions?</AlertTitle>
            <AlertDescription>
              Contact the admin support team or check the full documentation portal for more detailed guides and tutorials.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  );
}
