import Hero from "./components/Hero";
import RenderGallery from "./components/RenderGallery";
import Tour360 from "./components/Tour360";
import Plans from "./components/Plans";
import ProjectInfo from "./components/ProjectInfo";
import Logo from "./components/Logo";
import Menu from "./components/Menu";
import AutoSectionSnap from "./components/AutoSectionSnap";

export default function Home() {
  return (
    <>
      <AutoSectionSnap />

      <Menu />
      <Hero />
      <RenderGallery />
      <Tour360 />
      <Plans />
      <ProjectInfo />
      <Logo />
    </>
  );
}