// import { useState } from "react";
import styled from "styled-components";
// import { useQuery } from "react-query";

import { InputWithSelect as Input } from "../../component/Input";
import Button from "../../component/Button";

import currencies from "../../constants/currencies";
import { getOptions } from "../../helpers/format-data";

const Row = styled.p.attrs({
  className: "flex relative py-2",
})`
  .figure {
    flex: 1 1 20%;
    margin: 0 1em;
  }

  .text {
    flex: 1 1 60%;
    @media (min-width: 625px) {
      flex-basis: 40%;
    }
  }
`;

const Payout = () => {
  // const [currentCurrency, setCurrentCurrency] = useState(null);
  // const { isLoading, error, data, isFetching } = useQuery("converter", () =>
  //   fetch(
  //     `http://data.fixer.io/api/convert?access_key=${process.env.REACT_APP_FIXER_ACCESS}&from=USD&to=NGN&amount=10`
  //   ).then((res) => res.json())
  // );

  // console.log({
  //   isLoading,
  //   error,
  //   data,
  //   isFetching,
  // });

  return (
    <form>
      <div>
        <p className="text-base text-purpleish-300 font-semibold">
          One-time Payout
        </p>
        <p className="text-sm text-purpleish-100">Send money internationally</p>
      </div>
      <Input
        placeholder="You send"
        options={getOptions(currencies)}
        defaultVal={getOptions(currencies)[0].label}
        styleClasses="mt-5 "
        // styleClasses="mt-5 mb-3"
      />
      <div className="border-l-2 border-greyish-500 ml-3 py-3.5 text-greyish-350 w-79% text-xs sm:text-sm">
        <Row>
          <span className="bg-greyish-500 w-4 h-4 rounded-full flex justify-center items-center absolute -left-2.5">
            -
          </span>
          <span className="block figure">3.69 USD </span>
          <span className="block text">Transfer fee</span>
        </Row>
        <Row>
          <span className="bg-greyish-500 w-4 h-4 rounded-full flex justify-center items-center absolute -left-2.5">
            =
          </span>
          <span className="block figure">996.31 EUR</span>
          <span className="block text">Amount we’ll convert</span>
        </Row>
        <Row>
          <span className="bg-greyish-500 w-4 h-4 rounded-full flex justify-center items-center absolute -left-2.5">
            x
          </span>
          <span className="block figure text-purpleish-300">1.14989</span>
          <span className="block text text-purpleish-300 ">
            Guaranteed rate (1hr)
          </span>
        </Row>
      </div>
      <Input
        placeholder="Recipient gets"
        options={getOptions(currencies)}
        defaultVal={getOptions(currencies)[0].label}
      />
      <div className="flex justify-between mt-6">
        <Button styleClasses="mr-5 border border-purpleish-250 text-purpleish-250">
          Compare Rates
        </Button>
        <Button styleClasses=" bg-purpleish-150 text-misc-white">
          Continue
        </Button>
      </div>
    </form>
  );
};

export default Payout;
