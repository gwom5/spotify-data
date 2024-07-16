"use client";
import Link from "next/link";
import { History, House, ListMusic, MicVocal, Music } from 'lucide-react';
import NavigationItem from "@/app/components/NavigationItem/NavigationItem";
import SpotifyIcon from "@/lib/icons/SpotifyIcon";
import GithubIcon from "@/lib/icons/GithubIcon";
import {usePathname} from "next/navigation";

const NavigationBar = () => {
    const pathname = usePathname();
    const navigationItems = [
        { href: '/', title: 'Home', Icon: House },
        { href: '/artists', title: 'Top Artists', Icon: MicVocal },
        { href: '/tracks', title: 'Top Tracks', Icon: Music },
        { href: '/recent', title: 'Recent', Icon: History },
        { href: '/playlists', title: 'Playlists', Icon: ListMusic },
    ];

    return (
        <div className="fixed bg-gray-950 bottom-0 z-50
                        w-full flex md:justify-between md:inset-0 md:z-auto
                        md:flex-col text-white md:h-full md:w-28 transition-transform duration-300"
        >
            <nav className="hidden md:flex mt-5 justify-center">
                <Link href="/" legacyBehavior>
                    <a>
                        <SpotifyIcon />
                    </a>
                </Link>
            </nav>
            <nav className="flex justify-center w-full md:flex-col md:h-full md:bg-dark text-dark">
                {navigationItems.map((item, index) => (
                    <NavigationItem
                        key={index}
                        href={item.href}
                        title={item.title}
                        Icon={item.Icon}
                        active={pathname === item.href}
                    />
                ))}
            </nav>
            <nav className="hidden md:flex mb-5 justify-center">
                <Link href="https://github.com/gwom5/spotify-data" legacyBehavior>
                    <a target="_blank">
                        <GithubIcon />
                    </a>
                </Link>
            </nav>
        </div>
    );
}

export default NavigationBar;
