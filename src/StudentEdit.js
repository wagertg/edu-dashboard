import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateStudent, destroyStudent } from "./store";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";

const StudentEdit = () => {
  // This React Router Hook allows us to access the `id` parameter from the current route.

  const { id } = useParams();
  const { students, campuses } = useSelector((state) => state);
  // There are several local states initialized in the component. They each have their own state-setting functions.

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gpa, setGpa] = useState(0.0);
  const [campusId, setCampusId] = useState("");
  const [show, setShow] = useState(false);

  // These Hooks provide the `dispatch` function to dispatch actions to the Redux store and the `navigate` function to navigate through the app.

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // These are event handler functions for controlling the visibility

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // This Hook is used to populate the local states with the information of the student whose `id` matches the `id` parameter from the route when the component mounts or the `students` state changes.

  useEffect(() => {
    const student = students.find((student) => student.id === id);
    if (student) {
      setFirstName(student.firstName);
      setLastName(student.lastName);
      setEmail(student.email);
      setGpa(student.gpa);
      setCampusId([]);
    }
  }, [students]);

  // This is an asynchronous event handler function used to update a student's details when a form is submitted. It dispatches an `updateStudent` action, and navigates the user back to the "/students" route.

  const update = async (ev) => {
    ev.preventDefault();
    await dispatch(
      updateStudent({ firstName, lastName, email, gpa, campusId, id })
    );
    navigate("/students");
  };

  // This is an event handler function used to delete a student. It dispatches a `destroyStudent` action and navigates the user back to the "/students" route.

  const destroy = (student) => {
    dispatch(destroyStudent(student));
    navigate("/students");
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "7%",
        }}
      >
        <Card
          style={{
            width: "35rem",
            boxShadow: "0 0px 20px #6a000cfe",
          }}
        >
          {students
            .filter((student) => student.id === id)
            .map((student) => {
              return (
                <>
                  <div key={student.id}>
                    <Card.Img width="35rem" variant="top" src={student.image} />

                    <Card.Body>
                      <Card.Title>
                        {student.firstName} {student.lastName}
                      </Card.Title>
                      <Card.Text>{student.email}</Card.Text>
                      <Card.Text>GPA: {student.gpa}</Card.Text>

                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <Card.Text>School: </Card.Text>
                        {campuses.map((campus) => {
                          return (
                            <div
                              key={campus.id}
                              className={
                                student.campusId === id ? "selected" : ""
                              }
                            >
                              <>
                                <Link
                                  style={{
                                    marginLeft: ".1rem",
                                    textDecoration: "none",
                                    color: "green",
                                  }}
                                  to={`/campuses/${campus.id}`}
                                  className={
                                    campus.id === student.campusId
                                      ? "selected"
                                      : ""
                                  }
                                  variant="primary"
                                >
                                  {student.campusId === campus.id
                                    ? campus.name
                                    : null}
                                </Link>
                              </>
                            </div>
                          );
                        })}
                      </div>

                      <Button variant="outline-warning" onClick={handleShow}>
                        Edit
                      </Button>

                      <Button
                        variant="outline-danger"
                        style={{ marginLeft: "1rem" }}
                        onClick={() => destroy(student)}
                      >
                        Delete
                      </Button>
                    </Card.Body>
                  </div>
                </>
              );
            })}
        </Card>
      </div>
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            <Form onSubmit={update}>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  value={firstName}
                  onChange={(ev) => setFirstName(ev.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  value={lastName}
                  onChange={(ev) => setLastName(ev.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>GPA</Form.Label>
                <Form.Control
                  step={0.1}
                  max={4}
                  min={0}
                  type="number"
                  value={gpa}
                  onChange={(ev) => setGpa(ev.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>School</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={campusId}
                  onChange={(ev) => setCampusId(ev.target.value)}
                >
                  <option>Choose campus</option>
                  {campuses.map((campus) => {
                    return (
                      <option value={campus.id} key={campus.id}>
                        {campus.name}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>

              <Button variant="outline-success" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default StudentEdit;
