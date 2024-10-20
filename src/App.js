import { Navigate, Route, Routes } from "react-router-dom";
import UserToolbar from "./components/Toolbar/UserToolbar";
import { Suspense } from "react";
import Subscribers from "./containers/Subscribers/Subscribers";
import './App.css';

const App = () => {
  //const { user } = useAppSelector((state) => state.userState);
  
  const publicRoutes = (
    <>
      <Route
        path='subscribers'
        element={<Suspense fallback={<></>}>
          <Subscribers/>
        </Suspense>}
      />
    </>
  );
  
  //const privateRoutes = (
  //  <>
  //  </>
  //);
  
  return (
    <div className='App'>
      <UserToolbar/>
      <Routes>
        <Route
          path='*'
          element={<Navigate
            to='/subscribers'
            replace
          />}
        />
        {publicRoutes}
      </Routes>
    </div>
  );
}

export default App;
