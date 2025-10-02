"use client";

import { ProjectForm, ProjectFormData } from "@/components/ui/ProjectForm";
import toast from "react-hot-toast";



export default  function AddProjectPage() {


  const handleSubmit = async (data: ProjectFormData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/project`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Project created successfully!");
    
        ;
      } else {
        throw new Error("Failed to create project");
      }
    } catch (error) {
      toast.error("Failed to create project. Please try again.");
      console.error("Project creation error:", error);
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Add New Project</h1>
        <p className="text-muted-foreground mt-2">
          Showcase your work by adding a new project to your portfolio.
        </p>
      </div>
      
      <ProjectForm  onSubmit={handleSubmit}/>
    </div>
  );
}