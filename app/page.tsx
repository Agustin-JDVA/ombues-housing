"use client";

import { useState } from "react";

import Hero from "./components/Hero";
import RenderGallery from "./components/RenderGallery";
import Tour360 from "./components/Tour360";
import Plans from "./components/Plans";
import ProjectInfo from "./components/ProjectInfo";
import Logo from "./components/Logo";
import Menu from "./components/Menu";
import AutoSectionSnap from "./components/AutoSectionSnap";

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);

  const handleEnterProject = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });

    setHasEntered(true);
  };

  const handleExitProject = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });

    setHasEntered(false);
  };

  return (
    <>
      {!hasEntered ? (
        <>
          {/* PORTADA */}
          <Hero
            introMode={true}
            onEnter={handleEnterProject}
          />

          {/* JDVA EN PORTADA */}
          <Logo />
        </>
      ) : (
        <>
          {/* SECCIONES DEL PROYECTO */}
          <AutoSectionSnap />

          <Menu
            onExitProject={handleExitProject}
          />

          {/* JDVA ARRIBA A LA IZQUIERDA */}
          <Logo projectMode />

          <Hero />

          <RenderGallery />

          <Tour360 />

          <Plans />

          <ProjectInfo />
        </>
      )}
    </>
  );
}