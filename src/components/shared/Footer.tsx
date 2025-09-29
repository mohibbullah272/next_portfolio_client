import Logo from "../ui/Logo";


interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface Footer2Props {

  tagline?: string;
  menuItems?: MenuItem[];

}

const Footer = ({

  tagline = "Full Stack Web Developer Passionate to build scalable and secure web application.Transforming ideas into elegant, user-friendly digital experiences. Passionate about clean code and innovative solutions. ",
  menuItems = [
    {
      title: "Quick Links",
      links: [
        { text: "Home", url: "/" },
        { text: "Blogs", url: "/blogs" },
        { text: "Projects", url: "/projects" },
        { text: "About", url: "/about" },
        { text: "Register", url: "/signup" },
       
      ],
    },
   
   
    {
      title: "Social",
      links: [
        { text: "Facebook", url: "#" },
        { text: "Github", url: "#" },
        { text: "LinkedIn", url: "#" },
      ],
    },
  ],

}: Footer2Props) => {
  return (
    <section className="py-32 bg-black/10 backdrop-blur-sm">
      <div className="container">
        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6 text-center">
            <div className="col-span-3 mb-8 lg:mb-0">
              <div className="flex items-center gap-2 justify-center">
      <Logo></Logo>
      <h3 className="text-xl  mr-2">Md:Mohibbullah</h3>
              </div>
              <p className="m-5 font-semibold text-center">{tagline}</p>
            </div>
            {menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="text-muted-foreground space-y-4">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="hover:text-primary font-medium"
                    >
                      <a href={link.url}>{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-muted-foreground mt-24 flex flex-col justify-center gap-4 border-t pt-8 text-sm font-medium md:flex-row md:items-center">
            <p className="text-center">© All Right Reserved M.Dev 2025</p>
           
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Footer;
