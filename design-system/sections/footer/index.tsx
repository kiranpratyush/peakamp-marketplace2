import {
  SiFacebook,
  SiInstagram,
  SiPinterest,
  SiX,
  SiYoutube,
} from '@icons-pack/react-simple-icons';

import { cache, JSX } from 'react';

import { Streamable } from '@/lib/streamable';
import { FooterHelper as FooterSection } from '@/design-system/sections/footer-section';
import { AmazonIcon } from './payment-icons/amazon';
import { AmericanExpressIcon } from './payment-icons/american-express';
import { ApplePayIcon } from './payment-icons/apple-pay';
import { MastercardIcon } from './payment-icons/mastercard';
import { PayPalIcon } from './payment-icons/paypal';
import { VisaIcon } from './payment-icons/visa';

const paymentIcons = [
  <AmazonIcon key="amazon" />,
  <AmericanExpressIcon key="americanExpress" />,
  <ApplePayIcon key="apple" />,
  <MastercardIcon key="mastercard" />,
  <PayPalIcon key="paypal" />,
  <VisaIcon key="visa" />,
];

const socialIcons: Record<string, { icon: JSX.Element }> = {
  Facebook: { icon: <SiFacebook title="Facebook" /> },
  Twitter: { icon: <SiX title="Twitter" /> },
  X: { icon: <SiX title="X" /> },
  Pinterest: { icon: <SiPinterest title="Pinterest" /> },
  Instagram: { icon: <SiInstagram title="Instagram" /> },
  YouTube: { icon: <SiYoutube title="YouTube" /> },
};



export const Footer = async () => {
  const mockSocialMediaLinks = [
    {
      name:"Facebook",
      url:"https://facebook.com"
    }
  ]

  const logo = "Peak AMP"

  const copyright = `blah blah blah`;

  const contactInformation = undefined;

  const socialMediaLinks = mockSocialMediaLinks
    .filter((socialMediaLink) => Boolean(socialIcons[socialMediaLink.name]))
    .map((socialMediaLink) => ({
      href: socialMediaLink.url,
      icon: socialIcons[socialMediaLink.name]?.icon,
    }));

  const mockSectionsData = 
    {
      category:[{
      name:"Shop All",
      path:"/shop-all"
    }],
    brands:[{
      name:"Shop All",
      path: "/shop-all"
    }]
  }

  const streamableSections = Streamable.from(async () => {

    return [
      {
        title: 'categories',
        links: mockSectionsData.category.map((category:any) => ({
          label: category.name,
          href: category.path,
        })),
      },
      {
        title: 'brands',
        links: mockSectionsData.brands.map((brand:any) => ({
          label: brand.name,
          href: brand.path,
        })),
      },
      {
        title: 'navigate',
        links: []
      },
    ];
  });

  return (
    <FooterSection
      contactInformation={contactInformation}
      contactTitle='contactUs'
      copyright={copyright}
      logo={logo}
      logoHref="/"
      logoLabel='home'
      paymentIcons={paymentIcons}
      sections={streamableSections}
      socialMediaLinks={socialMediaLinks}
    />
  );
};
