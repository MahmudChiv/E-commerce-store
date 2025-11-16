
import { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("/api/auth/signIn", {
        email,
      });
      const { msg, token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
      }

      if (msg === "User exists, proceed to set password") {
        navigate("/setPassword");
      } else if (msg === "User exists, proceed to add your firstname and lastname") {
        navigate("/setProfile");
      } else if (msg === "User exists, proceed to login") {
        navigate("/login");
      } else if (response.status === 201) {
        // New user created, redirect to set password
        navigate("/setPassword");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred during sign in.");
      console.log(err)
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div className="w-50">
        <h2 className="text-center mb-4">Sign In</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Button variant="success" type="submit" className="w-100">
            Sign In
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default SignIn;
