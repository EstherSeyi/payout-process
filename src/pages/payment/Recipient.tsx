import { useState } from "react";

import Button from "../../component/Button";

const Recipient = () => {
  const [outside, setOutside] = useState(false);

  return (
    <form>
      <div className="border-b border-greyish-550 pb-1">
        <p className="text-base text-purpleish-300 font-semibold">Recipient</p>
        <p className="text-sm text-purpleish-100">
          Who are you sending money to?
        </p>
      </div>
      <div className="my-4">
        <label>
          <small className="text-13px text-greyish-350">
            Their email (optional)
          </small>
          <input className="w-full rounded-sm border border-greyish-150 focus:outline-none text-purpleish-300 font-semibold py-1 mb-2" />
        </label>
        <label>
          <small className="text-13px text-greyish-350">
            Full name of the account holder
          </small>
          <input className="w-full rounded-sm border border-greyish-150 focus:outline-none text-purpleish-300 font-semibold py-1 mb-2" />
        </label>
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

      {outside ? <Outside /> : <Inside />}

      <Button styleClasses="mr-5 mt-4 bg-purpleish-250 text-misc-white font-bold">
        Continue
      </Button>
    </form>
  );
};

const Inside = () => {
  return (
    <>
      <label>
        <small className="text-13px text-greyish-350">IBAN</small>
        <input
          className="w-full rounded-sm border border-greyish-150 focus:outline-none text-purpleish-300 font-semibold py-2 pl-2 mb-2 text-xs"
          placeholder="DE98370440018929829032"
        />
      </label>
    </>
  );
};
const Outside = () => {
  return (
    <>
      <label>
        <small className="text-13px text-greyish-350">SWIFT / BIC code</small>
        <input
          className="w-full rounded-sm border border-greyish-150 focus:outline-none text-purpleish-300 font-semibold py-2 pl-2 mb-2 text-xs"
          placeholder="BUKBGB22"
        />
      </label>
      <label>
        <small className="text-13px text-greyish-350">
          IBAN / Account Number
        </small>
        <input
          className="w-full rounded-sm border border-greyish-150 focus:outline-none text-purpleish-300 font-semibold py-2 pl-2 mb-2 text-xs"
          placeholder="01234567891"
        />
      </label>
    </>
  );
};

export default Recipient;
