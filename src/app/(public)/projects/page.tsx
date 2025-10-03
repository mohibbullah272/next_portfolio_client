import ProjectCard from '@/components/ui/ProjectCard';
import { Project } from '@/types/project';
import { Metadata } from 'next';
import React from 'react';


export const metadata:Metadata={
    title:"Projects",
    
}


const Projects = async() => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/project`,{
        next:{
            revalidate:60
        }
    })
    const projects = await res.json()
    console.log(projects)
    return (
        <div>
          

          <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 px-5 my-10'>
            {
                projects.map((project:Project)=><ProjectCard key={project.id} project={project}></ProjectCard>)
            }
          </div>
        </div>
    );
};

export default Projects;