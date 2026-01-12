"use client";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// এখানে export এর পর default থাকা জরুরি
export default function ThemeProvider({ children, ...props }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}