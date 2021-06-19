import * as Yup from "yup";

export const validationSchema = Yup.object({
  from: Yup.string(),
  to: Yup.string(),
  amount: Yup.string(),
  recipientEmail: Yup.string(),
  recipientName: Yup.string(),
  IBAN: Yup.string(),
  swiftOrBICcode: Yup.string(),
  accNumber: Yup.string(),
});
