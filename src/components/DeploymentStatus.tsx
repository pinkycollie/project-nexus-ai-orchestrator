
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";

export const DeploymentStatus = () => {
  const deployments = [
    {
      id: 1,
      project: "E-commerce Dashboard",
      status: "success",
      progress: 100,
      time: "2m 34s",
      branch: "main",
      commit: "feat: add payment integration",
    },
    {
      id: 2,
      project: "Blog Platform",
      status: "building",
      progress: 67,
      time: "1m 12s",
      branch: "develop",
      commit: "fix: resolve build issues",
    },
    {
      id: 3,
      project: "Portfolio Site",
      status: "failed",
      progress: 0,
      time: "0m 45s",
      branch: "main",
      commit: "update: portfolio content",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "building": return <Clock className="h-4 w-4 text-blue-500" />;
      case "failed": return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "success": return "default";
      case "building": return "secondary";
      case "failed": return "destructive";
      default: return "secondary";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Deployments</CardTitle>
        <CardDescription>Latest deployment activity across all projects</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {deployments.map((deployment) => (
            <div key={deployment.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3 flex-1">
                {getStatusIcon(deployment.status)}
                <div className="flex-1">
                  <div className="font-medium">{deployment.project}</div>
                  <div className="text-sm text-muted-foreground truncate">
                    {deployment.commit}
                  </div>
                  {deployment.status === "building" && (
                    <Progress value={deployment.progress} className="mt-2 h-2" />
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <Badge variant={getStatusVariant(deployment.status)}>
                    {deployment.status}
                  </Badge>
                  <div className="text-sm text-muted-foreground mt-1">
                    {deployment.time}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
