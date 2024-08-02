import NextAuth from "next-auth/next";
import fetch from "node-fetch";
import SpotifyProvider from "next-auth/providers/spotify";

async function refreshAccessToken(token) {
    // refreshing access token
    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("refresh_token", token.refreshToken);
    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            Authorization: `Basic ${Buffer.from(
                `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
            ).toString("base64")}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
    });
    const data = await response.json();
    if (!response.ok) {
        return Promise.reject(new Error(data.error || "Failed to refresh access token"));
    }

    return {
        accessToken: data.access_token,
        expiresAt: Math.floor(Date.now() / 1000) + data.expires_in,
        refreshToken: data.refresh_token ?? token.refreshToken,
    };
}

export const authOptions = {
    providers: [
        SpotifyProvider({
          clientId: process.env.SPOTIFY_CLIENT_ID ?? "",
          clientSecret: process.env.SPOTIFY_CLIENT_SECRET ?? "",
        }),
      ],
    secret: process.env.JWT_SECRET,
    callbacks: {
        async jwt({token, account}) {
            if(account) {
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token;
                token.expiresAt = account.expires_at;

                return token;
            }

            // access token has not expired
            if (Date.now() < token.expiresAt * 1000) {
                return token;
            }

            // refresh token if access token has expired
            return refreshAccessToken(token);
        },
        async session({session, token, user}) {
            session.accessToken = token.accessToken;
            return session;
        },
    },
    pages: '/login',
}

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
