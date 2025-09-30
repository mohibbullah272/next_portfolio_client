
import Hero from '@/components/ui/Hero';
import { Metadata } from 'next';
import React from 'react';
export const metadata:Metadata={
    title:"Home"
}
const HomePage = () => {
    return (
        <div>
<Hero></Hero>
        </div>
    );
};

export default HomePage;