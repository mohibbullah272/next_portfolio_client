"use client"
import { Book, LogOut, Menu, Sunset, Trees, Zap } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import Logo from "../ui/Logo";
import { getUserSession } from "../helpers/getUserSessaion";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}

const Navbar =({
  menu = [
    { title: "Home", url: "/" },
    { title: "About Me", url: "/about" },
    { title: "Blogs", url: "/blogs" },
    { title: "Projects", url: "/projects" },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/signup" },
  },
}: Navbar1Props) => {
  const session = useSession()
  let User = session?.data?.user

  return (
    <section className="py-4">
      <div className="container ">
        {/* Desktop Menu */}
        <nav className="hidden justify-between  lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link href={'/'} className="flex items-center gap-2">
        <Logo></Logo>
            </Link>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-2">
    {
      User ? <div className="flex items-center gap-5">
    <Link
      className="hover:underline"
      href={'/dashboard'}
    >Dashboard</Link>
<div>
  {
    User?.image ? <div>
      <Image
      src={User.image}
      alt="user image"
      width={40}
      height={40}
      className="rounded-full"
      />
    </div>:<div>
      <span className="bg-primary text-white text-sm font-semibold rounded-full h-14 p-2 w-14">{User?.name?.slice(0,2).toUpperCase()}</span>
    </div>
  }
</div>
<Button onClick={()=>signOut()} className="bg-red-600/50 backdrop-blur-sm text-white flex items-center gap-2">Logout <LogOut></LogOut></Button>
      </div>:<>
              <Button asChild variant="outline" size="sm">
              <Link href={auth.login.url}>{auth.login.title}</Link>
            </Button>
            <Button asChild size="sm">
              <Link href={auth.signup.url}>{auth.signup.title}</Link>
            </Button>
      </>
    }
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href={'/'} className="flex items-center gap-2">
    <Logo></Logo>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link href={'/'} className="flex items-center gap-2">
                        M.Dev
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  <div className="flex flex-col gap-3">
    {
      User ? <div className="flex items-center gap-5">
<div>
<Link
      className="hover:bg-muted hover:text-accent-foreground flex min-w-80 select-none flex-row gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors"
      href={'/dashboard'}
    >Dashboard</Link>
  {
    User?.image ? <div>
      <Image
      src={User.image}
      alt="user image"
      width={40}
      height={40}
      className="rounded-full"
      />
    </div>:<div>
      <span className="bg-primary text-sm rounded-full text-white font-semibold h-14 p-2 w-14">{User?.name?.slice(0,2).toUpperCase()}</span>
    </div>
  }
</div>
<Button onClick={()=>signOut()} className="bg-red-600/50 backdrop-blur-sm text-white flex items-center gap-2">Logout <LogOut></LogOut></Button>
      </div>:<>
              <Button asChild variant="outline" size="sm">
              <Link href={auth.login.url}>{auth.login.title}</Link>
            </Button>
            <Button asChild size="sm">
              <Link href={auth.signup.url}>{auth.signup.title}</Link>
            </Button>
      </>
    }
          </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <Link
        href={item.url}
        className="bg-background hover:bg-muted hover:text-accent-foreground group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
      >
        {item.title}
      </Link>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </Link>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <Link
      className="hover:bg-muted hover:text-accent-foreground flex min-w-80 select-none flex-row gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors"
      href={item.url}
    >
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-muted-foreground text-sm leading-snug">
            {item.description}
          </p>
        )}
      </div>
    </Link>
  );
};

export default Navbar ;
