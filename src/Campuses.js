import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { destroyCampus } from "./store";

const Campuses = () => {
  const { campuses, students } = useSelector((state) => state);
  const { id } = useParams();
  const dispatch = useDispatch();

  const destroy = (campus) => {
    dispatch(destroyCampus(campus));
  };

  return (
    <>
      <div>
        <Link to={"/campuses/create"}>ADD Campus</Link>
      </div>
      <div>
        <ul>
          {campuses.map((campus) => {
            const studentLength = students.filter((student) => {
              return student.campusId === campus.id;
            });
            return (
              <li
                key={campus.id}
                className={campus.id === id ? "selected" : ""}
              >
                <img src={campus.image} height={300} width={300}></img>
                <h3>
                  {campus.name} Enrollments:{" "}
                  {studentLength ? Number(studentLength.length) : 0}
                </h3>
                <h3>{campus.address}</h3>

                <Link to={`/campuses/${campus.id}`}>edit</Link>
                <button onClick={() => destroy(campus)}>Delete</button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Campuses;
