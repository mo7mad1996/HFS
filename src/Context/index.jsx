/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export let Context = createContext("");

export function ContextProvider({ children }) {
  // data
  let [sidebarOpen, setSidebarOpen] = useState(true);
  let [sponsorName, setSponsorName] = useState(null);
  let baseUrl = import.meta.env.VITE_API_URL;
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );

  // on render
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 600) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Context.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
        sponsorName,
        setSponsorName,
        baseUrl,
        user,
        setUser,
      }}
    >
      {children}
    </Context.Provider>
  );
}
