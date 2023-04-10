import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { destroyStudent, createStudent } from "./store";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { FaTrash } from "react-icons/fa";

const Students = () => {
  const { campuses, students } = useSelector((state) => state);
  const { id } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gpa, setGpa] = useState(0.0);
  const [campusId, setCampusId] = useState("");
  const [errors, setErrors] = useState([]);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const save = async (ev) => {
    ev.preventDefault();
    try {
      await dispatch(
        createStudent({ firstName, lastName, email, gpa, campusId })
      );
      setFirstName("");
      setLastName("");
      setEmail("");
      setGpa(0.0);
      setErrors([]);
      setCampusId([]);
    } catch (ex) {
      setErrors(ex.response.data.error.errors);
    }
    navigate("/students");
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const destroy = (student) => {
    dispatch(destroyStudent(student));
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
          <h1 style={{ color: " #6a000cfe" }}>Students</h1>
        </div>
        <div style={{}}>
          <Button variant="success" size="lg" onClick={handleShow}>
            Create
          </Button>
        </div>
      </div>
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
          paddingTop: "7%",
          paddingLeft: "7%",
        }}
      >
        <Table
          style={{
            backgroundColor: "#fff",
          }}
          bordered
          hover
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>GPA</th>
              <th>School</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => {
              const campus = campuses.find(
                (campus) => campus.id === student.campusId
              );
              return (
                <tr key={student.id}>
                  <Link
                    style={{ textDecoration: "none", color: "green" }}
                    to={`/students/${student.id}`}
                    className={student.id === id ? "selected" : ""}
                  >
                    <td>
                      {student.firstName} {student.lastName}
                    </td>
                  </Link>

                  <td>{student.email}</td>
                  <td>{student.gpa}</td>
                  <td>{campus ? campus.name : "none"} </td>
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <FaTrash
                      style={{ fontSize: "24px", color: "red" }}
                      onClick={() => destroy(student)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Students;
