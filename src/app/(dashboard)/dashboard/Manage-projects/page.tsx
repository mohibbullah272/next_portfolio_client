import React from 'react';

import { Project } from '@/types/project';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderOpen, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ProjectsTable } from '@/components/ui/projects-table';

const ManageProjects = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/project`, {
    next: {revalidate:2 }
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch projects');
  }
  
  const projects: Project[] = await res.json();

  return (
    <div className="space-y-6 max-w-7xl mx-auto my-5">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Projects</h1>
          <p className="text-muted-foreground mt-2">
            Create, edit, and manage your portfolio projects
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/Add-projects">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5" />
            Projects ({projects.length})
          </CardTitle>
          <CardDescription>
            All your portfolio projects. You can edit or delete them from here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {projects.length > 0 ? (
            <ProjectsTable projects={projects} />
          ) : (
            <div className="text-center py-12">
              <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold">No projects yet</h3>
              <p className="text-muted-foreground mt-2 mb-6">
                Get started by adding your first project to showcase.
              </p>
              <Button asChild>
                <Link href="/dashboard/Add-projects">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Project
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageProjects;