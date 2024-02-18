"use client";

import { SessionProvider } from "next-auth/react";
import { Provider } from "react";

type ProvidersType = {children: React.ReactNode}

const Providers: React.FC<ProvidersType>= ({children}) => {
    return <SessionProvider>{children}</SessionProvider>
}

export default Providers