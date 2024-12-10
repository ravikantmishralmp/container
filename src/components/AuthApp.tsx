import mount from 'auth/AuthApp'
import React, { useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
interface AuthAppProps {
  setLoginState: (isSignedIn: boolean, isAdmin: boolean) => void;
}

const AuthApp: React.FC<AuthAppProps> = ({ setLoginState }) => {
  const ref = useRef<HTMLDivElement | null>(null); // Reference to the div where AuthApp will mount
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!ref.current) return;
    ///@ts-expect-error
    const { onParentNavigate } = mount(ref.current, {
      defaultHistory: 'memory',
      initialPath: location.pathname,
      onNavigate: ({ pathname: nextPathname }: { pathname: string }) => {
        console.log("from Container Auth App pathname =" + nextPathname )
        if (location.pathname !== nextPathname) {
          navigate(nextPathname);
        }
      },
      setLoginState,
    });

    //handle parent navigation events
    return () => {
      if (onParentNavigate) {
        onParentNavigate({ pathname: location.pathname });
      }
    };
  }, [location, navigate, setLoginState]);

  return <div ref={ref} />;
};

export default AuthApp;
