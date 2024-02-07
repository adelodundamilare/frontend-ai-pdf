import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { authRequest } from '../../../config/baseUrl';

const ResetPassword = () => {
const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = async () => {
    try {
      // Check if the new password and confirm password match
      if (newPassword !== confirmPassword) {
        setError("New password and confirm password don't match");
        return;
      }

      const resetToken = new URLSearchParams(window.location.search).get('token');

      const response = await authRequest.post('/accounts/password_reset/confirm/', {
        token: resetToken,
        password: newPassword,
      });

      // Check for success or failure based on the response status
      if (response.status === 200) {
        setMessage('Password reset successful!');
        // Redirect to the login page or another relevant page
        navigate('/login-route')
      } else {
        setError(response.data?.error || 'An error occurred during password reset.');
      }
    } catch (error) {
      setError('An error occurred during password reset.');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Reset Password</h2>
              {message && <Alert variant="success">{message}</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}
              <Form>
                <Form.Group>
                  <Form.Label>New Password:</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Confirm Password:</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="button"
                  block
                  className="mt-4"
                  onClick={handleResetPassword}
                >
                  Reset Password
                </Button>
              </Form>
              <div className="mt-3 text-center">
                <Button variant="link" onClick={() => navigate('/login-route')}>
                  Back to Login
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;
