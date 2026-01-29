import Image from 'next/image';
import { getAssetPath } from '../utils/path';

/**
 * PrefixedImage - Wrapper around Next.js Image that automatically prefixes paths with basePath
 * Use this instead of Next.js Image component for static assets that need basePath
 */
const PrefixedImage = ({ src, ...props }) => {
  const prefixedSrc = getAssetPath(src);
  return <Image src={prefixedSrc} {...props} />;
};

export default PrefixedImage;

