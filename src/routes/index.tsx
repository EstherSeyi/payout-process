import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import * as ROUTES from "../constants/routes";

import Loading from "../component/Loading";

const Payment = lazy(() => import("../pages/payment"));
const Home = lazy(() => import("../pages/home"));
const NotFound = lazy(() => import("../pages/not-found"));

const Routes = () => {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path={ROUTES.PAYMENT} component={Payment} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default Routes;
