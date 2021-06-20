import styled from "styled-components";
import { ToastContainer } from "react-toastify";

const CustomToast = styled(ToastContainer).attrs({
  className: "toast-container",
  toastClassName: "toast",
  bodyClassName: "body",
  progressClassName: "progress",
})`
  /* .toast-container */
  width: 100% !important;

  @media screen and (min-width: 481px) {
    width: 440px !important;
  }

  @media screen and (min-width: 720px) {
    width: 600px !important;
  }

  /* .toast is passed to toastClassName */
  .toast {
    background-color: #fff0de;
    color: black;
    font-size: 14px;
    padding: 18px 16px;
  }

  /* .Toastify__toast--success is passed for success */
  .Toastify__toast--success {
    border: 1px solid #6fae75;
    background-color: #ffffff;
    color: #2c0c6a;
  }

  /* .Toastify__toast--error is passed for error */
  .Toastify__toast--error {
    border: 1px solid #d40e0e;
    background-color: #ffffff;
    color: #2c0c6a;
  }

  button[aria-label="close"] {
    color: #2c0c6a;
  }
`;

export default CustomToast;
