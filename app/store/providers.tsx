// providers.tsx or layout.tsx
'use client'
import { Provider } from "react-redux";
import store  from "@/app/store/store"; // Import your store and persistor
import { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode; // Specify the type of children here
}

const Providers = ({ children }: RootLayoutProps) => {
  return (
    <Provider store={store}>
      {/* Wrap the app in PersistGate and pass the persistor */}
      {children}
    </Provider>
  );
};

export default Providers;
