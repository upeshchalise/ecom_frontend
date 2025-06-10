"use client"
import React from "react"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "../ui/navigation-menu"
import { cn } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/lib/api/api";

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Alert Dialog",
        href: "/docs/primitives/alert-dialog",
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "Hover Card",
        href: "/docs/primitives/hover-card",
        description:
            "For sighted users to preview content available behind a link.",
    },
    {
        title: "Progress",
        href: "/docs/primitives/progress",
        description:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
        title: "Scroll-area",
        href: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content.",
    },
    {
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description:
            "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
]


export const CategoryDropdown = () => {
          const {data, isLoading} = useQuery({
        queryKey: ["categories"],
        queryFn: () => getAllCategories()
    })

    return (
        <NavigationMenu className="z-50">
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                    {data?.data?.map((component) => (
                                        <ListItem
                                            key={component.id}
                                            title={component.name}
                                            // href={component.id}
                                        />
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
    )
}


const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"