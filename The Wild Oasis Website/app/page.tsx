import Image from 'next/image';

import { CustomLink } from './_components/CustomLink';
import backgroundSrc from '@/app/_assets/bg.png';

export default function HomePage(): JSX.Element {
  return (
    <>
      <div className="absolute top-0 z-[-1] h-full w-full bg-primary-900/25 object-cover object-center" />
      <Image
        src={backgroundSrc}
        placeholder="blur"
        alt="Mountains and forests with two cabins"
        className="absolute top-0 z-[-2] h-full w-full object-cover object-top"
      />

      <main className="mt-[-5rem] grid h-full content-center justify-items-center">
        <h2 className="mb-10 text-7xl font-semibold tracking-tight text-primary-100">
          Welcome to paradise
        </h2>
        <CustomLink href="/cabins" $variant="primary" className="text-lg">
          Explore luxury cabins
        </CustomLink>
      </main>
    </>
  );
}
