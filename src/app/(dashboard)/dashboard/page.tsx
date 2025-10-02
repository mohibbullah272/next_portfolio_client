import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
  }
  
  export interface Blog {
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    viewCount: number;
    createdAt: string;
    updatedAt: string;
  }
  
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
  
  export interface DashboardStats {
    users: number;
    blogs: number;
    projects: number;
    blogViews: number;
    projectViews: number;
    topBlogs: Blog[];
    topProjects: Project[];
    latestUsers: User[];
  }


import { 
  Users, 
  FileText, 
  FolderOpen, 
  Eye, 
  TrendingUp, 
  Calendar,
  ExternalLink,
  Github
} from 'lucide-react';
import Image from 'next/image';

const DashboardOverview = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/blog/stats`, {
    next: { revalidate: 300 } 
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch dashboard stats');
  }
  const data =await res.json()
  const stats: DashboardStats = data?.data;
  console.log(stats)
  // Format date function
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-6 my-5 px-5" >
      {/* Stats Grid */}
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className='bg-white/5 backdrop-blur-sm'>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-white font-bold">{stats.users}</div>
            <p className="text-xs text-muted-foreground">
              Registered users
            </p>
          </CardContent>
        </Card>

        <Card className='bg-white/5 backdrop-blur-sm'>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.blogs}</div>
            <p className="text-xs text-muted-foreground">
              {stats.blogViews} total views
            </p>
          </CardContent>
        </Card>

        <Card className='bg-white/5 backdrop-blur-sm'>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.projects}</div>
            <p className="text-xs text-muted-foreground">
              {stats.projectViews} total views
            </p>
          </CardContent>
        </Card>

        <Card className='bg-white/5 backdrop-blur-sm'>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.blogViews}</div>
            <p className="text-xs text-muted-foreground">
              Across all blogs
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Blogs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Top Blogs
            </CardTitle>
            <CardDescription>
              Most viewed blog posts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {stats.topBlogs?.map((blog) => (
              <div key={blog.id} className="flex items-start gap-4 p-3 rounded-lg border">
                <Image
                  src={blog.thumbnail}
                  alt={blog.title}
                  className="w-16 h-16 rounded-md object-cover flex-shrink-0"
                  width={64}
                  height={64}
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm line-clamp-2 mb-1">
                    {blog.title}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                    {blog.content}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {blog.viewCount} views
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(blog.createdAt)}
                      </span>
                    </div>
                    <Badge variant="secondary">
                      #{stats.topBlogs.indexOf(blog) + 1}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Projects */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5" />
              Top Projects
            </CardTitle>
            <CardDescription>
              Featured projects
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {stats.topProjects?.map((project) => (
              <div key={project.id} className="p-4 rounded-lg border space-y-3">
                <div className="flex items-start gap-3">
                  <Image
                    src={project.thumbnail}
                    alt={project.name}
                    className="w-12 h-12 rounded-md object-cover flex-shrink-0"
                    width={48}
                    height={48}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm mb-1">
                      {project.name}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {project?.technology?.slice(0, 3).map((tech, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.technology.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.technology.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Eye className="h-3 w-3" />
                    {project.viewCount} views
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Live
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.projectLink} target="_blank" rel="noopener noreferrer">
                        <Github className="h-3 w-3 mr-1" />
                        Code
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Latest Users */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Latest Users
          </CardTitle>
          <CardDescription>
            Recently registered users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.latestUsers?.map((user) => (
              <div key={user.id} className="flex items-center gap-4 p-3 rounded-lg border">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={`https://avatar.vercel.sh/${user.email}`} />
                  <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm">{user.name}</h4>
                  <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                </div>
                <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                  {user.role}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;