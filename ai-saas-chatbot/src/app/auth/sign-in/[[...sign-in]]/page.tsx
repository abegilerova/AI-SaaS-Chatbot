"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace("/dashboard"); // Use `replace` to prevent back navigation
    }
  }, [isSignedIn, isLoaded, router]);

  if (!isLoaded) return <p>Loading...</p>; // Prevent flickering

  if (isSignedIn) return null; // Prevent SignIn component from rendering

  return <SignIn afterSignInUrl="/dashboard" />;
}
