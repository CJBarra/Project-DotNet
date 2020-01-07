import React from "react";
import { Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Container style={{ marginTop: "5em" }}>
      <h1>Home page</h1>
      <h3>
        Get to
        <Link to="/activities"> Planning</Link>
      </h3>
    </Container>
  );
};
export default HomePage;
