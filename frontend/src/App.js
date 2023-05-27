import { useSelector } from 'react-redux';
import './App.css';
import AllRoutes from './pages/AllRoutes';
import { MoonLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "@emotion/react";
import { useEffect } from 'react';

function App() {
  const {toastMessage, toastStatus, error, loading} = useSelector((store) => store);

  const override = css`
    display: block;
    margin: 0 auto;
  `;

  const showToast = () => {
    toastStatus==="error" ? 
    toast.error(toastMessage.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
      closeOnClick: true
    })
    :
    toast.success(toastMessage.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
      closeOnClick: true
    })
  };

  useEffect(() =>{
    error && showToast();
  }, [error]);

  console.log(toastMessage, toastStatus, error)

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
