"use client";


import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { BlogForm, BlogFormData } from "@/components/ui/AddBlogForm";

export default function AddBlogPage() {
  const router = useRouter();

  const handleSubmit = async (data: BlogFormData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/blog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Blog published successfully!");
        router.push("/dashboard");
        router.refresh();
      } else {
        throw new Error("Failed to create blog");
      }
    } catch (error) {
      toast.error("Failed to publish blog. Please try again.");
      console.error("Blog creation error:", error);
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Write New Blog Post</h1>
        <p className="text-muted-foreground mt-2">
          Share your thoughts, knowledge, and experiences with the world.
        </p>
      </div>
      
      <BlogForm onSubmit={handleSubmit} />
    </div>
  );
}