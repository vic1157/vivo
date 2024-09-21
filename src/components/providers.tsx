// "use client";

// import React from 'react'
// import { ClerkProvider } from '@clerk/nextjs'

// interface Props {
//     children: React.ReactNode;
// }

// const Providers = ({ children }: Props) => {
//     return (
//         <ClerkProvider>
//             {children}
//         </ClerkProvider>
//     )
// };

// export default Providers

"use client";

import React, { useState } from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface Props {
    children: React.ReactNode;
}

const Providers = ({ children }: Props) => {
    // Create a QueryClient instance
    const [queryClient] = useState(() => new QueryClient());

    return (
        <ClerkProvider>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </ClerkProvider>
    );
};

export default Providers;
