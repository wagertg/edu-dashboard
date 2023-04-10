import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { destroyCampus, createCampus } from "./store";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Carousel from "react-bootstrap/Carousel";
import "react-multi-carousel/lib/styles.css";

const Campuses = () => {
  const { campuses, students } = useSelector((state) => state);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const save = async (ev) => {
    ev.preventDefault();
    try {
      await dispatch(createCampus({ name, address, description }));
      setName("");
      setAddress("");
      setDescription("");
      setErrors[[]];
    } catch (ex) {
      setErrors(ex.response.data.error.errors);
    }
    navigate("/campuses");
  };

  const destroy = (campus) => {
    dispatch(destroyCampus(campus));
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <h1 style={{ color: " #6a000cfe" }}>Schools</h1>
        </div>
        <div>
          <Button variant="success" size="lg" onClick={handleShow}>
            Create
          </Button>
        </div>
      </div>
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Modal show={show} onHide={handleClose}>
            <Modal.Body>
              <Form onSubmit={save}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    value={name}
                    onChange={(ev) => setName(ev.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    value={address}
                    onChange={(ev) => setAddress(ev.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="inputGroup-sizing-lg">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={description}
                    onChange={(ev) => setDescription(ev.target.value)}
                  />
                </Form.Group>
                <Button
                  onClick={handleClose}
                  variant="outline-success"
                  type="submit"
                >
                  Submit
                </Button>
                <ul>
                  {errors.map((error, idx) => {
                    return <li key={idx}>{error.message}</li>;
                  })}
                </ul>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            paddingTop: "7%",
          }}
        >
          <Carousel slide={false}>
            {campuses.map((campus) => {
              const studentLength = students.filter((student) => {
                return student.campusId === campus.id;
              });
              return (
                <Carousel.Item
                  key={campus.id}
                  // className={campus.id === id ? "selected" : ""}
                >
                  <Link to={`/campuses/${campus.id}`}>
                    <img
                      width={650}
                      height={650}
                      alt="slide"
                      src={campus.image}
                    />
                  </Link>
                  <Carousel.Caption>
                    <h3>
                      {studentLength ? Number(studentLength.length) : 0}{" "}
                      Enrollments
                    </h3>
                  </Carousel.Caption>
                  <Carousel.Caption>
                    <Button
                      style={{
                        display: "flex",
                        float: "right",
                        right: "150",
                      }}
                      variant="warning"
                      onClick={() => destroy(campus)}
                    >
                      Delete
                    </Button>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>
      </>
    </>
  );
};

export default Campuses;
