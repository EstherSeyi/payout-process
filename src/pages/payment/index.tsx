import { lazy } from "react";
import { useParams } from "react-router-dom";
import { Formik } from "formik";

import Layout from "../../component/layout";

import { ValType } from "../../utils/types";
import { validationSchema } from "../../validation/payout-form";

const Review = lazy(() => import("./Review"));
const Payout = lazy(() => import("./Payout"));
const Recipient = lazy(() => import("./Recipient"));

const Payment = () => {
  const { page } = useParams<any>();

  return (
    <Layout page={page}>
      <Formik
        initialValues={{
          from: "",
          to: "",
          send: "",
          receive: "",
          recipientEmail: "",
          recipientName: "",
          swiftOrBICcode: "",
          accNumberOrIBAN: "",
          transferFee: 0,
          rate: 0,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values: ValType): Promise<void> => {
          console.log(values);
        }}
      >
        {(formik) => (
          <form className="mt-16 sm:border border-greyish-550 max-w-lg mx-auto bg-misc-white p-6">
            {console.log(formik.values)}
            {page === "amount" ? (
              <Payout formik={formik} />
            ) : page === "recipient" ? (
              <Recipient formik={formik} />
            ) : page === "review" ? (
              <Review formik={formik} />
            ) : null}
          </form>
        )}
      </Formik>
    </Layout>
  );
};

export default Payment;
