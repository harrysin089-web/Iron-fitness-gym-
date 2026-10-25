"use client";

import dynamic from "next/dynamic";
import { SECTION_IDS } from "@/data/content";
import { useScrollDriver } from "@/hooks/useScrollDriver";
import Nav from "./Nav";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Programs from "./sections/Programs";
import Coaches from "./sections/Coaches";
import Schedule from "./sections/Schedule";
import Membership from "./sections/Membership";
import Join from "./sections/Join";

// The WebGL canvas only exists in the browser.
const Scene = dynamic(() => import("./three/Scene"), { ssr: false });

export default function Experience() {
  useScrollDriver(SECTION_IDS);

  return (
    <>
      <Scene />
      <Nav />
      <main>
        <Hero />
        <About />
        <Programs />
        <Coaches />
        <Schedule />
        <Membership />
        <Join />
      </main>
    </>
  );
}
