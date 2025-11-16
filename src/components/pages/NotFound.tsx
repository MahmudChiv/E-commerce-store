import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="display-1">404</h1>
      <h2 className="mb-4">Page Not Found</h2>
      <p className="text-muted mb-4">
        The page you're looking for doesn't exist or an other error occurred.
      </p>
      <Button variant="success" onClick={() => navigate("/")}>
        Go to Homepage
      </Button>
    </Container>
  );
};

export default NotFound;
