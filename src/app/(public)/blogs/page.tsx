import BlogCard, { IBLog } from "@/components/ui/BlogCard";
import { Metadata } from "next";

export const metadata:Metadata={
    title:"Blogs",
    description:"get latest tech related blogs "
}


const Blogs = async() => {
const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/blog`,{
    next:{
        tags:["BLOGS"]
    }
})
const blogs = await res.json()
    return (
        <div>
       <h3 className="italic mt-2 lg:text-5xl text-3xl text-center">Tech <span className="text-primary">Bites</span> </h3>
       <p className="text-center text-gray-300 w-1/2 mt-2 mx-auto">Quick insights, trends, and tips on AI, coding, cybersecurity, and more. Dive into the latest tech topics shaping the future!</p>
<div className="grid lg:grid-cols-3 place-items-center md:grid-cols-2 grid-cols-1 justify-items-center my-20 gap-5">
{
    blogs.map((blog:IBLog)=><BlogCard key={blog.id} blog={blog}></BlogCard>)
}
</div>

        </div>
    );
};

export default Blogs;