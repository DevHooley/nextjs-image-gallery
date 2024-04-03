import { UnsplashImage } from '@/models/unsplash-image';
import Link from 'next/link';
import Image from 'next/image';
import { Alert } from '@/components/bootstrap';

export const metadata = {
  title: 'Static Fetching - Next.js Image Gallery',
};

export default async function Page() {
  const response = await fetch(
    'https://api.unsplash.com/photos/random?client_id=' +
      process.env.UNSPLASH_ACCESS_KEY
  );
  const image: UnsplashImage = await response.json();
  const width = Math.min(500, image.width);
  const height = (width / image.width) * image.height;

  return (
    <div className="d-flex flex-column align-items-center">
      <Alert>
        This page <strong>fetches and caches data at build time.</strong> Even
        though the Unsplash API always returns a new image, we see the same
        image after refreshing the page until we compile the project again.
      </Alert>
      <Image
        src={image.urls.raw}
        alt={image.description || 'No description available'}
        width={width}
        height={height}
        className="rounded shadow mw-100 h-100"
        priority // Add the priority property
      />
      by{' '}
      <Link href={'/users/' + image.user.username}>{image.user.username}</Link>
    </div>
  );
}
