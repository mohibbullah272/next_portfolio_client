import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  
  interface FaqItem {
    id: string;
    question: string;
    answer: string;
  }
  
  interface Faq3Props {
    heading?: string;
    description?: string;
    items?: FaqItem[];
    supportHeading?: string;
    supportDescription?: string;
    supportButtonText?: string;
    supportButtonUrl?: string;
  }
  
  const faqItems = [
    {
      id: "faq-1",
      question: "Who are you and what do you do?",
      answer:
        "I’m Mohibullah , a Full stack web developer focused on building clean UIs and smooth user experiences. I love turning real-world problems into functional, full-stack solutions.",
    },
    {
      id: "faq-2",
      question: "What technologies do you specialize in?",
      answer:
        "I mainly work with React.js, Next.js, Node.js, Express, MongoDB, and TypeScript. I’m also comfortable with Firebase, Prisma, Tailwind CSS, and  Redux, NextAuth, SQL, Postgresql, Mongoose,  and advanced backend concepts .",
    },
    {
      id: "faq-3",
      question: "Do you have project experience?",
      answer:
        "Yes! I’ve built multiple projects from scratch, including a medical camp management system, a Digital Wallet System, a AI Driven Developer Platform (team-project), and an e-commerce site. Each project helps me sharpen both my frontend and backend skills.",
    },
    {
      id: "faq-4",
      question: "What makes you different as a developer?",
      answer:
        "I’m self-driven and enjoy tackling challenges independently. I don’t just code for the sake of coding—I focus on learning deeply, writing clean solutions, and continuously improving how I explain and communicate technical concepts.",
    },
    {
      id: "faq-5",
      question: "What are your career goals?",
      answer:
        "My short-term goal is to land a role where I can grow as a MERN stack or frontend developer. Long-term, I want to become a well-rounded full-stack engineer, confident in both code and communication.",
    },
    {
      id: "faq-6",
      question: "Are you open to collaborations or freelance work?",
      answer:
        "Yes, I’m always interested in collaborating on exciting projects where I can contribute my skills and also learn new things. If you have an idea or project in mind, feel free to reach out!",
    },
    {
      id: "faq-7",
      question: "How can I contact you?",
      answer:
        "You can reach me via the contact form on my portfolio or connect with me on GitHub and LinkedIn. I’m always open to networking and new opportunities.",
    },
  ];
  
  
  const Faq = ({
    heading = "Frequently asked questions",
    description = "Find answers to common questions about Me. Can't find what you're looking for? Contact via below form",
    items = faqItems,
  }: Faq3Props) => {
    return (
      <section className="py-32">
        <div className="container space-y-16">
          <div className="mx-auto flex max-w-3xl flex-col text-left md:text-center">
            <h2 className="mb-3 text-3xl font-semibold md:mb-4 lg:mb-6 lg:text-4xl">
              {heading}
            </h2>
            <p className="text-muted-foreground lg:text-lg">{description}</p>
          </div>
          <Accordion
            type="single"
            collapsible
            className="mx-auto w-full lg:max-w-3xl"
          >
            {items.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger className="transition-opacity duration-200 hover:no-underline hover:opacity-60">
                  <div className="font-medium sm:py-1 lg:py-2 lg:text-lg">
                    {item.question}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="sm:mb-1 lg:mb-2">
                  <div className="text-muted-foreground lg:text-lg">
                    {item.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    );
  };
  
  export default Faq;
  