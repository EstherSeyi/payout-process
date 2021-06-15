import { ReactNode } from "react";

import Logo from "../icons/Logo";
import Close from "../icons/Close";
import Navigation from "./Navigation";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="bg-greyish-100 h-screen">
      <div className="bg-misc-white">
        <div className="flex w-11/12 sm:w-4/6 mx-auto justify-between p-4">
          <Logo />
          <Navigation stylesClasses="max-w-lg w-4/6 hidden sm:block" />
          <button>
            <Close color="#918DAB" />
          </button>
        </div>
      </div>

      <Navigation stylesClasses="w-11/12 max-w-lg block sm:hidden mx-auto mt-8" />

      <div className="w-11/12 sm:w-4/6 mx-auto">{children}</div>
    </section>
  );
};

export default Layout;