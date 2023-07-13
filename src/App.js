import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCampuses, fetchStudents } from "./store";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Campuses from "./Campuses";
import Students from "./Students";
import CampusEdit from "./CampusEdit";
import StudentEdit from "./StudentEdit";
import Sidebar from "./Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();

  // This React Hook is used to dispatch actions when the component mounts, loading the campuses and students data from the server.

  useEffect(() => {
    dispatch(fetchCampuses());
    dispatch(fetchStudents());
  }, []);

  return (
    <div>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/campuses" element={<Campuses />} />
          <Route path="/campuses/:id" element={<CampusEdit />} />
          <Route path="/students" element={<Students />} />
          <Route path="/students/:id" element={<StudentEdit />} />
        </Routes>
      </Sidebar>
    </div>
  );
};

export default App;
