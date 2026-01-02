'use client'

import client from "../types/apolloClient";
import { ApolloProvider } from "@apollo/client/react";

export function Provider({ children }: { children: React.ReactNode}) {
    return <ApolloProvider client={client}>{children}</ApolloProvider>
}