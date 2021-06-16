import { lazy } from "react";
import { useParams } from "react-router-dom";

import Layout from "../../component/layout";

const Review = lazy(() => import("./Review"));
const Payout = lazy(() => import("./Payout"));
const Recipient = lazy(() => import("./Recipient"));

const Payment = () => {
  const { page } = useParams<any>();

  return (
    <Layout page={page}>
      <div className="mt-16 sm:border border-greyish-550 max-w-lg mx-auto bg-misc-white p-6">
        {page === "amount" ? (
          <Payout />
        ) : page === "recipient" ? (
          <Recipient />
        ) : page === "review" ? (
          <Review />
        ) : null}
      </div>
    </Layout>
  );
};

export default Payment;
