"use client";

// import { SessionProvider } from 'next-auth/react';
const NextNProgress = dynamic(() => import("next-nprogress-bar").then((mod) => mod.AppProgressBar), {
  loading: () => <></>,
  ssr: false,
});
const ToastContainer = dynamic(() => import("react-toastify").then((mod) => mod.ToastContainer), {
  loading: () => <></>,
  ssr: false,
});

import React from "react";
import dynamic from "next/dynamic";
import "react-toastify/dist/ReactToastify.css";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      {/*<SessionProvider session={session}>{children}</SessionProvider>*/}
      <NextNProgress
        height="3px"
        color="#eee"
        shallowRouting
        options={{ showSpinner: false, easing: "ease", speed: 500 }}
      />
      <ToastContainer position="bottom-center" theme="light" />
    </>
  );
}

export default Providers;
