import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { User, Bell, Shield, Palette } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface SettingsProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export function Settings({ darkMode, onToggleDarkMode }: SettingsProps) {
  const [name, setName] = useState("Admin User");
  const [email, setEmail] = useState("admin@sportsplus.com");
  const [password, setPassword] = useState("");
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("utc");
  const [notifyReports, setNotifyReports] = useState(true);
  const [notifyRegistrations, setNotifyRegistrations] = useState(true);
  const [notifyEvents, setNotifyEvents] = useState(false);
  const [notifySystem, setNotifySystem] = useState(true);
  const [autoBan, setAutoBan] = useState(false);

  const handleUpdateProfile = () => {
    toast.success("Profile updated successfully!");
  };

  const handleEditCategory = (category: string) => {
    toast.info(`Editing ${category} category (feature coming soon)`);
  };

  const handleAddCategory = () => {
    toast.info("Add new category (feature coming soon)");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2>Settings</h2>
        <p className="text-muted-foreground">Manage your account and platform settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <CardTitle>Profile Settings</CardTitle>
            </div>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button className="w-full" onClick={handleUpdateProfile}>
              Update Profile
            </Button>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              <CardTitle>Appearance</CardTitle>
            </div>
            <CardDescription>Customize the look and feel</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Dark Mode</Label>
                <p className="text-sm text-muted-foreground">Toggle dark mode theme</p>
              </div>
              <Switch checked={darkMode} onCheckedChange={onToggleDarkMode} />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label>Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Timezone</Label>
              <Select value={timezone} onValueChange={setTimezone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="est">EST</SelectItem>
                  <SelectItem value="pst">PST</SelectItem>
                  <SelectItem value="cet">CET</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              <CardTitle>Notifications</CardTitle>
            </div>
            <CardDescription>Configure notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>New Reports</Label>
                <p className="text-sm text-muted-foreground">Get notified about new reports</p>
              </div>
              <Switch checked={notifyReports} onCheckedChange={setNotifyReports} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>User Registrations</Label>
                <p className="text-sm text-muted-foreground">Alerts for new user signups</p>
              </div>
              <Switch checked={notifyRegistrations} onCheckedChange={setNotifyRegistrations} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>Event Updates</Label>
                <p className="text-sm text-muted-foreground">Notifications about event changes</p>
              </div>
              <Switch checked={notifyEvents} onCheckedChange={setNotifyEvents} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>System Alerts</Label>
                <p className="text-sm text-muted-foreground">Critical system notifications</p>
              </div>
              <Switch checked={notifySystem} onCheckedChange={setNotifySystem} />
            </div>
          </CardContent>
        </Card>

        {/* Permissions & Roles */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <CardTitle>Permissions & Roles</CardTitle>
            </div>
            <CardDescription>Manage role configurations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Report Categories</Label>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 border rounded">
                  <span>User Misconduct</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEditCategory("User Misconduct")}
                  >
                    Edit
                  </Button>
                </div>
                <div className="flex items-center justify-between p-2 border rounded">
                  <span>Match Issue</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEditCategory("Match Issue")}
                  >
                    Edit
                  </Button>
                </div>
                <div className="flex items-center justify-between p-2 border rounded">
                  <span>System Bug</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEditCategory("System Bug")}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleAddCategory}
            >
              Add New Category
            </Button>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-ban for severe reports</Label>
                <p className="text-sm text-muted-foreground">Automatically ban after 5 severe reports</p>
              </div>
              <Switch checked={autoBan} onCheckedChange={setAutoBan} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
