"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import {

  IconBrandTabler,


} from "@tabler/icons-react";

import Logo from "./ui/Logo";
import { useSession } from "next-auth/react";
import { Cog, FileCog, FolderCog, Settings } from "lucide-react";
import Link from "next/link";

export function SidebarLayout() {
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Add Projects",
      href: "/dashboard/Add-projects",
      icon: (
        <FolderCog  className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Add Blogs",
      href: "/dashboard/Add-blog",
      icon: (
        <FileCog className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Manage Projects",
      href: "/dashboard/Manage-projects",
      icon: (
        <Settings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Manage Blogs",
      href: "/dashboard/Manage-blogs",
      icon: (
        <Cog className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  
  ];
  const [open, setOpen] = useState(false);
  const session = useSession()

  return (
    <div
     
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
       <Link href={'/'}><Logo></Logo></Link>
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: `${session?.data?.user?.name}`,
                href: "#",
                icon: (
              
                  <img
                    src={session.data?.user.image? session.data?.user.image! : 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png'}
                    className="h-7 w-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
 
    </div>
  );
}
