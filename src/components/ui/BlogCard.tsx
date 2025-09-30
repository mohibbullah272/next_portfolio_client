import Image from "next/image";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { CalendarIcon, EyeIcon } from "lucide-react"; // Assuming lucide-react for icons
import Link from "next/link";

export interface IBLog {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;
  viewCount: number;
}

export const formatDate = (date: Date) =>
   new Date(date).toLocaleDateString("en-US", {
     year: "numeric",
     month: "short",
     day: "numeric",
   });
const BlogCard = ({ blog }: { blog: IBLog }) => {
 

  return (
    <Link href={`/blogs/${blog.id}`}>
     <Card
      className="bg-black/5 backdrop-blur-sm max-w-sm w-full rounded-lg overflow-hidden transition-shadow border-2 border-gray-700 duration-300 hover:shadow-lg"
      aria-labelledby={`blog-title-${blog.id}`}
    >
      <CardHeader className="p-4">
        <h2
          id={`blog-title-${blog.id}`}
          className="text-xl font-semibold text-white "
        >
          {blog.title}
        </h2>
      </CardHeader>
      <CardContent className="p-4">
        <div className="relative w-full h-40">
          <Image
            src={blog.thumbnail}
            alt={blog.title}
            fill
            sizes="(max-width: 640px) 100vw, 384px"
            className="object-cover rounded-md"
            priority={blog.id === 1} 
          />
        </div>
        <p className="text-gray-300 text-sm mt-4 line-clamp-3">
          {blog.content.slice(0, 100)}
          {blog.content.length > 100 && "..."} <span className="underline font-semibold  hover:text-gray-400 text-primary">Learn More </span>
        </p>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center text-gray-400 text-sm">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4" />
          <span>
            post on: {formatDate(blog.createdAt)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <EyeIcon className="w-4 h-4" />
          <span>{blog.viewCount} views</span>
        </div>
      </CardFooter>
    </Card>
    </Link>
   
  );
};

export default BlogCard;