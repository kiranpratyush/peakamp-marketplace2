/**
 * Image URL constants for products and other assets
 */

// Base S3 bucket URL for static assets
export const S3_BUCKET_BASE_URL = 'https://pcam-static-home.s3.ap-south-1.amazonaws.com';

// Product images
export const PRODUCT_IMAGES = {
  // Black Mass
  NMC: `${S3_BUCKET_BASE_URL}/nmc.PNG`,
  LFP: `${S3_BUCKET_BASE_URL}/lfp.PNG`,
  LCO: `${S3_BUCKET_BASE_URL}/lco.PNG`,
  
  // Metals
  COPPER: `${S3_BUCKET_BASE_URL}/copper.JPEG`,
  ALUMINIUM: `${S3_BUCKET_BASE_URL}/aluminium.JPEG`,
  STEEL: `${S3_BUCKET_BASE_URL}/steel.PNG`,
  
  // Non-metals
  PLASTIC: `${S3_BUCKET_BASE_URL}/plastic.JPEG`,
  
  // Mixed materials
  MIXED: `${S3_BUCKET_BASE_URL}/mixed-battery.JPEG`,
};

// Helper function to get product image URL
export const getProductImageUrl = (imageName: string): string => {
  return `${S3_BUCKET_BASE_URL}/${imageName}`;
}; 