import { Contact } from '@/components/sections/Contact';
import { DownloadCta } from '@/components/sections/DownloadCta';
import { Expectations } from '@/components/sections/Expectations';
import { Faq } from '@/components/sections/Faq';
import { Features } from '@/components/sections/Features';
import { GraceHour } from '@/components/sections/GraceHour';
import { Hero } from '@/components/sections/Hero';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Problem } from '@/components/sections/Problem';
import { WhoItsFor } from '@/components/sections/WhoItsFor';

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Problem />
      <HowItWorks />
      <Features />
      <GraceHour />
      <Expectations />
      <WhoItsFor />
      <Faq />
      <DownloadCta />
      <Contact />
    </>
  );
}
