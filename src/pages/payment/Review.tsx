import { FormikProps } from "formik";

import Button from "../../component/Button";

import { ValType } from "../../utils/types";
import { formatCurrency } from "../../helpers/format-data";
import { Toast } from "../../utils/toast-utils";

const Review = ({ formik }: { formik: FormikProps<ValType> }) => {
  return (
    <>
      <p className="border-b border-greyish-550 pb-1 mb-6 text-base text-purpleish-300 font-semibold">
        Review details of your transfer
      </p>
      <div className="border-b border-greyish-550 pb-1 text-13px mb-4">
        <div className="text-greyish-350 flex justify-between mb-2">
          <p>You send</p>
          <p className="text-16px text-greyish-450 font-bold">{`${formatCurrency(
            Number(formik.values.send)
          )} ${formik.values.from}`}</p>
        </div>
        <div className="text-greyish-350 flex justify-between mb-2">
          <p>Total fees (included)</p>
          <p className=" text-greyish-450">
            {formatCurrency(formik.values.transferFee)} {formik.values.from}
          </p>
        </div>
        <div className="text-greyish-350 flex justify-between mb-2">
          <p>Amount we’ll convert</p>
          <p className=" text-greyish-450">{`${formatCurrency(
            Number(formik.values.send) - formik.values.transferFee
          )} ${formik.values.from}`}</p>
        </div>
        <div className="text-greyish-350 flex justify-between mb-2">
          <p>Guaranteed rate</p>
          <p className=" text-greyish-450">{formik.values.rate}</p>
        </div>
        <div className="text-greyish-350 flex justify-between mb-4">
          <p>{formik.values.recipientName.split(" ")[0] ?? "Recipient"} gets</p>
          <p className="text-16px text-greyish-450 font-bold">{`${formatCurrency(
            Number(formik.values.receive)
          )} ${formik.values.to}`}</p>
        </div>
      </div>
      <div className="text-greyish-350 flex justify-between mb-2 text-13px">
        <p>Name</p>
        <p className=" text-greyish-450">{formik.values.recipientName}</p>
      </div>
      <div className="text-greyish-350 flex justify-between mb-2 text-13px">
        <p>Email address</p>
        <p className=" text-greyish-450">{formik.values.recipientEmail}</p>
      </div>
      <div className="text-greyish-350 flex justify-between mb-2 text-13px">
        <p>IBAN / Account number</p>
        <p className=" text-greyish-450">{formik.values.accNumberOrIBAN}</p>
      </div>

      <Button
        styleClasses="bg-misc-green text-misc-white mt-8 py-3 focus:outline-none"
        onClick={() => {
          Toast({
            type: "success",
            message: "Nicely Done ✨ !",
          });
        }}
      >
        Confirm and continue
      </Button>
    </>
  );
};

export default Review;
