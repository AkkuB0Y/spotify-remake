"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { FaSearch } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import Box from "./box";
import SideItem from "./sideitem";
import Library from "./library";

interface SidebarProps {
    children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({
    children
}) => {
    
    const pathname = usePathname();
 
    const routes = useMemo(() => [{
        icon: GoHome,
        label: 'Home',
        active: pathname !== '/search',
        href: '/'
    },
    {
        icon: FaSearch,
        label: 'Search',
        active: pathname === '/search',
        href: '/search'
    }
    ], []);
    return (
        <div className="flex h-full font-bold">
            <div className="hidden md:flex flex-col space-y-2 bg-black h-full w-[300px] p-2">
                <Box>
                    <div className="flex flex-col space-y-4 px-5 py-4">
                        {routes.map((item) => (
                            <SideItem 
                                key={item.label}
                                {...item}
                            />
                        ))}
                    </div>
                </Box>
                <Box className="overflow-y-auto h-full">
                    <Library />
                </Box>
            </div>
            <main className="h-full flex-1 overflow-y-auto py-2">
                {children}
            </main>

        </div>
    );
}

export default Sidebar;