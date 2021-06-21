import { FormikProps } from "formik";

import { ValType } from "../utils/types";

export const amountPageIsInvalid = (formik: FormikProps<ValType>) => {
  return (
    formik.values.from === "" ||
    formik.values.to === "" ||
    formik.values.send === 0 ||
    formik.values.receive === 0
  );
};
