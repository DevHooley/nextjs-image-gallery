import { Spinner } from 'react-bootstrap';

export default async function Loading() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return <Spinner animation="border" className="d-block m-auto" />;
}
