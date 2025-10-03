"use client";

import { Code, Database, PenTool, Rocket} from "lucide-react";

const Services = () => {
  const services = [
    {
        icon: <Code className="h-6 w-6" />,
        title: "Web Development",
        description:
          "I build modern, scalable, and responsive web apps using React, Node.js, Express, MongoDB, and more. From frontend to backend, I handle the full stack.",
        items: ["Frontend Development (Nextjs, React, Tailwind, Redux)", "Backend Development (Node.js, Express)", "API Integration & RESTful Services"],
      },
      {
        icon: <PenTool className="h-6 w-6" />,
        title: "UI/UX Design",
        description:
          "Creating clean, user-friendly designs that are both functional and visually appealing. I focus on smooth UI interactions and user-centered layouts.",
        items: ["Responsive UI Design", "Component-Based Design (React/Tailwind)", "Prototyping & Interaction Design"],
      },
      {
        icon: <Database className="h-6 w-6" />,
        title: "Database & Backend Management",
        description:
          "Efficient database design and backend logic to support reliable and performant web applications.",
        items: ["MongoDB & Mongoose", "PostgreSQL & Prisma", "Server-Side Logic & Auth (JWT, NextAuth)"],
      },
      {
        icon: <Rocket className="h-6 w-6" />,
        title: "Project Implementation",
        description:
          "I can take a project from concept to launch, ensuring full functionality, clean code, and smooth deployment.",
        items: ["Full-Stack Project Development", "Firebase Auth & Integration", "Deployment & Maintenance"],
      },
      
  ];

  return (
    <section className="py-32">
      <div className="container">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Services
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg tracking-tight md:text-xl">
              I craft digital experiences that captivate and convert, bringing
              your vision to life.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {services.map((service, index) => (
              <div
                key={index}
                className="border-border space-y-6 rounded-lg border p-8 transition-shadow hover:shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-muted rounded-full p-3">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
                <div className="space-y-2">
                  {service.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center gap-2">
                      <div className="bg-foreground h-1.5 w-1.5 rounded-full" />
                      <span className="text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
