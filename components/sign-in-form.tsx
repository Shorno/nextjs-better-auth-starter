"use client"
import React, {useState} from 'react';
import {authClient} from "@/lib/auth-client";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function SignInForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUp = async (event: React.FormEvent) => {
        event.preventDefault()
        const {data, error} = await authClient.signIn.email({
            email,
            password,
        }, {
            onRequest: (ctx) => {
                console.log("On request data", ctx)
            },
            onSuccess: (ctx) => {
                console.log("On success data", ctx)
            },
            onError: (ctx) => {
                alert(ctx.error.message);
            },
        });
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Sign up</CardTitle>
                <CardDescription>Create your account to get started</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={signUp} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={8}
                        />
                    </div>


                    <Button type="submit" className="w-full">Login</Button>
                </form>
            </CardContent>
            <CardFooter className="flex justify-center">
                <p className="text-sm text-muted-foreground">
                    Don&#39;t have an account? <Link href={"/signup"} className="text-primary hover:underline">Sign
                    Up</Link>
                </p>
            </CardFooter>
        </Card>
    );
}