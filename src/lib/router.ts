"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export function navigate(to: string) {
  if (to.startsWith("http")) {
    window.open(to, "_blank", "noopener");
    return;
  }
  const target = to.startsWith("/") ? to : `/${to}`;
  window.location.href = target;
}

export function useRoute() {
  return usePathname();
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}
