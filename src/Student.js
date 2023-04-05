import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Student = () => {
  const { id } = useParams();
  const { students } = useSelector((state) => state);

  return (
    <div>
      <ul>
        {students
          .filter((student) => student.id === id)
          .map((student) => {
            return <li key={student.id}>{student.firstName}</li>;
          })}
      </ul>
    </div>
  );
};

export default Student;
