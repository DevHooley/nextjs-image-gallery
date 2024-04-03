'use client';
import { UnsplashImage } from '@/models/unsplash-image';
import { FormEvent, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

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
      setSearchResults(null);
      setSearchResultsLoadingIsError(false);
      setSearchResultsLoading(true);
      const response = await fetch('/api/search?query=" + query);');
    }
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="search-input">
          <Form.Label>Search query</Form.Label>
          <Form.Control
            name="query"
            placeholder="E.g. fruit, holidays, ocean, ..."
          />
        </Form.Group>
        <Button type="submit" className="mb-3">
          Search
        </Button>
      </Form>
    </div>
  );
}
