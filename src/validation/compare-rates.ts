import * as Yup from "yup";

const compareSchema = Yup.object({
  fromCurrency: Yup.string().required("Please select currency."),
  toCurrency: Yup.string().required("Please select currency."),
  amount: Yup.number()
    .integer("Enter a valid amount")
    .positive("Enter a valid amount")
    .required("An input is required here."),
});

export default compareSchema;
