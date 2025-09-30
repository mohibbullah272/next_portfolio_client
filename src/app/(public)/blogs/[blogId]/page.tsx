import { formatDate, IBLog } from "@/components/ui/BlogCard";
import { Calendar, Eye } from "lucide-react";
import Image from "next/image";


export async function generateMetadata({params}:{ params: Promise<{ blogId: string }> }){

    const { blogId } = await params;
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/blog/${blogId}`);
    const blog: IBLog = await res.json();
   
    return {
      title: blog.title,
        description:blog.content
     
    }
  }
const BlogDetails = async ({ params }: { params: Promise<{ blogId: string }> }) => {



  const { blogId } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/blog/${blogId}`);
  const blog: IBLog = await res.json();

  return (
    <div className="flex justify-center p-5 my-10">
      <div className="flex md:flex-row flex-col justify-center items-start gap-6 w-full max-w-5xl bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
  
        <div className="md:w-1/2 w-full flex-shrink-0">
          <Image
            src={blog.thumbnail}
            alt={blog.title}
            width={600}
            height={400}
            className="w-full h-[400px] object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-t-none"
            priority
          />
        </div>

        
        <div className="md:w-1/2 w-full flex-shrink-0 p-6 space-y-5 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent">
          <h1 className="text-3xl font-bold text-white">{blog.title}</h1>
          <p className="text-gray-300 text-lg leading-relaxed">{blog.content}</p>
          <div className="flex justify-between items-center text-gray-300">
            <span className="flex gap-2 items-center text-lg">
              <Calendar className="w-5 h-5" />
              {formatDate(blog.createdAt)}
            </span>
            <span className="flex gap-2 items-center text-lg">
              <Eye className="w-5 h-5" />
              {blog.viewCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;