import { ReactNode } from "react";
import { Link } from "react-router-dom";

import Logo from "../icons/Logo";
import Close from "../icons/Close";
import Navigation from "./Navigation";

const Layout = ({ children, page }: { children: ReactNode; page: string }) => {
  return (
    <section className="bg-greyish-100 min-h-screen py-4">
      <div className="bg-misc-white">
        <div className="flex w-11/12 sm:w-4/6 mx-auto justify-between py-6">
          <Link aria-label="logo" to="/">
            {" "}
            <Logo />
          </Link>
          <Navigation
            page={page}
            stylesClasses="max-w-lg w-4/6 hidden sm:block"
          />
          <button aria-label="close">
            <Close color="#918DAB" />
          </button>
        </div>
      </div>

      <Navigation
        page={page}
        stylesClasses="w-11/12 max-w-lg block sm:hidden mx-auto mt-8"
      />

      <div className="w-11/12 sm:w-4/6 mx-auto">{children}</div>
    </section>
  );
};

export default Layout;
