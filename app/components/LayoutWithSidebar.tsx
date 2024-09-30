// components/LayoutWithSidebar.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirebaseApp } from "@/lib/firebase/firebase";
import Sidebar from "./Sidebar";
import Spinner from "./Spinner";
import { logout } from "@/lib/firebase/auth";

const { auth } = getFirebaseApp();

const LayoutWithSidebar = ({ children }) => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [sidebarWidth, setSidebarWidth] = useState("4%");

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/auth");
    } catch (error) {
      console.error("Error during logout: ", error);
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [user, loading, router]);

  if (loading) return <Spinner />;

  return (
    <div style={{ display: "flex" }}>
      {user && (
        <Sidebar
          email={user.displayName || user.email || "Usuario"}
          handleLogout={handleLogout}
          setSidebarWidth={setSidebarWidth}
        />
      )}

      {/* Contenido principal con ajuste dinámico */}
      <div
        style={{
          marginLeft: user ? sidebarWidth : 0,
          width: user ? `calc(100% - ${sidebarWidth})` : "100%",
          transition: "width 0.3s ease, margin-left 0.3s ease",
          padding: "0px",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default LayoutWithSidebar;