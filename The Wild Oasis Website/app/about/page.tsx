import type { Metadata } from 'next';
import Image from 'next/image';

import { CustomLink } from '../_components/CustomLink';
import { H2 } from '../_components/H2';
import { Main } from '../_components/Main';

export const metadata: Metadata = {
  title: 'About',
};

export default function AboutPage(): JSX.Element {
  return (
    <Main className="flex flex-col gap-y-28">
      <article className="grid auto-rows-max grid-cols-5 items-center gap-x-16">
        <div className="col-span-3">
          <H2>Welcome to The Wild Oasis</H2>
          <div className="flex flex-col gap-y-5">
            <p>
              Where nature&apos;s beauty and comfortable living blend
              seamlessly. Hidden away in the heart of the Italian Dolomites,
              this is your paradise away from home. But it&apos;s not just about
              the luxury cabins. It&apos;s about the experience of reconnecting
              with nature and enjoying simple pleasures with family.
            </p>
            <p>
              Our 8 luxury cabins provide a cozy base, but the real freedom and
              peace you&apos;ll find in the surrounding mountains. Wander
              through lush forests, breathe in the fresh air, and watch the
              stars twinkle above from the warmth of a campfire or your hot tub.
            </p>
            <p>
              This is where memorable moments are made, surrounded by
              nature&apos;s splendor. It&apos;s a place to slow down, relax, and
              feel the joy of being together in a beautiful setting.
            </p>
          </div>
        </div>
        <div className="relative col-span-2 aspect-square bg-primary-800 dark:bg-primary-200">
          <Image
            src="/about-1.jpg"
            fill
            alt="Family sitting around a fire pit in front of cabin"
            className="object-cover object-center"
          />
        </div>
      </article>

      <article className="grid auto-rows-max grid-cols-5 items-center gap-x-16">
        <div className="relative col-span-2 aspect-square bg-primary-800 dark:bg-primary-200">
          <Image
            src="/about-2.jpg"
            alt="Family that manages The Wild Oasis"
            fill
            className="object-cover object-center"
          />
        </div>

        <div className="col-span-3">
          <H2>Managed by our family since 1962</H2>
          <div className="flex flex-col gap-y-5">
            <p>
              Since 1962, The Wild Oasis has been a cherished family-run
              retreat. Started by our grandparents, this haven has been nurtured
              with love and care, passing down through our family as a testament
              to our dedication to creating a warm, welcoming environment.
            </p>
            <p>
              Over the years, we&apos;ve maintained the essence of The Wild
              Oasis, blending the timeless beauty of the mountains with the
              personal touch only a family business can offer. Here, you&apos;re
              not just a guest; you&apos;re part of our extended family. So join
              us at The Wild Oasis soon, where tradition meets tranquility, and
              every visit is like coming home.
            </p>

            <CustomLink
              href="/cabins"
              $variant="primary"
              className="mt-5 self-start"
            >
              Explore our luxury cabins
            </CustomLink>
          </div>
        </div>
      </article>
    </Main>
  );
}
