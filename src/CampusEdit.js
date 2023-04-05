import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateCampus } from "./store";
import axios from "axios";

const CampusEdit = () => {
  const { id } = useParams();
  const { campuses, students } = useSelector((state) => state);
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const campus = campuses.find((campus) => campus.id === id);
    if (campus) {
      setName(campus.name);
    }
  }, [campuses]);

  const update = async (ev) => {
    ev.preventDefault();
    await dispatch(updateCampus({ name, id }));
    navigate("/campuses");
  };

  return (
    <>
      <div>
        <form onSubmit={update}>
          <label>Name</label>
          <input value={name} onChange={(ev) => setName(ev.target.value)} />
          <button>Update</button>
        </form>
      </div>
      <div>
        <h3>Enrollees:</h3>
        {students.map((student) => {
          return (
            <div
              key={student.id}
              className={student.campusId === id ? "selected" : ""}
            >
              <Link
                to={`/students/${student.id}`}
                className={student.id === id ? "selected" : ""}
              >
                {student.campusId === id ? student.firstName : ""}
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CampusEdit;
