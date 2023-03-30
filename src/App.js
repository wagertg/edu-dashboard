import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateFoo } from './store';
import { Link, Routes, Route } from 'react-router-dom';
import Quq from './Quq';

const App = ()=> {
  const { foo } = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(updateFoo());
  }, []);

  return (
    <div>
      <h1>JPFP 2212 { foo } </h1>
      <Link to='quq'>Quq</Link>
      <Routes>
        <Route path='/quq' element={ <Quq /> } />
      </Routes>
    </div>
  );
};

export default App;
