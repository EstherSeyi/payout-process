import { Link } from "react-router-dom";

import Dot from "../icons/Dot";

const Navigation = ({
  stylesClasses,
  page,
}: {
  stylesClasses: string;
  page: string;
}) => {
  return (
    <nav className={stylesClasses}>
      <div className="mx-auto border border-greyish-500  mb-2 w-11/12 relative">
        <Dot
          styleClasses={`absolute -top-0.6 z-10 ${
            page === "recipient"
              ? "right-64%"
              : page === "review"
              ? "right-29%"
              : ""
          }`}
        />
        <div
          className={`border border-purpleish-250 left-0 absolute
          ${
            page === "recipient"
              ? "right-64%"
              : page === "review"
              ? "right-29%"
              : ""
          }
          `}
        ></div>
      </div>
      <ul className="flex text-xs  justify-between items-center text-greyish-250">
        <li className={` ${page === "amount" ? "text-greyish-400" : ""}`}>
          <Link to="/amount">Amount</Link>
        </li>
        <li className={` ${page === "recipient" ? "text-greyish-400" : ""}`}>
          <Link to="/recipient">Recipient</Link>
        </li>
        <li className={` ${page === "review" ? "text-greyish-400" : ""}`}>
          <Link to="/review">Review</Link>
        </li>
        <li className="cursor-not-allowed">Pay</li>
      </ul>
    </nav>
  );
};

export default Navigation;
