import { Project } from "@/types/project";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-black/5 backdrop-blur-sm">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={project.thumbnail}
            alt={`${project.name} thumbnail`}
            fill
            className="object-cover  transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        <div className="bg-black/30 absolute inset-0"></div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {project.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technology.slice(0, 3).map((tech, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-card"
            >
              {tech}
            </Badge>
          ))}
          {project.technology.length > 3 && (
            <Badge variant="secondary" className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
              +{project.technology.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
<Link className="w-full" href={`/projects/${project.id}`}>
<Button
        
        className="w-full bg-primary/40 text-white"
      >
View Details <ExternalLink className="h-4 w-4" />
      </Button>
</Link>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;