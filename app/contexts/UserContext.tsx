"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface User {
  _id: string;
  email: string;
  roles: string[];
}

interface UserData {
  user: User | null;
  loading: boolean;
}

const UserContext = createContext<UserData>({ user: null, loading: true });

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserData>({
    user: null,
    loading: true,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/auth/decrypt`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });

        if (response.ok) {
          const { decodedrefreshToken } = await response.json();
          setUserData({ user: decodedrefreshToken.user, loading: false });
        } else {
          console.error("Failed to fetch user data");
          setError("Failed to fetch user data");
          setUserData({ user: null, loading: false }); // Set loading to false even on error
        }
      } catch (error) {
        console.error("An error occurred while fetching user data", error);
        setError("An error occurred while fetching user data");
        setUserData({ user: null, loading: false }); // Set loading to false even on error
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ ...userData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const { user, loading } = useContext(UserContext);
  return { user, loading };
};
