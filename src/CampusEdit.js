import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateCampus, destroyCampus } from "./store";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";

const CampusEdit = () => {
  const { id } = useParams();
  const { campuses, students } = useSelector((state) => state);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const campus = campuses.find((campus) => campus.id === id);
    if (campus) {
      setName(campus.name);
      setAddress(campus.address);
      setDescription(campus.description);
    }
  }, [campuses]);

  const update = async (ev) => {
    ev.preventDefault();
    await dispatch(updateCampus({ name, address, description, id }));
    navigate("/campuses");
  };

  const destroy = (campus) => {
    dispatch(destroyCampus(campus));
    navigate("/campuses");
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
          className="bg-light text-black"
          style={{ boxShadow: "0 0px 20px #6a000cfe", width: "35rem" }}
        >
          {campuses
            .filter((campus) => campus.id === id)
            .map((campus) => {
              return (
                <>
                  <div key={campus.id}>
                    <Card.Img width="500" variant="top" src={campus.header} />

                    <Card.Body>
                      <Card.Title>{campus.name}</Card.Title>
                      <Card.Text>{campus.address}</Card.Text>
                      <Card.Text>{campus.description}</Card.Text>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "Column",
                          marginBottom: "5",
                        }}
                      >
                        <Card.Text>Enrollees: </Card.Text>
                        {students.map((student) => {
                          return (
                            <div
                              style={{}}
                              key={student.id}
                              className={
                                student.campusId === id ? "selected" : ""
                              }
                            >
                              <Link
                                style={{
                                  textDecoration: "none",
                                  color: "green",
                                }}
                                to={`/students/${student.id}`}
                                className={student.id === id ? "selected" : ""}
                              >
                                {student.campusId === id
                                  ? student.firstName + " " + student.lastName
                                  : ""}
                              </Link>
                            </div>
                          );
                        })}
                      </div>
                      <div style={{ marginTop: "2%" }}>
                        <Button variant="outline-warning" onClick={handleShow}>
                          Edit
                        </Button>

                        <Button
                          style={{ marginLeft: "1rem" }}
                          variant="outline-danger"
                          onClick={() => destroy(campus)}
                        >
                          Delete
                        </Button>
                      </div>
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

export default CampusEdit;
