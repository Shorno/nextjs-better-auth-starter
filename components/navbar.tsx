"use client"

import React from "react"
import Link from "next/link"
import {Menu} from "lucide-react"
import {Button} from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
} from "@/components/ui/sheet"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {authClient} from "@/lib/auth-client";
import {useRouter} from "next/navigation";

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
    const router = useRouter()

    const {data: session, isPending} = authClient.useSession()
    console.log(session)

    console.log(isPending)

    return (
        <nav className="border-b">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between items-center">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0">
                            <span className="text-2xl font-bold">Logo</span>
                        </Link>
                        <div className="hidden md:block ml-10">
                            <div className="flex items-baseline space-x-4">
                                <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                                <Link href="/about" className="px-3 py-2 rounded-md text-sm font-medium">About</Link>
                                <Link href="/contact"
                                      className="px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        {session?.session ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost">
                                        {session?.user?.name}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Profile</DropdownMenuItem>
                                    <DropdownMenuItem>Settings</DropdownMenuItem>
                                    <DropdownMenuItem onClick={async () =>
                                        await authClient.signOut({
                                            fetchOptions: {
                                                onSuccess: () => {
                                                    router.push("/");
                                                },
                                            },
                                        })
                                    }>
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <>
                                <Button asChild variant="ghost">
                                    <Link href="/login">Log in</Link>
                                </Button>
                                <Button asChild>
                                    <Link href="/signup">Sign up</Link>
                                </Button>
                            </>
                        )}
                    </div>
                    <div className="md:hidden flex items-center">
                        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="ml-2">
                                    <Menu className="h-5 w-5"/>
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right">
                                <SheetTitle>Menu</SheetTitle>
                                <div className="flex flex-col space-y-4 mt-4">
                                    <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium"
                                          onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                                    <Link href="/about" className="px-3 py-2 rounded-md text-sm font-medium"
                                          onClick={() => setIsMobileMenuOpen(false)}>About</Link>
                                    <Link href="/contact" className="px-3 py-2 rounded-md text-sm font-medium"
                                          onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
                                    {session ? (
                                        <Button variant="destructive" onClick={() => {
                                            console.log("Logging out...")
                                            setIsMobileMenuOpen(false)
                                        }}>
                                            Log out
                                        </Button>
                                    ) : (
                                        <>
                                            <Button asChild variant="outline"
                                                    onClick={() => setIsMobileMenuOpen(false)}>
                                                <Link href="/login">Log in</Link>
                                            </Button>
                                            <Button asChild onClick={() => setIsMobileMenuOpen(false)}>
                                                <Link href="/signup">Sign up</Link>
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </nav>
    )
}
