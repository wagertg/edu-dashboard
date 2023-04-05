import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateStudent } from "./store";
import axios from "axios";

const StudentEdit = () => {
  const { id } = useParams();
  const { students } = useSelector((state) => state);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const student = students.find((student) => student.id === id);
    if (student) {
      setFirstName(student.firstName);
      setLastName(student.lastName);
    }
  }, [students]);

  const update = async (ev) => {
    ev.preventDefault();
    await dispatch(updateStudent({ firstName, lastName, id }));
    navigate("/students");
  };

  return (
    <div>
      <form onSubmit={update}>
        <label>First Name</label>
        <input
          value={firstName}
          onChange={(ev) => setFirstName(ev.target.value)}
        />
        <label>Last Name</label>
        <input
          value={lastName}
          onChange={(ev) => setLastName(ev.target.value)}
        />
        <button>Update</button>
      </form>
    </div>
  );
};

export default StudentEdit;
