import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/products");
        setProducts(res.data.products);
      } catch (err) {
        setError(`Couldn't Fetch Products\n ${err}`);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (productId: string) => {
    if (!user) {
      navigate("/signIn");
    } else {
      navigate("/cart");
      console.log(`Product ${productId} added to cart`);
    }
  };

  const viewProduct = (productId: string) => {};

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Our Products</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        {products.map((product: any) => (
          <Col key={product.id} sm={6} md={4} lg={3} className="mb-4">
            <Card className="h-100">
              <Card.Img variant="top" src={product.productURL} />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{product.productName}</Card.Title>
                <Card.Text className="mt-auto">
                  <strong>${product.price.toFixed(2)}</strong>
                </Card.Text>
                <Row>
                  <Col>
                    <Button
                      variant="success"
                      className="mt-3 mx-1"
                      onClick={() => handleAddToCart(product.id)}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      variant="success"
                      className="mt-3"
                      onClick={() => viewProduct(product.id)}
                    >
                      View Product
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Products;
