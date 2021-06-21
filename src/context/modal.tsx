import { createContext, useReducer, useContext, ReactNode } from "react";

import { registerComponent, unregisterComponent } from "./actions/modal";
import modalReducer from "./reducers/modal";

const initialState = {
  modalComponent: null,
  isModalOpen: false,
};
const ModalContext = createContext<any>(initialState);

/**
 * ModalProvider
 * @param {Object} props props
 * @returns jsx
 */
const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalState, dispatch] = useReducer(modalReducer, initialState);

  const open = (component: ReactNode) => {
    return dispatch(registerComponent(component));
  };

  const close = () => {
    return dispatch(unregisterComponent());
  };

  return (
    <ModalContext.Provider value={{ modalState, open, close }}>
      {children}
    </ModalContext.Provider>
  );
};

const useModal = () => useContext(ModalContext);

export { ModalProvider, useModal };
