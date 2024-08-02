"use client";
import {isServer, QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { ReactNode } from "react";

interface ReactQueryProviderProps {
    children: ReactNode;
}

function makeQueryClient () {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000,
            }
        }
    });
}

function getQueryClient () {
    if (isServer) {
        return makeQueryClient();
    } else {
        if (!browserQueryClient) {
            browserQueryClient = makeQueryClient();
        }
        return browserQueryClient;
    }
}

let browserQueryClient: QueryClient | undefined = undefined;

const ReactQueryProvider = ({children}: ReactQueryProviderProps) => {
    const queryClient = getQueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}

export default ReactQueryProvider;
