import React, { Suspense, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {
  ThemeProvider,
  CssBaseline,
  useTheme,
  useMediaQuery,
  createTheme,
  Box,
} from '@mui/material';
import Header from './components/Header';
import LibraryApp from './components/MusicApp';
import AuthApp from './components/AuthApp';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  const theme = useTheme();
  const [loginState, setLoginState] = useState({
    isSignedIn: false,
    isAdmin: false,
  });
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const setSigninState = (isSignedIn: boolean, isAdmin: boolean) => {
    console.log(
      `From ContainerApp::setLoginState, isSignedIn= ${isSignedIn} and isAdmin= ${isAdmin}`
    );
    setLoginState({ isSignedIn, isAdmin });
  };

  // Theme configuration
  const customTheme = createTheme({
    palette: {
      primary: {
        main: '#1976d2', // Customize primary color
      },
      secondary: {
        main: '#dc004e', // Customize secondary color
      },
      background: {
        default: '#f9f9f9', // Light background color
      },
      divider: '#e0e0e0', 
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
  });

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline /> {/* Normalize browser styles */}
      <BrowserRouter>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh', // Full viewport height
            pl: isSmallScreen ? 1 : 12,
            pr: isSmallScreen ? 1 : 12,
            pb: isSmallScreen ? 1 : 6,
            backgroundColor: customTheme.palette.background.default,
            border: `2px solid ${customTheme.palette.divider}`, // Border around the app
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Shadow effect
            borderRadius: 2, // Rounded corners
          }}
        >
          {/* Header */}
          <Box
            sx={{
              backgroundColor: customTheme.palette.background.default,
              position: 'relative',
              boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.1)', // Shadow for content area
              width: '100%',
              borderBottom: `1px solid ${customTheme.palette.divider}`,
            }}
          >
            <Suspense fallback={<Box>Loading Header...</Box>}>
              <Header
                signedIn={loginState.isSignedIn}
                setLoginState={setSigninState}
              />
            </Suspense>
          </Box>

          {/* Main Content */}
          <Box
            sx={{
              flex: 1, // Take up the remaining space
              backgroundColor: customTheme.palette.background.default, // Slightly different background for content
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Shadow for content area
              borderRadius: 1, // Rounded corners for content
            }}
          >
            <Suspense fallback={<Box>Loading...</Box>}>
              <Routes>
                {/* Auth Route */}
                <Route
                  path="/auth/signin"
                  element={<AuthApp setLoginState={setSigninState} />}
                />

                {/* Auth Route */}
                <Route
                  path="/auth/signup"
                  element={<AuthApp setLoginState={setSigninState} />}
                />

                {/* Protected Routes */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute isSignedIn={loginState.isSignedIn}>
                      <LibraryApp
                        isSignedIn={loginState.isSignedIn}
                        isAdmin={loginState.isAdmin}
                      />
                    </ProtectedRoute>
                  }
                />

                {/* Redirect unknown paths */}
                <Route
                  path="*"
                  element={
                    loginState.isSignedIn ? (
                      <Navigate to="/" replace />
                    ) : (
                      <Navigate to="/auth/signin" replace />
                    )
                  }
                />
              </Routes>
            </Suspense>
          </Box>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
