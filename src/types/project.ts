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

export interface Project {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
  features: string[];
  technology: string[];
  projectLink: string;
  liveLink: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}