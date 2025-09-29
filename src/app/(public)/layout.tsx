import Navbar from "@/components/shared/Navbar";
import { ReactNode } from "react";


const publicLayout = ({children}:{
    children:ReactNode
}) => {
    return (
        <div>
            <Navbar></Navbar>
            <main className="min-h-dvh">{children}</main>
            
        </div>
    );
};

export default publicLayout;