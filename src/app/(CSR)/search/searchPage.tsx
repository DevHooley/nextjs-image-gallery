'use client';

import { UnsplashImage } from '@/models/unsplash-image';
import { FormEvent, useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import Image from 'next/image';
import styles from './searchPage.module.css';
import { Alert } from '@/components/bootstrap';

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState<UnsplashImage[] | null>(
    null
  );
  const [searchResultsLoading, setSearchResultsLoading] = useState(false);
  const [searchResultsLoadingIsError, setSearchResultsLoadingIsError] =
    useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get('query')?.toString().trim();

    if (query) {
      try {
        setSearchResults(null);
        setSearchResultsLoadingIsError(false);
        setSearchResultsLoading(true);
        const response = await fetch(`/api/search?query=${query}`);
        const images: UnsplashImage[] = await response.json();
        setSearchResults(images);
      } catch (error) {
        console.error(error);
        setSearchResultsLoadingIsError(true);
      } finally {
        setSearchResultsLoading(false);
      }
    }
  }

  return (
    <div>
      <Alert>
        This page fetches data <strong>client-side.</strong> in order to not
        leak API credentials, the request is sent to a NextJS{' '}
        <strong>route handler </strong> that runs on the server. This route
        handler then etches the data from the Unsplash API and returns it to the
        client.
      </Alert>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="search-input">
          <Form.Label>Search query</Form.Label>
          <Form.Control
            name="query"
            placeholder="E.g. fruit, holidays, ocean, ..."
          />
        </Form.Group>
        <Button type="submit" className="mb-3" disabled={searchResultsLoading}>
          Search
        </Button>
      </Form>
      <div className="d-flex flex-column align-items-center">
        {searchResultsLoading && <Spinner animation="border" />}
        {searchResultsLoadingIsError && (
          <p>Something went wrong. please try again.</p>
        )}
        {searchResults && searchResults.length === 0 && (
          <p>Nothing found. Try a different query!</p>
        )}
      </div>

      {searchResults && (
        <>
          {searchResults.map((image) => (
            <Image
              src={image.urls.raw}
              width={250}
              height={250}
              alt={image.description}
              key={image.urls.raw}
              className={styles.image}
            />
          ))}
        </>
      )}
    </div>
  );
}
