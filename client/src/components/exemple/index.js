import React from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';

// import { Container } from './styles';

export default function exemple() {
  return (
    <ButtonToolbar>
        <Button variant="outline-primary">Primary</Button>
        <Button variant="outline-secondary">Secondary</Button>
        <Button variant="outline-success">Success</Button>
        <Button variant="outline-warning">Warning</Button>
        <Button variant="outline-danger">Danger</Button>
        <Button variant="outline-info">Info</Button>
        <Button variant="outline-light">Light</Button>
        <Button variant="outline-dark">Dark</Button>
    </ButtonToolbar>
  );
}
