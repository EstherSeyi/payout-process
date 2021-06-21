import { ChangeEventHandler } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { FormikProps } from "formik";

import Button from "../../component/Button";
import { InputWithLabel as Input } from "../../component/Input";
import { Toast } from "../../utils/toast-utils";

import { ValType } from "../../utils/types";
import { amountPageIsInvalid } from "../../helpers/invalid-previous-page";

/**
 * Recipient Component holds the second stage of the Payout Process form
 * @param {formik} object with all the form values and helders
 * @returns jsx
 */
const Recipient = ({ formik }: { formik: FormikProps<ValType> }) => {
  const history = useHistory();

  /**
   * Handles change of the input fields.
   */
  const handleChange = ({ target }: any) => {
    const { name, value } = target;
    formik.setFieldValue(name, value);
    formik.getFieldHelpers(name).setError("");
  };

  /**
   * if data on the amount screen gets lost (for instance if a user refreshes), the user is redirected to refill lost data
   */
  return amountPageIsInvalid(formik) ? (
    <Redirect to={`/amount?page=${1}`} />
  ) : (
    <>
      <div className="border-b border-greyish-550 pb-1">
        <p className="text-base text-purpleish-300 font-semibold">Recipient</p>
        <p className="text-sm text-purpleish-100">
          Who are you sending money to?
        </p>
      </div>
      <div className="my-4">
        <Input
          label="Their email (optional)"
          styles="py-1"
          name="recipientEmail"
          id="recipientEmail"
          value={formik.values.recipientEmail}
          onChange={handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.recipientEmail && formik.touched.recipientEmail}
          errorMessage={formik.errors.recipientEmail}
        />
        <Input
          label="Full name of the account holder"
          styles="py-1"
          name="recipientName"
          value={formik.values.recipientName}
          onChange={handleChange}
          id="recipientName"
          onBlur={formik.handleBlur}
          error={formik.errors.recipientName && formik.touched.recipientName}
          errorMessage={formik.errors.recipientName}
        />
      </div>

      <p className="text-sm text-purpleish-300 font-semibold border-b border-greyish-550 pb-2 mb-4">
        Bank details
      </p>

      <ul className="flex text-sm border-b border-greyish-550 mb-4">
        <li
          className={`px-4     cursor-pointer
          ${
            !formik.values.isEurope
              ? "text-greyish-350"
              : "text-purpleish-250 border-b-2 border-purpleish-250 font-bold"
          }
          
          `}
        >
          Inside Europe
        </li>
        <li
          className={`px-4 cursor-pointer
          ${
            !formik.values.isEurope
              ? "text-purpleish-250 border-b-2 border-purpleish-250 font-bold"
              : "text-greyish-350"
          }
          
          `}
        >
          Outside Europe
        </li>
      </ul>

      {/* Depending on what 'to' currency a user has chosen, they either fill the inputs in the Outside or Inside components */}

      {!formik.values.isEurope ? (
        <Outside
          accNumber={formik.values.accNumberOrIBAN}
          swiftOrBICcode={formik.values.swiftOrBICcode}
          onChange={handleChange}
          onBlur={formik.handleBlur}
          swiftOrBICcodeError={
            formik.errors.swiftOrBICcode && formik.touched.swiftOrBICcode
          }
          accNumberOrIBANError={
            formik.errors.accNumberOrIBAN && formik.touched.accNumberOrIBAN
          }
          swiftOrBICcodeErrorMessage={formik.errors.swiftOrBICcode}
          accNumberOrIBANErrorMessage={formik.errors.accNumberOrIBAN}
        />
      ) : (
        <Inside
          value={formik.values.accNumberOrIBAN}
          onChange={handleChange}
          error={
            formik.errors.accNumberOrIBAN && formik.touched.accNumberOrIBAN
          }
          errorMessage={formik.errors.accNumberOrIBAN}
          onBlur={formik.handleBlur}
        />
      )}

      <Button
        styleClasses="mr-5 mt-4 bg-purpleish-250 text-misc-white font-bold"
        onClick={() => {
          formik.validateForm(formik.values);

          if (formik.isValid && formik.dirty) {
            history.push(`/review?page=${3}`);
          } else
            Toast({
              type: "error",
              message: "Please provide required fields",
            });
        }}
      >
        Continue
      </Button>
    </>
  );
};

const Inside = ({
  value,
  onChange,
  error,
  errorMessage,
  onBlur,
}: {
  value: string;
  error?: any;
  errorMessage?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur?: any;
}) => {
  return (
    <>
      <Input
        label="IBAN"
        styles="py-2 text-xs"
        placeholder="DE98370440018929829032"
        id="accNumberOrIBAN"
        value={value}
        name="accNumberOrIBAN"
        onChange={onChange}
        error={error}
        errorMessage={errorMessage}
        onBlur={onBlur}
      />
    </>
  );
};
const Outside = ({
  onChange,
  accNumber,
  swiftOrBICcode,
  onBlur,
  swiftOrBICcodeError,
  accNumberOrIBANError,
  swiftOrBICcodeErrorMessage,
  accNumberOrIBANErrorMessage,
}: {
  onChange: ChangeEventHandler<HTMLInputElement>;
  accNumber: string;
  swiftOrBICcode: string;
  onBlur?: any;
  swiftOrBICcodeError?: any;
  accNumberOrIBANError?: any;
  swiftOrBICcodeErrorMessage?: string;
  accNumberOrIBANErrorMessage?: string;
}) => {
  return (
    <>
      <Input
        onChange={onChange}
        styles="py-2 text-xs"
        placeholder="BUKBGB22"
        label="SWIFT / BIC code"
        name="swiftOrBICcode"
        value={swiftOrBICcode}
        id="swiftOrBICcode"
        onBlur={onBlur}
        error={swiftOrBICcodeError}
        errorMessage={swiftOrBICcodeErrorMessage}
      />

      <Input
        value={accNumber}
        onChange={onChange}
        styles="py-2 text-xs"
        placeholder="01234567891"
        label="IBAN / Account Number"
        name="accNumberOrIBAN"
        id="accNumberOrIBAN"
        onBlur={onBlur}
        error={accNumberOrIBANError}
        errorMessage={accNumberOrIBANErrorMessage}
      />
    </>
  );
};

export default Recipient;
