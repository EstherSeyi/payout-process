import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "react-query";
import { FormikProps } from "formik";
import { debounceTime } from "rxjs/operators";
import { Subject } from "rxjs";

import { InputWithSelect as Input } from "../../component/Input";
import Button from "../../component/Button";

import currencies from "../../constants/currencies";
import { getOptions } from "../../helpers/format-data";
import fetch from "../../helpers/fetch-data";
import { ValType } from "../../utils/types";

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

const queryObs: any = new Subject().pipe(debounceTime(1000));
const Payout = ({ formik }: { formik: FormikProps<ValType> }) => {
  const history = useHistory();
  const { setFieldValue } = formik;
  const [showDetails, setShowDetails] = useState(false);
  const [queryKey, setQueryKey] = useState("");

  const { from, to, send } = formik.values;

  const { data: fee } = useQuery(
    `transferFee_${from}`,
    () => fetch("USD", from, 3.69),
    {
      enabled: from?.length > 0,
    }
  );

  const { data } = useQuery(
    `convert-request_${queryKey}`,
    () => fetch(from, to, Number(send) - fee?.result),
    {
      enabled: from?.length > 0 && send?.length > 0 && to.length > 0,
    }
  );

  useEffect(() => {
    if (data?.result) {
      setFieldValue("receive", data?.result.toFixed(2));
      setFieldValue("rate", data?.info?.rate.toFixed(4));
    }
  }, [data?.result, setFieldValue, data?.info?.rate]);

  useEffect(() => {
    const querySub = queryObs.subscribe(async (deb: any) => {
      setQueryKey(`${deb}`);
    });
    return () => querySub.unsubscribe();
  }, []);

  useEffect(() => {
    if (fee?.result) {
      setFieldValue("transferFee", fee?.result);
    }
  }, [fee?.result, setFieldValue]);

  const handleChange = ({ target }: any) => {
    const { value, name } = target;
    formik.setFieldValue(name, value);
    queryObs.next(value);
  };

  const handleSelectChange = (selected: any, { name }: any) => {
    formik.setFieldValue(name, selected.label);
    queryObs.next(selected.label);
  };

  const handleCompareRates = () => {
    setShowDetails(true);
  };

  const wellConvert = Number(send) - fee?.result;

  return (
    <>
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
        value={formik.values.send}
        onChange={handleChange}
        name="send"
        selectName="from"
        styleClasses={`mt-5 ${!showDetails ? "mb-3" : ""}`}
        onSelectChange={handleSelectChange}
        disabled={formik.values.from === ""}
      />

      {showDetails ? (
        <TransactionDetails
          transferFee={`${fee?.result.toFixed(2) ?? "0.00"} ${
            fee?.query?.to ?? ""
          }`}
          netSend={`${wellConvert.toFixed(2) ?? "0.00"} ${
            data?.query?.from ?? ""
          }`}
          transactionExchangeRate={data?.info?.rate.toFixed(4) ?? "0.00"}
        />
      ) : null}

      <Input
        placeholder="Recipient gets"
        options={getOptions(currencies)}
        defaultVal={getOptions(currencies)[0].label}
        value={formik.values.receive}
        onChange={handleChange}
        name="receive"
        selectName="to"
        onSelectChange={handleSelectChange}
        disabled={true}
      />
      <div className="flex justify-between mt-6">
        <Button
          onClick={handleCompareRates}
          styleClasses="mr-5 border border-purpleish-250 text-purpleish-250"
          disabled={
            from?.length === 0 ||
            to?.length === 0 ||
            !fee?.result ||
            Number(send) <= fee?.result
          }
        >
          Compare Rates
        </Button>
        <Button
          disabled={!showDetails}
          styleClasses="bg-purpleish-150 text-misc-white"
          onClick={() => history.push("/recipient")}
        >
          Continue
        </Button>
      </div>
    </>
  );
};

const TransactionDetails = ({
  transferFee,
  netSend,
  transactionExchangeRate,
}: {
  transferFee: string;
  netSend: string;
  transactionExchangeRate: number;
}) => {
  return (
    <div className="border-l-2 border-greyish-500 ml-3 py-3.5 text-greyish-350 w-79% text-xs sm:text-sm">
      <Row>
        <span className="bg-greyish-500 w-4 h-4 rounded-full flex justify-center items-center absolute -left-2.5">
          -
        </span>
        <span className="block figure">{transferFee} </span>
        <span className="block text">Transfer fee</span>
      </Row>
      <Row>
        <span className="bg-greyish-500 w-4 h-4 rounded-full flex justify-center items-center absolute -left-2.5">
          =
        </span>
        <span className="block figure">{netSend}</span>
        <span className="block text">Amount we’ll convert</span>
      </Row>
      <Row>
        <span className="bg-greyish-500 w-4 h-4 rounded-full flex justify-center items-center absolute -left-2.5">
          x
        </span>
        <span className="block figure text-purpleish-300">
          {transactionExchangeRate}
        </span>
        <span className="block text text-purpleish-300 ">
          Guaranteed rate (1hr)
        </span>
      </Row>
    </div>
  );
};

export default Payout;
