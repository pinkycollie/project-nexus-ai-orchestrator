
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Brain, Zap, Settings, Database } from "lucide-react";

export const AIConfiguration = () => {
  const { toast } = useToast();
  const [config, setConfig] = useState({
    provider: "",
    apiKey: "",
    model: "",
    autoOptimize: false,
    prompt: "Analyze my deployment and suggest optimizations",
  });

  const handleSave = () => {
    toast({
      title: "Configuration Saved",
      description: "AI configuration has been updated successfully",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            <CardTitle>AI Model Configuration</CardTitle>
          </div>
          <CardDescription>
            Configure AI models to analyze and optimize your deployments
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="provider">AI Provider</Label>
              <Select onValueChange={(value) => setConfig({...config, provider: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select AI provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="openai">OpenAI</SelectItem>
                  <SelectItem value="anthropic">Anthropic</SelectItem>
                  <SelectItem value="google">Google AI</SelectItem>
                  <SelectItem value="local">Local Model</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Select onValueChange={(value) => setConfig({...config, model: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                  <SelectItem value="claude-3">Claude 3</SelectItem>
                  <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="api-key">API Key</Label>
            <Input
              id="api-key"
              type="password"
              placeholder="Enter your AI provider API key"
              value={config.apiKey}
              onChange={(e) => setConfig({...config, apiKey: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="prompt">Default Optimization Prompt</Label>
            <Textarea
              id="prompt"
              placeholder="Enter the default prompt for AI optimization"
              value={config.prompt}
              onChange={(e) => setConfig({...config, prompt: e.target.value})}
              rows={3}
            />
          </div>

          <Button onClick={handleSave} className="w-full">
            <Settings className="h-4 w-4 mr-2" />
            Save Configuration
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            <CardTitle>AI Actions</CardTitle>
          </div>
          <CardDescription>
            Run AI-powered analysis and optimization tasks
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Brain className="h-6 w-6" />
              Analyze Projects
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Settings className="h-6 w-6" />
              Optimize Configs
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Zap className="h-6 w-6" />
              Auto Deploy
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Database className="h-6 w-6" />
              DB Optimization
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
