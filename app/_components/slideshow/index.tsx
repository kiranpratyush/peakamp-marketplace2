import { Slideshow as SlideshowSection } from '@/design-system/slideshow';

import SlideBg01 from './slide-bg-01.jpg';
import SlideBg02 from './slide-bg-02.jpg';
import SlideBg03 from './slide-bg-03.jpg';

export function Slideshow() {
  const slides = [
    {
      title: 'Slide 1 Title',
      image: {
        src: SlideBg01.src,
        alt: 'Slide 1 Alt Text',
        blurDataUrl: SlideBg01.blurDataURL,
      },
      description: 'Description for slide 1.',
      cta: {
        href: '/shop-all',
        label: 'Shop Now',
      },
    },
    {
      title: 'Slide 2 Title',
      image: {
        src: SlideBg02.src,
        alt: 'Slide 2 Alt Text',
        blurDataUrl: SlideBg02.blurDataURL,
      },
      description: 'Description for slide 2.',
      cta: {
        href: '/shop-all',
        label: 'Shop Now',
      },
    },
    {
      title: 'Slide 3 Title',
      image: {
        src: SlideBg03.src,
        alt: 'Slide 3 Alt Text',
        blurDataUrl: SlideBg03.blurDataURL,
      },
      description: 'Description for slide 3.',
      cta: {
        href: '/shop-all',
        label: 'Shop Now',
      },
    },
  ];

  return <SlideshowSection slides={slides} />;
}
