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
import { landingPageJsonLd } from '@/lib/jsonld';

export default function LandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(landingPageJsonLd()).replace(/</g, '\\u003c'),
        }}
      />
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
