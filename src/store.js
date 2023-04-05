import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import axios from "axios";

const campuses = (state = [], action) => {
  if (action.type === "SET_CAMPUSES") {
    return action.campuses;
  }
  if (action.type === "CREATE_CAMPUS") {
    return [...state, action.campus];
  }
  if (action.type === "UPDATE_CAMPUS") {
    state = state.map((campus) => {
      if (campus.id === action.campus.id) {
        return action.campus;
      }
      return campus;
    });
  }
  if (action.type === "DESTROY_CAMPUS") {
    return state.filter((_campus) => _campus.id !== action.campus.id);
  }
  return state;
};

const students = (state = [], action) => {
  if (action.type === "SET_STUDENTS") {
    return action.students;
  }
  if (action.type === "CREATE_STUDENT") {
    return [...state, action.student];
  }
  if (action.type === "UPDATE_STUDENT") {
    state = state.map((student) => {
      if (student.id === action.student.id) {
        return action.student;
      }
      return student;
    });
  }
  if (action.type === "DESTROY_STUDENT") {
    return state.filter((_student) => _student.id !== action.student.id);
  }
  return state;
};

export const fetchCampuses = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/campuses");
    dispatch({ type: "SET_CAMPUSES", campuses: response.data });
  };
};

export const fetchStudents = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/students");
    dispatch({ type: "SET_STUDENTS", students: response.data });
  };
};

export const createCampus = (campus) => {
  return async (dispatch) => {
    const response = await axios.post("/api/campuses", campus);
    dispatch({ type: "CREATE_CAMPUS", campus: response.data });
  };
};

export const createStudent = (student) => {
  return async (dispatch) => {
    const response = await axios.post("/api/students", student);
    dispatch({ type: "CREATE_STUDENT", student: response.data });
  };
};

export const updateCampus = (campus) => {
  return async (dispatch) => {
    const response = await axios.put(`/api/campuses/${campus.id}`, campus);
    dispatch({ type: "UPDATE_CAMPUS", campus: response.data });
  };
};

export const updateStudent = (student) => {
  return async (dispatch) => {
    const response = await axios.put(`/api/students/${student.id}`, student);
    dispatch({ type: "UPDATE_STUDENT", student: response.data });
  };
};

export const destroyCampus = (campus) => {
  return async (dispatch) => {
    await axios.delete(`/api/campuses/${campus.id}`);
    dispatch({ type: "DESTROY_CAMPUS", campus });
  };
};

export const destroyStudent = (student) => {
  return async (dispatch) => {
    await axios.delete(`/api/students/${student.id}`);
    dispatch({ type: "DESTROY_STUDENT", student });
  };
};

const reducer = combineReducers({
  campuses,
  students,
});

const store = createStore(reducer, applyMiddleware(logger, thunk));

export default store;
