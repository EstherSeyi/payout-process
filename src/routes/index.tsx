import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import * as ROUTES from "../constants/routes";

import Loading from "../component/Loading";
import Layout from "../component/layout";
const Payment = lazy(() => import("../pages/payment"));

const Routes = () => {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Layout>
            <Route path={ROUTES.PAYMENT} component={Payment} />
          </Layout>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default Routes;
