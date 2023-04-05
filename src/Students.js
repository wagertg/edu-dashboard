import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { destroyStudent } from "./store";

const Students = () => {
  const { campuses, students } = useSelector((state) => state);
  const { id } = useParams();
  const dispatch = useDispatch();

  const destroy = (student) => {
    dispatch(destroyStudent(student));
  };

  return (
    <>
      <div>
        <Link to={"/students/create"}>ADD STUDENT</Link>
      </div>
      <div>
        <ul>
          {students.map((student) => {
            const campus = campuses.find(
              (campus) => campus.id === student.campusId
            );
            return (
              <li key={student.id}>
                <img src={student.image} height={150} width={150}></img>
                {student.firstName}
                {student.lastName}
                <Link
                  to={`/students/${student.id}`}
                  className={student.id === id ? "selected" : ""}
                >
                  Edit
                </Link>
                Assigned to:
                <Link
                  to={`/campuses/${campus.id}`}
                  className={campus.id === id ? "selected" : ""}
                >
                  {campus ? campus.name : "nobody"}
                </Link>
                <button onClick={() => destroy(student)}>Delete</button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Students;
