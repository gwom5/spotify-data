import React from 'react';
import Link from 'next/link';

interface NavigationItemProps {
    href: string;
    title: string;
    Icon: React.ElementType
    active: boolean;
}
const NavigationItem: React.FC<NavigationItemProps> = ({ href, title, Icon , active}) => {

    return (
        <Link href={href} legacyBehavior>
            <a className={`relative flex flex-col items-center px-2 py-4 md:py-5 w-full text-center hover:bg-gray-700 text-xs group
                ${active ? 'bg-gray-700' : ''}`}>
                <span className={`absolute md:left-0 md:bottom-0 top-0 md:w-1 md:h-full h-1 w-full transition-all duration-300 ease-in-out
                    ${active ? 'bg-green-500' : 'group-hover:bg-green-300'}`}></span>
                <Icon className="w-6 h-6 my-2 text-slate-400" />
                <span className="text-slate-400 font-medium">{title}</span>
            </a>
        </Link>
    );
};

export default NavigationItem;
