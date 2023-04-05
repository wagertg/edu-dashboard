import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createStudent } from "./store";
import { useNavigate } from "react-router-dom";

const CreateStudent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const save = async (ev) => {
    ev.preventDefault();
    await dispatch(createStudent({ firstName, lastName }));
    navigate("/students");
  };

  return (
    <form onSubmit={save}>
      <input
        value={firstName}
        onChange={(ev) => setFirstName(ev.target.value)}
      />
      <input value={lastName} onChange={(ev) => setLastName(ev.target.value)} />
      <button>Create</button>
    </form>
  );
};

export default CreateStudent;
