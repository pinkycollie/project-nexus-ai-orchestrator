
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { GitBranch, Zap, Database, Settings, Check, X } from "lucide-react";

interface ServiceConnectionsProps {
  connectedServices: {
    github: boolean;
    vercel: boolean;
    supabase: boolean;
    neon: boolean;
  };
  setConnectedServices: (services: any) => void;
}

export const ServiceConnections = ({ connectedServices, setConnectedServices }: ServiceConnectionsProps) => {
  const { toast } = useToast();
  const [tokens, setTokens] = useState({
    github: "",
    vercel: "",
    supabase: "",
    neon: "",
  });

  const handleConnect = async (service: string) => {
    if (!tokens[service as keyof typeof tokens]) {
      toast({
        title: "Error",
        description: "Please enter your API token/key",
        variant: "destructive",
      });
      return;
    }

    // Simulate API connection
    setTimeout(() => {
      setConnectedServices({
        ...connectedServices,
        [service]: true,
      });
      toast({
        title: "Success",
        description: `${service.charAt(0).toUpperCase() + service.slice(1)} connected successfully!`,
      });
    }, 1000);
  };

  const handleDisconnect = (service: string) => {
    setConnectedServices({
      ...connectedServices,
      [service]: false,
    });
    setTokens({
      ...tokens,
      [service]: "",
    });
    toast({
      title: "Disconnected",
      description: `${service.charAt(0).toUpperCase() + service.slice(1)} disconnected`,
    });
  };

  const services = [
    {
      key: "github",
      name: "GitHub",
      icon: GitBranch,
      description: "Connect to your GitHub repositories",
      placeholder: "GitHub Personal Access Token",
    },
    {
      key: "vercel",
      name: "Vercel",
      icon: Zap,
      description: "Manage your Vercel deployments",
      placeholder: "Vercel API Token",
    },
    {
      key: "supabase",
      name: "Supabase",
      icon: Database,
      description: "Connect to your Supabase projects",
      placeholder: "Supabase Access Token",
    },
    {
      key: "neon",
      name: "Neon",
      icon: Settings,
      description: "Manage your Neon databases",
      placeholder: "Neon API Key",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {services.map((service) => {
        const Icon = service.icon;
        const isConnected = connectedServices[service.key as keyof typeof connectedServices];
        
        return (
          <Card key={service.key}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5" />
                  <CardTitle>{service.name}</CardTitle>
                </div>
                <Badge variant={isConnected ? "default" : "secondary"}>
                  {isConnected ? (
                    <><Check className="h-3 w-3 mr-1" /> Connected</>
                  ) : (
                    <><X className="h-3 w-3 mr-1" /> Not Connected</>
                  )}
                </Badge>
              </div>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isConnected ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor={`${service.key}-token`}>API Token</Label>
                    <Input
                      id={`${service.key}-token`}
                      type="password"
                      placeholder={service.placeholder}
                      value={tokens[service.key as keyof typeof tokens]}
                      onChange={(e) => setTokens({
                        ...tokens,
                        [service.key]: e.target.value,
                      })}
                    />
                  </div>
                  <Button 
                    onClick={() => handleConnect(service.key)}
                    className="w-full"
                  >
                    Connect {service.name}
                  </Button>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="text-green-600 font-medium">
                    ✓ Successfully connected to {service.name}
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => handleDisconnect(service.key)}
                    className="w-full"
                  >
                    Disconnect
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
