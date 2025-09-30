"use client";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";

const ProjectGallery = () => {
    const images = [
        "https://i.ibb.co.com/nMjmb7VG/projectgallery1.png",
        "https://i.ibb.co.com/gMnycHcm/project-Gallery2.png",
        "https://i.ibb.co.com/rKq0GY5Y/project-Gallery3.png",
        "https://i.ibb.co.com/M5BBc0zJ/project-Gallery4.png",
        "https://i.ibb.co.com/21pyVtfM/project-Gallery5.png",
        "https://i.ibb.co.com/bMZzVNhx/project-Gallery6.png",
        "https://i.ibb.co.com/ZzxP8Wbn/project-Gallery7.png",
        "https://i.ibb.co.com/GfwDLMp0/project-Gallery8.png",
        "https://i.ibb.co.com/ymbB5kDD/project-Gallery9.png",
        "https://i.ibb.co.com/PZNjGP3h/project-Gallery10.png",
        "https://i.ibb.co.com/nMjmb7VG/projectgallery1.png",
        "https://i.ibb.co.com/gMnycHcm/project-Gallery2.png",
        "https://i.ibb.co.com/rKq0GY5Y/project-Gallery3.png",
        "https://i.ibb.co.com/M5BBc0zJ/project-Gallery4.png",
        "https://i.ibb.co.com/21pyVtfM/project-Gallery5.png",
        "https://i.ibb.co.com/bMZzVNhx/project-Gallery6.png",
        "https://i.ibb.co.com/ZzxP8Wbn/project-Gallery7.png",
        "https://i.ibb.co.com/GfwDLMp0/project-Gallery8.png",
        "https://i.ibb.co.com/ymbB5kDD/project-Gallery9.png",
        "https://i.ibb.co.com/PZNjGP3h/project-Gallery10.png",
        "https://i.ibb.co.com/nMjmb7VG/projectgallery1.png",
        "https://i.ibb.co.com/gMnycHcm/project-Gallery2.png",
        "https://i.ibb.co.com/rKq0GY5Y/project-Gallery3.png",
        "https://i.ibb.co.com/M5BBc0zJ/project-Gallery4.png",
        "https://i.ibb.co.com/21pyVtfM/project-Gallery5.png",
        "https://i.ibb.co.com/bMZzVNhx/project-Gallery6.png",
        "https://i.ibb.co.com/ZzxP8Wbn/project-Gallery7.png",
        "https://i.ibb.co.com/GfwDLMp0/project-Gallery8.png",
        "https://i.ibb.co.com/ymbB5kDD/project-Gallery9.png",
        "https://i.ibb.co.com/PZNjGP3h/project-Gallery10.png",
       
      ];
    return (
        <div>
<h3 className="text-4xl text-center italic my-5 font-bold">Latest Project <span className="text-primary/80 ">Gallery</span></h3>

        <div className="mx-auto my-20 max-w-7xl   p-2 ring-1 ring-neutral-700/10 ">
        <ThreeDMarquee images={images} />
      </div>
        </div>
    );
};

export default ProjectGallery;