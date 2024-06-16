"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getSession } from "../lib/auth";

interface User {
  username: string;
  roles: string[];
}

interface UserData {
  userInfo: User | null;
  loading: boolean;
}

const UserContext = createContext<UserData>({ userInfo: null, loading: true });

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserData>({
    userInfo: null,
    loading: true,
  });
  const [error, setError] = useState("");

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //     //  I have to use a third party library to access cookies inside getsession to be able to use the cookies inside a client component
  //       const session = await getSession();
  //       if (session) {
  //         setUserData({ userInfo: session.username, loading: false });
  //       } else {
  //         console.error("Failed to fetch user data");
  //         setError("Failed to fetch user data");
  //         setUserData({ userInfo: null, loading: false }); // Set loading to false even on error
  //       }
  //     } catch (error) {
  //       console.error("An error occurred while fetching user data", error);
  //       setError("An error occurred while fetching user data");
  //       setUserData({ userInfo: null, loading: false }); // Set loading to false even on error
  //     }
  //   };

  //   fetchUser();
  // }, []);

  return (
    <UserContext.Provider value={{ ...userData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const { userInfo, loading } = useContext(UserContext);
  return { userInfo, loading };
};
