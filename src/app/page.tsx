import { Container, Row, Col } from 'react-bootstrap';
import { Alert } from '@/components/bootstrap';

export default function Home() {
  return (
    <Container fluid>
      <Row className="justify-content-center align-items-center">
        <Col xs={12} md={8} lg={6}>
          <Alert>
            <h4>Welcome to Next.js Sample Project!</h4>
            <p>
              This project is designed to showcase and learn the new features of{' '}
              <strong>Next.js</strong>.
            </p>
            <ul>
              <li>Static and dynamic server-side rendering</li>
              <li>Incremental static regeneration</li>
              <li>Client-side rendering</li>
              <li>Route handlers (API endpoints)</li>
              <li>Meta-data API</li>
              <li>And more...</li>
            </ul>
            <p className="mb-0">
              Every page uses a different approach to{' '}
              <strong>fetching and caching data</strong>.
            </p>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
}
