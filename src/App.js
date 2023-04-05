import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCampuses, fetchStudents } from "./store";
import { Link, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Campuses from "./Campuses";
import Students from "./Students";
import CampusCreate from "./CampusCreate";
import CreateStudent from "./CreateStudent";
import CampusEdit from "./CampusEdit";
import StudentEdit from "./StudentEdit";

const App = () => {
  const { campuses, students } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCampuses());
    dispatch(fetchStudents());
  }, []);

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/campuses">Campuses ({campuses.length})</Link>
        <Link to="/students">Students ({students.length})</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/campuses" element={<Campuses />} />
        <Route path="/campuses/create" element={<CampusCreate />} />
        <Route path="/campuses/:id" element={<CampusEdit />} />
        <Route path="/students" element={<Students />} />
        <Route path="/students/create" element={<CreateStudent />} />
        <Route path="/students/:id" element={<StudentEdit />} />
      </Routes>
    </div>
  );
};

export default App;
