import { ReactNode } from "react";

type ActionType = {
  type: string;
  payload: {
    modalComponent?: ReactNode;
    isModalOpen?: boolean;
  };
};

const modalReducer = (state = {}, { type, payload }: ActionType) => {
  switch (type) {
    case "REGISTER_COMPONENT":
      return {
        ...state,
        modalComponent: payload.modalComponent,
        isModalOpen: payload.isModalOpen,
      };
    case "UNREGISTER_COMPONENT":
      return {
        ...state,
        modalComponent: null,
        isModalOpen: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export default modalReducer;
