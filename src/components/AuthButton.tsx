'use client';
import {signIn} from "next-auth/react";

export default function AuthButton() {
    const handleAuth = () => {
        signIn('spotify', { callbackUrl: '/'}).then(r => console.log(r));
    }

    return (
            <button className="flex justify-center items-center space-x-4 w-60 py-3 px-3 rounded bg-green-500 hover:bg-transparent hover:border-2 border-green-400 hover:text-green-400"
            onClick={handleAuth}>
                Sign in with Spotify
            </button>
    )
}
