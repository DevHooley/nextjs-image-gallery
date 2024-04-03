import { UnsplashImage } from '@/models/unsplash-image';
import Image from 'next/image';
import styles from './TopicPage.module.css';
import { Alert } from '@/components/bootstrap';
import { Metadata } from 'next';

interface PageProps {
  params: { topic: string };
}

export function generateMetadata({ params: { topic } }: PageProps): Metadata {
  return {
    title: topic + ' - Next.js Image Gallery',
  };
}

export function generateStaticParams() {
  return ['health', 'fitness', 'cycling', 'coding'].map((topic) => ({ topic }));
}

export default async function Page({ params: { topic } }: PageProps) {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?query=${topic}&count=30&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );
  const images: UnsplashImage[] = await response.json();

  return (
    <main className="d-flex flex-column align-items-center">
      {' '}
      {/* Center main content */}
      <Alert>
        This page uses <strong>generateStaticParams</strong> to render and cache
        static pages at build time, even though the URL has dynamic parameters.
        Pages that are not included in generateStaticParams will be fetched and
        rendered on first access and then{' '}
        <strong>cached for subsequent requests </strong> (this can be disabled)
      </Alert>
      <h1 className="py-4 container-fluid d-flex justify-content-center text-capitalize">
        {topic}
      </h1>
      <div className="d-flex flex-wrap justify-content-center">
        {images.map((image) => (
          <Image
            src={image.urls.raw}
            width={250}
            height={250}
            alt={image.description || 'No description available'}
            key={image.urls.raw}
            className={styles.image}
            priority={image.urls.raw === images[0].urls.raw}
          />
        ))}
      </div>
    </main>
  );
}
