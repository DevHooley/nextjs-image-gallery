import { UnsplashImage } from '@/models/unsplash-image';
import Link from 'next/link';
import Image from 'next/image';
import { Alert } from '@/components/bootstrap';

export const metadata = {
  title: 'Incremental Static regeneration - Fetching - Next.js Image Gallery',
};

export const revalidate = 15;

export default async function Page() {
  let image;
  try {
    const response = await fetch(
      'https://api.unsplash.com/photos/random?client_id=' +
        process.env.UNSPLASH_ACCESS_KEY
    );
    if (!response.ok) {
      throw new Error('Failed to fetch image from Unsplash API');
    }
    image = await response.json();

    const width = Math.min(500, image.width);
    const height = (width / image.width) * image.height;

    return (
      <div className="d-flex flex-column align-items-center">
        <Alert>
          this page uses <strong>Incremental Static Regeneration (ISR)</strong>{' '}
          to fetch and cache data at runtime. The Unsplash API always returns a
          new image, but we see the same image after refreshing the page until
          the revalidation period expires.
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
        <Link href={'/users/' + image.user.username}>
          {image.user.username}
        </Link>
      </div>
    );
  } catch (error) {
    console.error('Error fetching image:', error);
    return (
      <div className="alert alert-danger" role="alert">
        Failed to fetch image from Unsplash API. Please try again later.
      </div>
    );
  }
}
