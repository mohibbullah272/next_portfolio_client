"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { ProjectFormData, Project } from "@/types/project";
import { Loader2 } from "lucide-react";
import { ProjectForm } from "./ProjectForm";

interface EditProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: number, data: ProjectFormData) => Promise<void>;
}

export function EditProjectModal({ project, isOpen, onClose, onSave }: EditProjectModalProps) {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (data: ProjectFormData) => {
    if (!project) return;
    
    setIsSaving(true);
    try {
      await onSave(project.id, data);
      onClose();
    } catch (error) {
      console.error("Error updating project:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
          <DialogDescription>
            Update your project information. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        
        {project && (
          <ProjectForm
            initialData={project}
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