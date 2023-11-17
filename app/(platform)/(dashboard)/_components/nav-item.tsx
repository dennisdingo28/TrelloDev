"use client"

export type Organization = {
    id: string;
    slug: string
    imageUrl: string;
    name: string;
}

interface NavItemProps{
    isExpanded: boolean;
    isActive: boolean;
    organization: Organization;
    onExpand: (id: string) => void;
}

export const NavItem = ({isExpanded, isActive, organization, onExpand}:NavItemProps) =>{
    return (
        <div className="">ni</div>
    )
}