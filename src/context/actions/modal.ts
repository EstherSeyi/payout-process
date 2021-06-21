import { ReactNode } from "react";

export const registerComponent = (component: ReactNode) => ({
  payload: {
    modalComponent: component,
    isModalOpen: true,
  },
  type: "REGISTER_COMPONENT",
});

export const unregisterComponent = () => ({
  type: "UNREGISTER_COMPONENT",
  payload: {
    modalComponent: null,
    isModalOpen: false,
  },
});
