"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit2, Trash2, Eye, ExternalLink, Github } from "lucide-react";
import { Project } from "@/types/project";
import { EditProjectModal } from "./edit-project-modal";
import { ProjectFormData } from "@/types/project";
import toast from "react-hot-toast";


interface ProjectsTableProps {
  projects: Project[];
}

export function ProjectsTable({ projects }: ProjectsTableProps) {
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isDeleteLoading, setIsDeleteLoading] = useState<number | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
  };

  const handleSave = async (id: number, data: ProjectFormData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/project/update/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success('Project updated successfully!');
  
      } else {
        throw new Error('Failed to update project');
      }
    } catch (error) {
      toast.error('Failed to update project. Please try again.');
      throw error;
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      return;
    }

    setIsDeleteLoading(id);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/project/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Project deleted successfully!');

      } else {
        throw new Error('Failed to delete project');
      }
    } catch (error) {
      toast.error('Failed to delete project. Please try again.');
    } finally {
      setIsDeleteLoading(null);
    }
  };

  return (
    <>
      <div className="rounded-md border">
        <Table >
          <TableHeader>
            <TableRow>
              <TableHead>Thumbnail</TableHead>
              <TableHead>Project Name</TableHead>
              <TableHead>Links</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>
                  <div className="w-16 h-12 rounded-md overflow-hidden border">
                    <img
                      src={project.thumbnail}
                      alt={project.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                      }}
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  <div className="max-w-[150px]">
                    <div className="line-clamp-2 font-semibold">{project.name}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="h-8 w-8 p-0"
                    >
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="h-8 w-8 p-0"
                    >
                      <a href={project.projectLink} target="_blank" rel="noopener noreferrer">
                        <Github className="h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-muted-foreground">
                    {formatDate(project.createdAt)}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(project)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(project.id)}
                      disabled={isDeleteLoading === project.id}
                    >
                      {isDeleteLoading === project.id ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-current" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <EditProjectModal
        project={editingProject}
        isOpen={!!editingProject}
        onClose={() => setEditingProject(null)}
        onSave={handleSave}
      />
    </>
  );
}