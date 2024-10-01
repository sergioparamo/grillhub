// LayoutWithSidebar.tsx
'use client'
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirebaseApp } from "@/lib/firebase/firebase";
import { useDispatch } from "react-redux";
import { performLogout } from "@/lib/firebase/auth"; // Use the renamed function
import Sidebar from "./Sidebar";
import Spinner from "./Spinner";
import { AppDispatch } from "@/app/store/store";

const { auth } = getFirebaseApp();

interface LayoutWithSidebarProps {
    children: ReactNode;
}

const LayoutWithSidebar = ({ children }: LayoutWithSidebarProps) => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const [user, loading] = useAuthState(auth);
    const [sidebarWidth, setSidebarWidth] = useState("4%");

    const handleLogout = async () => {
        try {
            await performLogout(dispatch); // Call the renamed function
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