import { Project } from "@/types/project";
import ProjectCard from "./ui/ProjectCard";


const RecentProject = async() => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/project`);
    const projects = await res.json();
    return (
        <div>
            <h3 className="text-4xl text-center font-bold italic">Latest <span className="text-primary/80">Projects</span></h3>
            <div className="grid lg:grid-cols-3 place-items-center md:grid-cols-2 grid-cols-1 justify-items-center my-20 gap-5">
{
    projects.slice(0,3).map((project:Project)=><ProjectCard key={project.id} project={project}></ProjectCard>)
}
</div>
        </div>
    );
};

export default RecentProject;