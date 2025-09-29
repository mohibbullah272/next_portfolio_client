import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type TimelineEntry = {
 
  title: string;
  content: string;
};

const timelineData: TimelineEntry[] = [
  {
  
    title: "About Me ",
    content:
      "Hey, I’m Mohibullah — a dedicated and self-driven developer who loves turning ideas into real, working solutions. I’m not just someone who codes; I’m someone who finishes. Whether it's a tight deadline, a complex feature, or an unfamiliar stack — I take it head-on and get the job done.",
  },
  {
   
    title: "Skills",
    content:
      "React  ,  Next.js  ,  TypeScript  ,  Node.js  ,  Express.js  ,PostgreSQL  ,  Prisma  ,  MongoDB  ,  Firebase  ,  Tailwind CSS  ,Mongoose   ,  SQL  ,  Redux"
  },
  {

    title: "Background",
    content:
      "Student & developer from Dhaka 🇧🇩 | Passion started with CSS vibes, now building full applications.",
  },
  {

    title: "Approach",
    content:
      "From full-stack apps to small but meaningful features, I work through every step of a project — from frontend designs to backend logic. I genuinely enjoy the process, thrive in challenge-based environments, and love collaborating with teams who are just as passionate about building something impactful.",
  },
  {

    title: "Mindset",
    content:
      "Over time, I’ve learned that being a developer isn’t just about knowing frameworks — it’s about problem-solving, adapting fast, communicating clearly, and staying consistent. That’s what I bring to the table.",
  },
];

const Timeline = () => {
  return (
    <section className=" py-32">
      <div className="container">
        <h1 className="text-foreground mb-10 text-center text-3xl font-bold tracking-tighter sm:text-6xl">
        Mohibbullah <br /> <span className="text-primary/80">Full Stack Developer</span> 
        </h1>
        <div className="relative mx-auto max-w-4xl">
          <Separator
            orientation="vertical"
            className="bg-gray-500 absolute left-2 top-4"
          />
          {timelineData.map((entry, index) => (
            <div key={index} className="relative  mb-10 pl-8">
              <div className="bg-foreground  absolute left-0 top-3.5 flex size-4 items-center justify-center rounded-full" />
              <h4 className="rounded-xl py-2 text-xl font-bold tracking-tight xl:mb-4 xl:px-3">
                {entry.title}
              </h4>

        

              <Card className="my-5 p-5 border-none shadow-none">
                <CardContent className="px-0 xl:px-2">
                  <div
                    className="prose dark:prose-invert text-foreground"
                    dangerouslySetInnerHTML={{ __html: entry.content }}
                  />
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline ;
