import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createCampus } from "./store";
import { useNavigate } from "react-router-dom";

const CampusCreate = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const save = async (ev) => {
    ev.preventDefault();
    await dispatch(createCampus({ name }));
    navigate("/campuses");
  };

  return (
    <form onSubmit={save}>
      <input value={name} onChange={(ev) => setName(ev.target.value)} />
      <button>Create</button>
    </form>
  );
};

export default CampusCreate;
