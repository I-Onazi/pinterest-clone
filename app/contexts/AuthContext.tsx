import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  useAuthenticationStatus,
  useUserData,
  useSignInEmailPassword,
  useSignUpEmailPassword,
  useSignOut,
  User,
} from '@nhost/react';

// Type definitions
interface AuthUser extends User {
  // User already has displayName?: string, so we don't need to redeclare it
}

interface AuthContextType {
  // User state
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Authentication methods
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, displayName?: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  
  // Error handling
  error: string | null;
  clearError: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Nhost hooks
  const { isAuthenticated, isLoading: authLoading } = useAuthenticationStatus();
  const user = useUserData();
  const { signInEmailPassword, isLoading: signInLoading } = useSignInEmailPassword();
  const { signUpEmailPassword, isLoading: signUpLoading } = useSignUpEmailPassword();
  const { signOut: nhostSignOut } = useSignOut();

  // Local state for error handling
  const [error, setError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  // Handle initial authentication check
  useEffect(() => {
    if (!authLoading) {
      setIsInitializing(false);
    }
  }, [authLoading]);

  // Clear error when authentication status changes
  useEffect(() => {
    if (isAuthenticated) {
      setError(null);
    }
  }, [isAuthenticated]);

  // Sign in method
  const signIn = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setError(null);
      const result = await signInEmailPassword(email, password);
      
      if (result.error) {
        const errorMessage = result.error.message || 'Sign in failed. Please try again.';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
      
      return { success: true };
    } catch (err) {
      const errorMessage = 'An unexpected error occurred. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Sign up method
  const signUp = async (
    email: string, 
    password: string, 
    displayName?: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      setError(null);
      const options = displayName ? { displayName } : undefined;
      const result = await signUpEmailPassword(email, password, options);
      
      if (result.error) {
        const errorMessage = result.error.message || 'Sign up failed. Please try again.';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
      
      return { success: true };
    } catch (err) {
      const errorMessage = 'An unexpected error occurred. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Sign out method
  const signOut = async (): Promise<void> => {
    try {
      setError(null);
      await nhostSignOut();
    } catch (err) {
      console.error('Sign out error:', err);
      // Even if sign out fails, we should clear local state
    }
  };

  // Clear error method
  const clearError = (): void => {
    setError(null);
  };

  // Calculate loading state
  const isLoading = isInitializing || authLoading || signInLoading || signUpLoading;

  // Context value
  const value: AuthContextType = {
    user: user as AuthUser | null,
    isAuthenticated,
    isLoading,
    signIn,
    signUp,
    signOut,
    error,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;