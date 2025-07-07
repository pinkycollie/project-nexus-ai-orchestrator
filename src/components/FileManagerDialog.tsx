import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { FileText, Folder, Code, Brain, Sparkles, Plus, ChevronLeft, ChevronRight } from "lucide-react";

interface FileManagerDialogProps {
  children: React.ReactNode;
}

export const FileManagerDialog = ({ children }: FileManagerDialogProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [fileData, setFileData] = useState({
    type: "",
    name: "",
    path: "",
    content: "",
    template: "",
    aiSuggestion: "",
  });

  const fileTemplates = {
    component: {
      name: "React Component",
      content: `import { useState } from "react";

interface Props {
  // Define your props here
}

export const ComponentName = ({ }: Props) => {
  return (
    <div>
      {/* Your component content */}
    </div>
  );
};`,
    },
    hook: {
      name: "Custom Hook",
      content: `import { useState, useEffect } from "react";

export const useCustomHook = () => {
  const [state, setState] = useState();

  useEffect(() => {
    // Your effect logic
  }, []);

  return { state, setState };
};`,
    },
    util: {
      name: "Utility Function",
      content: `/**
 * Utility function description
 */
export const utilityFunction = () => {
  // Your utility logic
  return;
};`,
    },
    config: {
      name: "Configuration File",
      content: `export const config = {
  // Your configuration options
};`,
    },
  };

  const getAiSuggestion = async (type: string, name: string) => {
    // Simulate AI suggestion based on context
    const suggestions = {
      component: `Based on your project structure, consider adding props for data handling and use semantic HTML elements. Include proper TypeScript interfaces.`,
      hook: `This hook should follow React hooks conventions. Consider adding cleanup in useEffect and proper dependency arrays.`,
      util: `Make this function pure and add proper JSDoc comments. Consider error handling and type safety.`,
      config: `Keep configuration values environment-specific and consider validation schemas.`,
      folder: `Organize files logically. Consider grouping by feature rather than file type for better scalability.`,
    };

    return suggestions[type as keyof typeof suggestions] || "Consider best practices for maintainable code.";
  };

  const handleTypeSelect = async (type: string) => {
    setFileData({ ...fileData, type });
    
    if (type !== "folder") {
      const suggestion = await getAiSuggestion(type, fileData.name);
      setFileData(prev => ({ ...prev, aiSuggestion: suggestion }));
    }
    
    setStep(2);
  };

  const handleNameChange = async (name: string) => {
    setFileData({ ...fileData, name });
    
    if (fileData.type && fileData.type !== "folder") {
      const suggestion = await getAiSuggestion(fileData.type, name);
      setFileData(prev => ({ ...prev, aiSuggestion: suggestion }));
    }
  };

  const handleTemplateSelect = (template: string) => {
    const templateContent = fileTemplates[template as keyof typeof fileTemplates]?.content || "";
    setFileData({ ...fileData, template, content: templateContent });
    setStep(4);
  };

  const handleCreate = () => {
    // Here you would implement the actual file creation logic
    // This could integrate with Working Copy, file system APIs, or backend scripts
    
    toast({
      title: "File Created",
      description: `${fileData.type === "folder" ? "Folder" : "File"} "${fileData.name}" created successfully`,
    });
    
    // Reset and close
    setFileData({
      type: "",
      name: "",
      path: "",
      content: "",
      template: "",
      aiSuggestion: "",
    });
    setStep(1);
    setOpen(false);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2">What would you like to create?</h3>
              <p className="text-muted-foreground">Choose the type of file or folder</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-20 flex-col gap-2"
                onClick={() => handleTypeSelect("component")}
              >
                <Code className="h-6 w-6" />
                React Component
              </Button>
              
              <Button
                variant="outline"
                className="h-20 flex-col gap-2"
                onClick={() => handleTypeSelect("hook")}
              >
                <Sparkles className="h-6 w-6" />
                Custom Hook
              </Button>
              
              <Button
                variant="outline"
                className="h-20 flex-col gap-2"
                onClick={() => handleTypeSelect("util")}
              >
                <FileText className="h-6 w-6" />
                Utility
              </Button>
              
              <Button
                variant="outline"
                className="h-20 flex-col gap-2"
                onClick={() => handleTypeSelect("folder")}
              >
                <Folder className="h-6 w-6" />
                Folder
              </Button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2">Name your {fileData.type}</h3>
              <Badge variant="secondary">{fileData.type}</Badge>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder={`Enter ${fileData.type} name`}
                  value={fileData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  autoFocus
                />
              </div>
              
              <div>
                <Label htmlFor="path">Path (optional)</Label>
                <Input
                  id="path"
                  placeholder="src/components/"
                  value={fileData.path}
                  onChange={(e) => setFileData({ ...fileData, path: e.target.value })}
                />
              </div>

              {fileData.aiSuggestion && (
                <Card className="bg-accent">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Brain className="h-4 w-4" />
                      AI Insight
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    {fileData.aiSuggestion}
                  </CardContent>
                </Card>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(1)}>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
              <Button 
                onClick={() => fileData.type === "folder" ? setStep(4) : setStep(3)}
                disabled={!fileData.name}
                className="flex-1"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2">Choose a template</h3>
              <Badge variant="secondary">{fileData.name}</Badge>
            </div>
            
            <div className="grid gap-3">
              {Object.entries(fileTemplates).map(([key, template]) => (
                <Card 
                  key={key}
                  className="cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => handleTemplateSelect(key)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">{template.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    <code className="bg-muted p-1 rounded text-xs">
                      {template.content.slice(0, 60)}...
                    </code>
                  </CardContent>
                </Card>
              ))}
              
              <Button 
                variant="outline" 
                onClick={() => setStep(4)}
                className="mt-2"
              >
                Skip Template (Empty File)
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(2)}>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2">Review & Create</h3>
              <Badge variant="secondary">{fileData.name}</Badge>
            </div>
            
            {fileData.type !== "folder" && (
              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  className="min-h-[200px] font-mono text-sm"
                  value={fileData.content}
                  onChange={(e) => setFileData({ ...fileData, content: e.target.value })}
                  placeholder="Enter file content..."
                />
              </div>
            )}
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div><strong>Type:</strong> {fileData.type}</div>
                <div><strong>Name:</strong> {fileData.name}</div>
                <div><strong>Path:</strong> {fileData.path || "root"}</div>
                {fileData.template && <div><strong>Template:</strong> {fileData.template}</div>}
              </CardContent>
            </Card>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(fileData.type === "folder" ? 2 : 3)}>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
              <Button onClick={handleCreate} className="flex-1">
                Create {fileData.type}
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create File or Folder
          </DialogTitle>
          <DialogDescription>
            Step {step} of 4 - AI-assisted file and folder creation
          </DialogDescription>
        </DialogHeader>
        
        {renderStep()}
      </DialogContent>
    </Dialog>
  );
};