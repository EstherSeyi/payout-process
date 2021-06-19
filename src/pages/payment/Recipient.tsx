import { useState, ChangeEventHandler } from "react";
import { useHistory } from "react-router-dom";
import { FormikProps } from "formik";

import Button from "../../component/Button";
import { InputWithLabel as Input } from "../../component/Input";

import { ValType } from "../../utils/types";

const Recipient = ({ formik }: { formik: FormikProps<ValType> }) => {
  const history = useHistory();
  const [outside, setOutside] = useState(false);

  return (
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
          onChange={formik.handleChange}
        />
        <Input
          label="Full name of the account holder"
          styles="py-1"
          name="recipientName"
          value={formik.values.recipientName}
          onChange={formik.handleChange}
          id="recipientName"
        />
      </div>

      <p className="text-sm text-purpleish-300 font-semibold border-b border-greyish-550 pb-2 mb-4">
        Bank details
      </p>

      <ul className="flex text-sm border-b border-greyish-550 mb-4">
        <li
          className={`px-4     cursor-pointer
          ${
            outside
              ? "text-greyish-350"
              : "text-purpleish-250 border-b-2 border-purpleish-250 font-bold"
          }
          
          `}
          onClick={() => setOutside(false)}
        >
          Inside Europe
        </li>
        <li
          className={`px-4 cursor-pointer
          ${
            outside
              ? "text-purpleish-250 border-b-2 border-purpleish-250 font-bold"
              : "text-greyish-350"
          }
          
          `}
          onClick={() => setOutside(true)}
        >
          Outside Europe
        </li>
      </ul>

      {outside ? (
        <Outside
          accNumber={formik.values.accNumberOrIBAN}
          swiftOrBICcode={formik.values.swiftOrBICcode}
          onChange={formik.handleChange}
        />
      ) : (
        <Inside
          value={formik.values.accNumberOrIBAN}
          onChange={formik.handleChange}
        />
      )}

      <Button
        styleClasses="mr-5 mt-4 bg-purpleish-250 text-misc-white font-bold"
        onClick={() => history.push("/review")}
      >
        Continue
      </Button>
    </>
  );
};

const Inside = ({
  value,
  onChange,
}: {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
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
      />
    </>
  );
};
const Outside = ({
  onChange,
  accNumber,
  swiftOrBICcode,
}: {
  onChange: ChangeEventHandler<HTMLInputElement>;
  accNumber: string;
  swiftOrBICcode: string;
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
      />

      <Input
        value={accNumber}
        onChange={onChange}
        styles="py-2 text-xs"
        placeholder="01234567891"
        label="IBAN / Account Number"
        name="accNumberOrIBAN"
        id="accNumberOrIBAN"
      />
    </>
  );
};

export default Recipient;
