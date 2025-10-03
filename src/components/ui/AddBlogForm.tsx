"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Plus, Upload, FileText, Eye } from "lucide-react";
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
import { z } from "zod";

export const blogFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title must be less than 200 characters"),
  content: z.string().min(100, "Content must be at least 100 characters").max(10000, "Content must be less than 10000 characters"),
  thumbnail: z.string().url("Please enter a valid URL").min(1, "Thumbnail URL is required"),
});

export type BlogFormData = z.infer<typeof blogFormSchema>;
interface BlogFormProps {
  className?: string;
  onSubmit?: (data: BlogFormData) => Promise<void>;
  initialData?: Partial<BlogFormData>;
  isEditing?: boolean;
}

export function BlogForm({
  className,
  onSubmit,
  initialData,
  isEditing = false,
}: BlogFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BlogFormData>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: initialData || {
      title: "",
      content: "",
      thumbnail: "",
    },
  });

  const handleSubmit = async (data: BlogFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit?.(data);
   
    } catch (error) {
      console.error("Error submitting blog:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card className="bg-background/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {isEditing ? "Edit Blog Post" : "Create New Blog Post"}
          </CardTitle>
          <CardDescription>
            {isEditing 
              ? "Update your blog post with new content and images."
              : "Share your knowledge and insights with the world by creating a new blog post."
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
              {/* Blog Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Blog Title
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter an engaging blog title..." 
                        {...field} 
                        className="bg-background/50"
                      />
                    </FormControl>
                    <FormDescription>
                      Write a compelling title that captures readers' attention.
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
                      Featured Image URL
                    </FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Input 
                          placeholder="https://example.com/blog-image.jpg" 
                          {...field} 
                          className="bg-background/50"
                        />
                        {field.value && (
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <div className="w-16 h-12 border rounded overflow-hidden flex-shrink-0">
                              <img 
                                src={field.value} 
                                alt="Blog thumbnail preview" 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                }}
                              />
                            </div>
                            <span>Image preview - Make sure your image URL is accessible</span>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription>
                      Add a high-quality featured image that represents your blog content.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Blog Content */}
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Blog Content
                    </FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Textarea
                          placeholder="Write your blog content here... Share your insights, experiences, and knowledge with your readers."
                          className="min-h-[300px] resize-none bg-background/50 font-mono text-sm"
                          {...field}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>
                            {field.value.length}/10000 characters
                          </span>
                          <span>
                            Minimum 100 characters required
                          </span>
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Write comprehensive content that provides value to your readers.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                      {isEditing ? "Updating Blog..." : "Publishing Blog..."}
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      {isEditing ? "Update Blog Post" : "Publish Blog Post"}
                    </>
                  )}
                </Button>
                
                <div className="text-center text-sm text-muted-foreground">
                  {isEditing 
                    ? "Your changes will be visible to readers immediately after updating."
                    : "Your blog post will be published and visible to all readers."
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