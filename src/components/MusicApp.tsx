import { mount } from 'songLibrary/LibraryApp';
import React, { useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface LibraryAppProps {
    isSignedIn?:boolean;
    isAdmin?:boolean;
}

const LibraryApp: React.FC<LibraryAppProps> = ({isSignedIn, isAdmin = false}) => {
    const ref = useRef<HTMLDivElement | null>(null); // Reference to the container div
    const navigate = useNavigate(); // Hook for navigation
    const location = useLocation(); // Hook for current location

    useEffect(() => {
        if (!ref.current) return;
        ///@ts-expect-error
        const { onParentNavigate } = mount(ref.current, {
            initialPath: location.pathname,
            defaultHistory: 'memory',
            onNavigate: ({ pathname: nextPathname }: { pathname: string }) => {
              if (location.pathname !== nextPathname) {
                navigate(nextPathname); // Sync container navigation
              }
            },
            isSignedIn,
            isAdmin
          });

        const unlisten = () => {
            // Ensure compatibility if `mount` returns additional handlers
            if (onParentNavigate) onParentNavigate({ pathname: location.pathname });
        };

        return () => {
            unlisten(); // Clean up any side effects
        };
    }, [location, navigate]);

    return <div ref={ref} />;
};

export default LibraryApp;
