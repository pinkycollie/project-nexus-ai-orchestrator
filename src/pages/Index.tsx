
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ServiceConnections } from "@/components/ServiceConnections";
import { ProjectOverview } from "@/components/ProjectOverview";
import { DeploymentStatus } from "@/components/DeploymentStatus";
import { AIConfiguration } from "@/components/AIConfiguration";
import { Settings, Zap, GitBranch, Database } from "lucide-react";

const Index = () => {
  const [connectedServices, setConnectedServices] = useState({
    github: false,
    vercel: false,
    supabase: false,
    neon: false,
  });

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">DevOps Manager</h1>
          <p className="text-xl text-muted-foreground">
            Unified dashboard for all your development services
          </p>
        </header>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="ai-config">AI Config</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">GitHub</CardTitle>
                  <GitBranch className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">Active repos</p>
                  <Badge variant={connectedServices.github ? "default" : "secondary"}>
                    {connectedServices.github ? "Connected" : "Disconnected"}
                  </Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Vercel</CardTitle>
                  <Zap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">Deployments</p>
                  <Badge variant={connectedServices.vercel ? "default" : "secondary"}>
                    {connectedServices.vercel ? "Connected" : "Disconnected"}
                  </Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Supabase</CardTitle>
                  <Database className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">Projects</p>
                  <Badge variant={connectedServices.supabase ? "default" : "secondary"}>
                    {connectedServices.supabase ? "Connected" : "Disconnected"}
                  </Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Neon</CardTitle>
                  <Settings className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground">Databases</p>
                  <Badge variant={connectedServices.neon ? "default" : "secondary"}>
                    {connectedServices.neon ? "Connected" : "Disconnected"}
                  </Badge>
                </CardContent>
              </Card>
            </div>

            <DeploymentStatus />
          </TabsContent>

          <TabsContent value="services">
            <ServiceConnections 
              connectedServices={connectedServices}
              setConnectedServices={setConnectedServices}
            />
          </TabsContent>

          <TabsContent value="projects">
            <ProjectOverview />
          </TabsContent>

          <TabsContent value="ai-config">
            <AIConfiguration />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
