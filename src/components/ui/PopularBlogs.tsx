
import { getUserSession } from "../helpers/getUserSessaion";
import BlogCard, { IBLog } from "./BlogCard";


const PopularBlogs = async() => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/blog/popular`);
    const blogs = await res.json();
    const test =await getUserSession()
    console.log(test)
 
    return (
        <div>
         <h3 className="text-4xl font-bold italic text-center">Hot Tech <span className="text-primary/80">Blogs</span></h3>
         <div className="grid lg:grid-cols-3 place-items-center md:grid-cols-2 grid-cols-1 justify-items-center my-20 gap-5">
{
    blogs.map((blog:IBLog)=><BlogCard key={blog.id} blog={blog}></BlogCard>)
}
</div>
        </div>
    );
};

export default PopularBlogs;