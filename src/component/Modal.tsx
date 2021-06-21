import { useRef, useEffect } from "react";

import { useModal } from "../context/modal";

const Modal = () => {
  const { modalState, close } = useModal();

  const modalRef = useRef<any | null>();

  const handleClick = (event: any) => {
    if (modalRef?.current?.contains(event.target)) {
      return;
    }
    close();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });

  return (
    <div
      className={`modal fixed h-screen w-screen top-0 left-0 overflow-auto bg-blackish-50  z-10 bg-opacity-50 ${
        modalState?.isModalOpen ? "block" : "hidden"
      }`}
    >
      <div className="pt-.5 pr-6">
        <button
          className="block text-white text-55 ml-auto w-max focus:outline-none"
          onClick={() => close()}
          type="button"
        >
          &times;
        </button>
      </div>
      <div ref={modalRef} className="w-11/12 lg:w-2/3 mx-auto">
        {modalState?.modalComponent}
      </div>
    </div>
  );
};

export default Modal;
