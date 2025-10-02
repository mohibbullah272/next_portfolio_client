"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Plus, Trash2, Upload,  Code, Globe, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";

import { z } from "zod";

export const projectFormSchema = z.object({
  name: z.string().min(1, "Project name is required").max(100, "Name must be less than 100 characters"),
  description: z.string().min(10, "Description must be at least 10 characters").max(1000, "Description must be less than 1000 characters"),
  thumbnail: z.string().url("Please enter a valid URL").min(1, "Thumbnail URL is required"),
  features: z.array(z.string().min(1, "Feature cannot be empty")).min(1, "At least one feature is required").max(10, "Maximum 10 features allowed"),
  technology: z.array(z.string().min(1, "Technology cannot be empty")).min(1, "At least one technology is required").max(15, "Maximum 15 technologies allowed"),
  projectLink: z.string().url("Please enter a valid GitHub URL").min(1, "Project link is required"),
  liveLink: z.string().url("Please enter a valid live demo URL").min(1, "Live link is required"),
});

export type ProjectFormData = z.infer<typeof projectFormSchema>;
interface ProjectFormProps {
    className?: string;
    onSubmit?: (data: ProjectFormData) => Promise<void>;
    initialData?: Partial<ProjectFormData>;
    isEditing?: boolean;
}

export function ProjectForm({
    className,
    onSubmit,
    initialData,
    isEditing = false,
  }: ProjectFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newFeature, setNewFeature] = useState("");
  const [newTechnology, setNewTechnology] = useState("");

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      thumbnail: "",
      features: [],
      technology: [],
      projectLink: "",
      liveLink: "",
    },
  });

  const handleSubmit = async (data: ProjectFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit?.(data);
      form.reset()
    } catch (error) {
      console.error("Error submitting project:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addFeature = () => {
    if (newFeature.trim() && !form.getValues("features").includes(newFeature.trim())) {
      const currentFeatures = form.getValues("features");
      form.setValue("features", [...currentFeatures, newFeature.trim()]);
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    const currentFeatures = form.getValues("features");
    form.setValue(
      "features",
      currentFeatures.filter((_, i) => i !== index)
    );
  };

  const addTechnology = () => {
    if (newTechnology.trim() && !form.getValues("technology").includes(newTechnology.trim())) {
      const currentTechnologies = form.getValues("technology");
      form.setValue("technology", [...currentTechnologies, newTechnology.trim()]);
      setNewTechnology("");
    }
  };

  const removeTechnology = (index: number) => {
    const currentTechnologies = form.getValues("technology");
    form.setValue(
      "technology",
      currentTechnologies.filter((_, i) => i !== index)
    );
  };

  const handleFeatureKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addFeature();
    }
  };

  const handleTechnologyKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTechnology();
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card className="bg-background/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {isEditing ? "Edit Project" : "Add New Project"}
          </CardTitle>
          <CardDescription>
            {isEditing 
              ? "Update your project details and showcase your work."
              : "Fill in the details below to add a new project to your portfolio."
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
              {/* Project Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Project Name
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter project name (e.g., E-Commerce Platform)" 
                        {...field} 
                        className="bg-background/50"
                      />
                    </FormControl>
                    <FormDescription>
                      Choose a descriptive name that represents your project.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your project, its purpose, and key functionalities..."
                        className="min-h-[120px] resize-none bg-background/50"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a comprehensive description of your project (10-500 characters).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Thumbnail URL */}
              <FormField
                control={form.control}
                name="thumbnail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      Thumbnail URL
                    </FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Input 
                          placeholder="https://example.com/project-thumbnail.jpg" 
                          {...field} 
                          className="bg-background/50"
                        />
                        {field.value && (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <div className="w-8 h-8 border rounded overflow-hidden">
                              <img 
                                src={field.value} 
                                alt="Thumbnail preview" 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                }}
                              />
                            </div>
                            Thumbnail preview
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription>
                      Enter the URL of your project thumbnail image.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Features */}
              <FormField
                control={form.control}
                name="features"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Key Features</FormLabel>
                    <FormControl>
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add a feature (e.g., User Authentication)"
                            value={newFeature}
                            onChange={(e) => setNewFeature(e.target.value)}
                            onKeyPress={handleFeatureKeyPress}
                            className="bg-background/50"
                          />
                          <Button
                            type="button"
                            size="sm"
                            onClick={addFeature}
                            disabled={!newFeature.trim()}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2 min-h-[40px]">
                          {field.value.map((feature, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="px-3 py-1 text-sm flex items-center gap-1"
                            >
                              {feature}
                              <button
                                type="button"
                                onClick={() => removeFeature(index)}
                                className="hover:text-destructive transition-colors"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Add the main features of your project. Press Enter or click the + button to add.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Technologies */}
              <FormField
                control={form.control}
                name="technology"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Technologies Used</FormLabel>
                    <FormControl>
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add a technology (e.g., React, Node.js)"
                            value={newTechnology}
                            onChange={(e) => setNewTechnology(e.target.value)}
                            onKeyPress={handleTechnologyKeyPress}
                            className="bg-background/50"
                          />
                          <Button
                            type="button"
                            size="sm"
                            onClick={addTechnology}
                            disabled={!newTechnology.trim()}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2 min-h-[40px]">
                          {field.value.map((tech, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="px-3 py-1 text-sm flex items-center gap-1 bg-primary/10"
                            >
                              {tech}
                              <button
                                type="button"
                                onClick={() => removeTechnology(index)}
                                className="hover:text-destructive transition-colors"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>
                      List all technologies, frameworks, and libraries used in this project.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Project Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="projectLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Code className="h-4 w-4" />
                        GitHub Repository
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://github.com/username/repository" 
                          {...field} 
                          className="bg-background/50"
                        />
                      </FormControl>
                      <FormDescription>
                        Link to your project's source code.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="liveLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Live Demo
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://your-project-demo.com" 
                          {...field} 
                          className="bg-background/50"
                        />
                      </FormControl>
                      <FormDescription>
                        Link to your live project demo.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Form Actions */}
              <div className="flex flex-col gap-4 pt-4">
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                      {isEditing ? "Updating Project..." : "Creating Project..."}
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      {isEditing ? "Update Project" : "Create Project"}
                    </>
                  )}
                </Button>
                
                <div className="text-center text-sm text-muted-foreground">
                  {isEditing 
                    ? "Make sure all information is accurate before updating."
                    : "Your project will be visible in your portfolio after creation."
                  }
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}