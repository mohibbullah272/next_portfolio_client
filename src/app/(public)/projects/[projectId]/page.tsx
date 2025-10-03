import { Project } from "@/types/project";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Calendar, Eye, ExternalLink, Github } from "lucide-react";

// Utility to format dates
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/project/${projectId}`);
  const project: Project = await res.json();

  return {
    title: project.name,
    description: project.description,
    icons: project.thumbnail,
  };
}

const ProjectDetails = async ({ params }: { params: Promise<{ projectId: string }> }) => {
  const { projectId } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/project/${projectId}`);
  const project: Project = await res.json();

  return (
    <div className="flex justify-center p-5 my-10 min-h-screen">
      <Card className="w-full max-w-5xl bg-black/5 p-5 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">


        <div className=" flex flex-col md:flex-row items-start gap-6 z-10">
          {/* Thumbnail */}
          <div className="md:w-1/2 w-full flex-shrink-0">
            <Image
              src={project.thumbnail}
              alt={`${project.name} thumbnail`}
              width={600}
              height={400}
              className="w-full h-[400px] object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-t-none transition-transform duration-700 ease-out hover:scale-105"
              priority
            />
     
          </div>

          {/* Content */}
          <div className="md:w-1/2 w-full p-8 space-y-6">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
              {project.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              {project.description}
            </p>

            {/* Features */}
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                Features
              </h2>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 text-sm">
                {project.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                Technologies
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.technology.map((tech, index) => (
                  <Badge
                    key={index}
                    className="bg-card text-white"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600 dark:text-gray-300 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>Created: {formatDate(project.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>Updated: {formatDate(project.updatedAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                <span>{project.viewCount} Views</span>
              </div>
              <div className="flex items-center gap-2">
                <span>ID: {project.id}</span>
              </div>
            </div>

            {/* Links */}
            <div className="flex gap-4">
              <Button
                asChild
                className="group flex-1 bg-card text-white font-semibold py-3 rounded-full transition-all duration-300"
              >
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="group flex-1 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all duration-300"
              >
                <a
                  href={project.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <span>GitHub</span>
                  <Github className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProjectDetails;