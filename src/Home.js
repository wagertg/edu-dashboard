import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import { Card } from "react-bootstrap";

const Home = () => {
  const { campuses, students } = useSelector((state) => state);

  return (
    <>
      <div>
        <h1 style={{ color: " #6a000cfe" }}>Dashboard</h1>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          alignContent: "center",
          paddingLeft: "7%",
          paddingTop: "7%",
        }}
      >
        <Link style={{ textDecoration: "none" }} to={"/campuses"}>
          <Card
            style={{
              width: "500px",
              height: "300px",
              color: "#fff",
              backgroundColor: "hsl(132, 100%, 18%)",
              marginBottom: "1%",
            }}
          >
            <Card.Body
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              <Card.Title style={{ fontSize: "50px" }}>
                {campuses.length}
              </Card.Title>
              <Card.Title style={{ fontSize: "50px" }}>Schools</Card.Title>
            </Card.Body>
          </Card>
        </Link>

        <Link style={{ textDecoration: "none" }} to={"/students"}>
          <Card
            style={{
              width: "500px",
              height: "300px",
              color: "#fff",
              backgroundColor: "hsl(235, 100%, 18%)",
              marginTop: "1%",
            }}
          >
            <Card.Body
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              <Card.Title style={{ fontSize: "50px" }}>
                {students.length}
              </Card.Title>
              <Card.Title style={{ fontSize: "50px" }}>Students</Card.Title>
            </Card.Body>
          </Card>
        </Link>
      </div>
    </>
  );
};

export default Home;
