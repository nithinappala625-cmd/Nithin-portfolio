import { getPortfolioData } from "@/lib/kv";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import CustomSections from "@/components/CustomSections";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const data = await getPortfolioData();

  return (
    <>
      <Hero data={data.hero} />
      <About data={data.about} />
      <Experience data={data.experience} />
      <Projects data={data.projects} />
      <Skills data={data.skills} />
      <Education education={data.education} certifications={data.certifications} />
      {data.customSections && data.customSections.length > 0 && (
        <CustomSections data={data.customSections} />
      )}
      <Contact heroData={data.hero} />
    </>
  );
}
