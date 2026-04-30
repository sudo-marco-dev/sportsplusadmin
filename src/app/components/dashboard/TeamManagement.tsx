import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Shield, Users, Trophy, Trash2, BarChart3 } from "lucide-react";
import { toast } from "sonner";

const initialTeams = [
  {
    id: 1,
    name: "Thunder Warriors",
    members: 12,
    captain: "john_doe",
    wins: 24,
    losses: 8,
    status: "Active",
  },
  {
    id: 2,
    name: "Phoenix United",
    members: 15,
    captain: "sarah_player",
    wins: 18,
    losses: 12,
    status: "Active",
  },
  {
    id: 3,
    name: "Dragon Force",
    members: 10,
    captain: "player_chris",
    wins: 30,
    losses: 5,
    status: "Active",
  },
  {
    id: 4,
    name: "Storm Chasers",
    members: 8,
    captain: "player_alex",
    wins: 12,
    losses: 15,
    status: "Inactive",
  },
  {
    id: 5,
    name: "Lightning Strikers",
    members: 14,
    captain: "player_jessica",
    wins: 21,
    losses: 9,
    status: "Active",
  },
  {
    id: 6,
    name: "Titan Champions",
    members: 11,
    captain: "player_david",
    wins: 27,
    losses: 6,
    status: "Active",
  },
];

export function TeamManagement() {
  const [teams, setTeams] = useState(initialTeams);

  const handleRegisterTeam = () => {
    toast.info("Register team feature coming soon!");
  };

  const handleViewStats = (teamName: string) => {
    toast.info(`Viewing stats for ${teamName}`);
  };

  const handleDisbandTeam = (teamId: number, teamName: string) => {
    setTeams(teams.filter(team => team.id !== teamId));
    toast.success(`Team "${teamName}" has been disbanded`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-500/10 text-green-700 dark:text-green-400 hover:bg-green-500/20">Active</Badge>;
      case "Inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Team Management</h2>
          <p className="text-muted-foreground">Manage registered teams and their information.</p>
        </div>
        <Button className="gap-2" onClick={handleRegisterTeam}>
          <Shield className="h-4 w-4" />
          Register New Team
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Total Teams</p>
                <h3>{teams.length}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Active Teams</p>
                <h3>{teams.filter(t => t.status === "Active").length}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <Trophy className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Total Members</p>
                <h3>{teams.reduce((sum, team) => sum + team.members, 0)}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-500/10 rounded-lg">
                <BarChart3 className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Avg Win Rate</p>
                <h3>68%</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Teams Table */}
      <Card>
        <CardHeader>
          <CardTitle>Registered Teams</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Team Name</TableHead>
                  <TableHead>Members</TableHead>
                  <TableHead>Captain</TableHead>
                  <TableHead>Record (W-L)</TableHead>
                  <TableHead>Win Rate</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teams.map((team) => {
                  const totalGames = team.wins + team.losses;
                  const winRate = totalGames > 0 ? ((team.wins / totalGames) * 100).toFixed(1) : "0.0";
                  
                  return (
                    <TableRow key={team.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-primary" />
                          {team.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          {team.members}
                        </div>
                      </TableCell>
                      <TableCell>{team.captain}</TableCell>
                      <TableCell>
                        <span className="text-green-600 dark:text-green-400">{team.wins}</span>
                        {" - "}
                        <span className="text-red-600 dark:text-red-400">{team.losses}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden max-w-[100px]">
                            <div 
                              className="h-full bg-green-500" 
                              style={{ width: `${winRate}%` }}
                            />
                          </div>
                          <span className="text-sm">{winRate}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(team.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={() => handleViewStats(team.name)}
                          >
                            <BarChart3 className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={() => handleDisbandTeam(team.id, team.name)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}