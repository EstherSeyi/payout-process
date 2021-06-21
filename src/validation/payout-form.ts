import * as Yup from "yup";

export const validationSchema = Yup.object({
  from: Yup.string().required("Please select currency."),
  to: Yup.string().required("Please select currency."),
  send: Yup.number()
    .integer("Enter a valid amount")
    .positive("Enter a valid amount")
    .required("An input is required here."),
  receive: Yup.number()
    .positive("Enter a valid amount")
    .required("Ensure value to send is valid and both currencies are selected"),
  transferFee: Yup.number().required("Check 'you send' amount currency"),
  recipientEmail: Yup.string().email("Input must be a valid email"),
  recipientName: Yup.string().required("Please enter recipient's full name"),
  IBAN: Yup.string()
    .ensure()
    .when("isEurope", {
      is: true,
      then: Yup.string().required("IBAN required inside Europe."),
    }),
  swiftOrBICcode: Yup.string().when("isEurope", {
    is: false,
    then: Yup.string().required("SWIFT / BIC code required outside Europe."),
  }),
  accNumberOrIBAN: Yup.string().when("isEurope", {
    is: false,
    then: Yup.string().required(
      "IBAN / Account Number required outside Europe."
    ),
  }),
});
