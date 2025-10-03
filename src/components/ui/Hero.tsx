import { ArrowRight, ArrowUpRight } from "lucide-react";


import { Button } from "@/components/ui/button";
import { TextGenerateEffect } from "./text-generate-effect";

interface Hero1Props {
  badge?: string;
  heading?: string;
  description?: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
  image?: {
    src: string;
    alt: string;
  };
}

const Hero = ({

  heading = "Md  , Mohibbullah",
  description = "Full-stack developer passionate about building secure, scalable, and reusable applications.",
  buttons = {
    primary: {
      text: "Contact",
      url: "#contact",
    },
    secondary: {
      text: "View on GitHub",
      url: "https://github.com/mohibbullah272",
    },
  },
  image = {
    src: "https://i.ibb.co.com/ksTNw04k/profile-Pic-removebg-preview.png",
    alt: "Hero section Profile Image",
  },
}: Hero1Props) => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
   
            <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">
              {heading}
            </h1>
            <div className="text-muted-foreground mb-8 max-w-xl lg:text-xl">
            <TextGenerateEffect words={description}></TextGenerateEffect>
            </div>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              {buttons.primary && (
                <Button asChild className="w-full bg-primary/70 text-white sm:w-auto">
                  <a href={buttons.primary.url}>{buttons.primary.text}</a>
                </Button>
              )}
              {buttons.secondary && (
                <Button asChild variant="outline" className="w-full  sm:w-auto">
                  <a target="_blank" href={buttons.secondary.url}>
                    {buttons.secondary.text}
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
          <img
            src={image.src}
            alt={image.alt}
            className=" w-full scale-3d rounded-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero ;
