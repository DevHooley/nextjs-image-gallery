import { UnsplashImage } from '@/models/unsplash-image';
import Link from 'next/link';
import Image from 'next/image';
import { Alert } from '@/components/bootstrap';

export const metadata = {
  title: 'dynamic Fetching - Next.js Image Gallery',
};

export const revalidate = 0;

export default async function Page() {
  const response = await fetch(
    'https://api.unsplash.com/photos/random?client_id=' +
      process.env.UNSPLASH_ACCESS_KEY,
    {
      // cache: 'no-store' / 'no-cache',
      // next: { revalidate: 0 },
    }
  );
  const image: UnsplashImage = await response.json();

  const width = Math.min(500, image.width);
  const height = (width / image.width) * image.height;

  return (
    <div className="d-flex flex-column align-items-center">
      <Alert>
        This page <strong>fetches and caches data at runtime.</strong> The
        Unsplash API always returns a new image, so we see a different image
        after refreshing the page.
      </Alert>
      <div style={{ width: '100%', maxWidth: '500px' }}>
        <Image
          src={image.urls.raw}
          alt={image.description || 'No description available'}
          width={500}
          height={Math.floor((500 / image.width) * image.height)}
          className="rounded shadow"
          priority
        />
      </div>
      by{' '}
      <Link href={'/users/' + image.user.username}>{image.user.username}</Link>
    </div>
  );
}
