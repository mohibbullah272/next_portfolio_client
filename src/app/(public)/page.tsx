
import Contact from '@/components/ui/Contact';
import Faq from '@/components/ui/FAQ';
import Hero from '@/components/ui/Hero';
import PopularBlogs from '@/components/ui/PopularBlogs';
import ProjectGallery from '@/components/ui/ProjectGallery';
import { Metadata } from 'next';

import React from 'react';
export const metadata:Metadata={
    title:"Home"
}
const HomePage = () => {

    return (
        <div>
<Hero></Hero>
<PopularBlogs></PopularBlogs>
<ProjectGallery></ProjectGallery>
<Faq></Faq>
<Contact></Contact>
        </div>
    );
};

export default HomePage;