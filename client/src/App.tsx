import { FC, Fragment, useState, useEffect, lazy, Suspense } from 'react';

// React Routing Dom Library
import { Route, Routes } from "react-router-dom";

// App.css
import './App.css';

// Components
import Loader from "./components/Modules/Loader/index";

// Dashboard Page
import HomePage from './pages/User/Home/index';

// Dynamic Imports(Code Splittings)
const DetailPage = lazy(() => import("./pages/User/Detail/index"));
const CreatePage = lazy(() => import("./pages/User/Create/index"));
const UpdatePage = lazy(() => import("./pages/User/Update/index"));
const NotFoundPage = lazy(() => import("./pages/404/index"));

const App: FC = () => {

  const [loader, setLoader] = useState<boolean>(true);

  useEffect(() => {
    try {
      setLoader(true);
    } catch (error) {
      console.log('error: ', error);
    } finally {
      setTimeout(() => {
        setLoader(false);
      }, 1500);
    }
  }, []);

  return (
    <Fragment>
      <Suspense fallback={<><Loader /></>}>
        {
          loader ? <Loader /> : (
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/detail/:id" element={<DetailPage />} />
              <Route path="/add" element={<CreatePage />} />
              <Route path="/edit/:id" element={<UpdatePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          )
        }
      </Suspense>
    </Fragment>
  )
}

export default App;