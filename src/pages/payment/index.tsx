import { lazy } from "react";
import { useParams } from "react-router-dom";
import { Formik } from "formik";

import Layout from "../../component/layout";

import { ValType } from "../../utils/types";
import { validationSchema } from "../../validation/payout-form";
import initialValues from "../../constants/initialValues";

const Review = lazy(() => import("./Review"));
const Payout = lazy(() => import("./Payout"));
const Recipient = lazy(() => import("./Recipient"));

const Payment = () => {
  const { page } = useParams<any>();

  return (
    <Layout page={page}>
      <Formik
        initialValues={initialValues}
        validateOnBlur={true}
        validateOnChange={false}
        validationSchema={validationSchema}
        onSubmit={async (values: ValType): Promise<void> => {
          console.log(values);
        }}
      >
        {(formik) => (
          <form
            className="mt-16 sm:border border-greyish-550 max-w-lg mx-auto bg-misc-white p-6 mb-4"
            data-testid="payment"
          >
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
