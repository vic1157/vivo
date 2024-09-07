import React from 'react'
import { currentUser } from '@clerk/nextjs/server';

const DashboardPage = async () => {
    const user = await currentUser();  
    return (
        <div className="text-center flex items-center justify-center hc">
            <h2 className="text-lg font-medium">
                Hello {user?.firstName} {user?.lastName} Welcome to the Dashboard!
            </h2>
        </div>
    )
};

export default DashboardPage;