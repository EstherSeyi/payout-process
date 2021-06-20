import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

let options: any = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const Toast = (opt: { type: string; message: string }) => {
  opt.type === "error"
    ? toast.error(opt.message, options)
    : toast.success(opt.message, options);
};
