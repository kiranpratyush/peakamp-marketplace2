import { Slideshow as SlideshowSection } from '@/design-system/slideshow';
import { PRODUCT_IMAGES } from '@/constants/images';


export function Slideshow() {
  const slides = [
    {
      title: 'NMC Black Mass',
      image: {
        src: PRODUCT_IMAGES.NMC,
        alt: 'Slide 1 Alt Text',
      },
      description: 'High-quality NMC black mass with optimal composition for battery manufacturing.',
      cta: {
        href: '/shop-all',
        label: 'Shop Now',
      },
    },
    {
      title: 'LFP Black Mass',
      image: {
        src: PRODUCT_IMAGES.LFP,
        alt: 'Slide 2 Alt Text',
     
      },
      description: 'Premium LFP black mass with consistent quality and high recovery rates.',
      cta: {
        href: '/shop-all',
        label: 'Shop Now',
      },
    },
    {
      title: 'Recycled Aluminium',
      image: {
        src: PRODUCT_IMAGES.ALUMINIUM,
        alt: 'Slide 3 Alt Text',
       
      },
      description: 'Recycled aluminum with excellent quality for various applications.',
      cta: {
        href: '/shop-all',
        label: 'Shop Now',
      },
    },
  ];

  return <SlideshowSection slides={slides} />;
}
