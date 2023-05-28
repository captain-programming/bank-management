import { useSelector } from 'react-redux';
import './App.css';
import AllRoutes from './pages/AllRoutes';
import { MoonLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "@emotion/react";

function App() {
  const {loading} = useSelector((store) => store);

  const override = css`
    display: block;
    margin: 0 auto;
  `;

  return (
    <div>
      <AllRoutes />
      {loading &&
        <div className="loader">
          <MoonLoader color={"#123abc"} loading={loading} css={override} size={60} />
        </div>
      }
       <ToastContainer />
    </div>
  );
}

export default App;
