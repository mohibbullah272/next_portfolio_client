
import Timeline from "@/components/ui/TimeLine";
import { Metadata } from "next";
export const metadata:Metadata = {
   title:"About Me" 
}
const About = () => {
    return (
        <div>
         <Timeline></Timeline>
        </div>
    );
};

export default About;