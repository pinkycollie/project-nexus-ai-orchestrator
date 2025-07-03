
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ExternalLink, GitBranch, Globe, Database, Search } from "lucide-react";

export const ProjectOverview = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock project data
  const projects = [
    {
      id: 1,
      name: "E-commerce Dashboard",
      repo: "user/ecommerce-dashboard",
      vercelUrl: "https://ecommerce-dashboard.vercel.app",
      status: "deployed",
      lastDeploy: "2 hours ago",
      database: "Supabase",
      framework: "React + Vite",
    },
    {
      id: 2,
      name: "Blog Platform",
      repo: "user/blog-platform",
      vercelUrl: "https://blog-platform.vercel.app",
      status: "building",
      lastDeploy: "5 minutes ago",
      database: "Neon",
      framework: "Next.js",
    },
    {
      id: 3,
      name: "Portfolio Site",
      repo: "user/portfolio",
      vercelUrl: "https://portfolio.vercel.app",
      status: "failed",
      lastDeploy: "1 day ago",
      database: "None",
      framework: "React",
    },
  ];

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.repo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "deployed": return "default";
      case "building": return "secondary";
      case "failed": return "destructive";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button>
          Create New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{project.name}</CardTitle>
                <Badge variant={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
              </div>
              <CardDescription>{project.framework}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <GitBranch className="h-4 w-4" />
                  <span>{project.repo}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Database className="h-4 w-4" />
                  <span>{project.database}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Last deploy: {project.lastDeploy}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <GitBranch className="h-4 w-4 mr-2" />
                  GitHub
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Globe className="h-4 w-4 mr-2" />
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
