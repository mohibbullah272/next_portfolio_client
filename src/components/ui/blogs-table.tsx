"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit2, Trash2, Eye, Calendar } from "lucide-react";
import { Blog } from "@/types/blog";

import { BlogFormData } from "@/types/blog";
import toast from "react-hot-toast";
import { EditBlogModal } from "../edit-blog-modal";

interface BlogsTableProps {
  blogs: Blog[];
}

export function BlogsTable({ blogs }: BlogsTableProps) {
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
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

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
  };

  const handleSave = async (id: number, data: BlogFormData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/blog/update/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success('Blog updated successfully!');
        window.location.reload(); 
      } else {
        throw new Error('Failed to update blog');
      }
    } catch (error) {
      toast.error('Failed to update blog. Please try again.');
      throw error;
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this blog? This action cannot be undone.')) {
      return;
    }

    setIsDeleteLoading(id);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/blog/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Blog deleted successfully!');
        window.location.reload();
      } else {
        throw new Error('Failed to delete blog');
      }
    } catch (error) {
      toast.error('Failed to delete blog. Please try again.');
    } finally {
      setIsDeleteLoading(null);
    }
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Thumbnail</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Content Preview</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <div className="w-12 h-12 rounded-md overflow-hidden border">
                    <img
                      src={blog.thumbnail}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                      }}
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium max-w-[200px]">
                  <div className="line-clamp-2">{blog.title}</div>
                </TableCell>
                <TableCell className="max-w-[300px]">
                  <div className="line-clamp-2 text-sm text-muted-foreground">
                    {truncateText(blog.content, 100)}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                    <Eye className="h-3 w-3" />
                    {blog.viewCount}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {formatDate(blog.createdAt)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-muted-foreground">
                    {formatDate(blog.updatedAt)}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(blog)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(blog.id)}
                      disabled={isDeleteLoading === blog.id}
                    >
                      {isDeleteLoading === blog.id ? (
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

      <EditBlogModal
        blog={editingBlog}
        isOpen={!!editingBlog}
        onClose={() => setEditingBlog(null)}
        onSave={handleSave}
      />
    </>
  );
}