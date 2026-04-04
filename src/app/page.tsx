import Footer from '@/components/landing/footer';
import HeroSection from '@/components/landing/hero';
import { ImagesScrollingAnimation } from '@/components/landing/scroll';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';



export default async function Page() {
  const { userId } = await auth();

  if (userId) {
    redirect('/dashboard');
  }

  return <>
    <HeroSection />
    <ImagesScrollingAnimation />
    <Footer />
  </>
}
