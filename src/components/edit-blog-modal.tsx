"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { BlogFormData, Blog } from "@/types/blog";
import { Loader2 } from "lucide-react";
import { BlogForm } from "./ui/AddBlogForm";

interface EditBlogModalProps {
  blog: Blog | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: number, data: BlogFormData) => Promise<void>;
}

export function EditBlogModal({ blog, isOpen, onClose, onSave }: EditBlogModalProps) {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (data: BlogFormData) => {
    if (!blog) return;
    
    setIsSaving(true);
    try {
      await onSave(blog.id, data);
      onClose();
    } catch (error) {
      console.error("Error updating blog:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Blog Post</DialogTitle>
          <DialogDescription>
            Update your blog post information. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        
        {blog && (
          <BlogForm
            initialData={blog}
            isEditing={true}
            onSubmit={handleSave}
          />
        )}
        
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={onClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button 
            onClick={() => document.querySelector('form')?.requestSubmit()}
            disabled={isSaving}
          >
            {isSaving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}