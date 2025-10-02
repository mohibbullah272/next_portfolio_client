import React from 'react';

import { Blog } from '@/types/blog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BlogsTable } from '@/components/ui/blogs-table';

const ManageBlogs = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/blog`, {
    next: {revalidate:2 }
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch blogs');
  }
  
  const blogs: Blog[] = await res.json();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Blogs</h1>
          <p className="text-muted-foreground mt-2">
            Create, edit, and manage your blog posts
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/Add-blog">
            <Plus className="h-4 w-4 mr-2" />
            New Blog Post
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Blog Posts ({blogs.length})
          </CardTitle>
          <CardDescription>
            All your published blog posts. You can edit or delete them from here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {blogs.length > 0 ? (
            <BlogsTable blogs={blogs} />
          ) : (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold">No blog posts yet</h3>
              <p className="text-muted-foreground mt-2 mb-6">
                Get started by creating your first blog post.
              </p>
              <Button asChild>
                <Link href="/add-blog">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Blog
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageBlogs;