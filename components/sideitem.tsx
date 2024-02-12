import { IconType } from "react-icons";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface SideItemProps {
    icon: IconType;
    label: string;
    active?: boolean;
    href: string;
}

const SideItem: React.FC<SideItemProps> = ({
    icon: Icon,
    label,
    active,
    href
}) => {
    return (
        <Link 
        href={href}
        className={twMerge(`
            flex
            flex-row
            h-auto
            items-center
            w-full
            space-x-4
            text-md
            font-medium
            cursor-pointer
            hover:text-white
            transition
            text-neutral-400
            py-1
        `,
            active && "text-white"
        )}
        >
            <Icon size={26}/>
            <p className="truncate w-full">{label}</p>
        </Link>
    );
}

export default SideItem;