import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "react-query";
// import { FormikProps } from "formik";
import { STALE_TIME } from "../../constants/payout";

import { InputWithSelect as Input } from "../../component/Input";
import Button from "../../component/Button";
import { Toast } from "../../utils/toast-utils";
import Compare from "../../component/Compare";

import currencies, { europeOnly } from "../../constants/currencies";
import { getOptions } from "../../helpers/format-data";
import { fetch } from "../../helpers/fetch-data";
// import { ValType } from "../../utils/types";
import { formatCurrency } from "../../helpers/format-data";
import { useModal } from "../../context/modal";
// import debounce from "lodash.debounce";

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

/**
 * Payout Component holds the first stage of the Payout Process form
 * @param formik object with all the form values and helders
 * @returns jsx
 */
const Payout = ({ formik }: any) => {
  const { open } = useModal();
  const history = useHistory();
  const { setFieldValue } = formik;
  const [showDetails, setShowDetails] = useState(false);

  const { from, to, send } = formik.values;

  /**
   * This operation gets the details of 3.69USD transfer fee coverted to the selected 'from' currency
   */
  const { data: fee } = useQuery(
    `transferFee_${from}`,
    () => fetch("USD", from, 3.69),
    {
      enabled: from?.length > 0 && send > 0,
      staleTime: STALE_TIME,
    }
  );

  /**
   * This operation gets the details of the transaction with both currencies and amount being send minus the transfer fee from the fixer server
   */
  const { data, isLoading } = useQuery(
    `convert-request_${send}_${to}_${from}`,
    () => fetch(from, to, Number(send) - fee?.result),
    {
      enabled: from?.length > 0 && send > 0 && to.length > 0,
      staleTime: STALE_TIME,
    }
  );

  /**
   * Sets the value of 'receive' and 'rate' gotten from the request to fixer in state.
   */
  useEffect(() => {
    if (data?.result) {
      setFieldValue("receive", data?.result.toFixed(2));
      setFieldValue("rate", data?.info?.rate.toFixed(4));
    }
  }, [data?.result, setFieldValue, data?.info?.rate]);

  /**
   * Shows the details component depending on if all required inputs have been filled.
   */
  useEffect(() => {
    if (
      from?.length !== 0 &&
      to?.length !== 0 &&
      fee?.result &&
      Number(send) > fee?.result
    ) {
      setShowDetails(true);
    } else {
      setShowDetails(false);
    }
  }, [from?.length, to?.length, fee?.result, send]);

  /**
   * Notifies user  if amount inputed to be sent is less than the transfer fee.
   */
  useEffect(() => {
    if (send !== 0 && fee?.result > Number(send) && to !== "") {
      formik.setFieldValue("receive", 0);
      Toast({
        type: "error",
        message: `'You send' value must be more than transfer fee ${formatCurrency(
          fee?.result.toFixed(2) ?? 0
        )} ${from ?? ""}`,
      });
    }
    // eslint-disable-next-line
  }, [fee?.result, send, to, from]);

  /**
   * Sets transfer fee after response is gotten from the server
   */
  useEffect(() => {
    if (fee?.result) {
      setFieldValue("transferFee", fee?.result);
    }
  }, [fee?.result, setFieldValue]);

  /**
   * Handles change of the 'You send' amount input.
   */
  const handleChange = ({ target }: any) => {
    const { value, name } = target;
    formik.setFieldValue(name, value);
    formik.getFieldHelpers(name).setError("");
  };

  /**
   * Handles change of the currency select fields
   */
  const handleSelectChange = (
    selected: { label: string; value: string },
    { name }: { name: string }
  ) => {
    formik.setFieldValue(name, selected.label);

    if (name === "to") {
      formik.setFieldValue("isEurope", europeOnly.includes(selected.label));
    }
  };

  /**Amount that will be converted and sent to recipient */
  const wellConvert = Number(send) - fee?.result;

  return (
    <div data-testid="payout">
      <p
        className={`italic text-10px text-center ${
          isLoading ? "visible" : "invisible"
        }`}
      >
        Loading...
      </p>

      <div data-testid="payout-header">
        <p className="text-base text-purpleish-300 font-semibold">
          One-time Payout
        </p>
        <p className="text-sm text-purpleish-100">Send money internationally</p>
      </div>
      <Input
        placeholder="You send"
        options={getOptions(currencies)}
        value={formik.values.send}
        onChange={handleChange}
        name="send"
        selectName="from"
        styleClasses={`mt-5 ${!showDetails ? "mb-3" : ""}`}
        onSelectChange={handleSelectChange}
        error={formik.errors.send && formik.touched.send}
        errorMessage={formik.errors.send}
        onBlur={formik.handleBlur}
        defaultVal={
          formik.values.from !== ""
            ? { label: formik.values.from, value: formik.values.from }
            : null
        }
      />

      {showDetails ? (
        <TransactionDetails
          transferFee={`${formatCurrency(fee?.result.toFixed(2) ?? 0)} ${
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
        defaultVal={
          formik.values.to !== ""
            ? { label: formik.values.to, value: formik.values.to }
            : null
        }
        error={formik.errors.to && formik.touched.to}
        errorMessage={formik.errors.to}
        value={formatCurrency(formik.values.receive) ?? 0}
        onChange={handleChange}
        name="receive"
        selectName="to"
        onSelectChange={handleSelectChange}
        disabled={true}
      />
      <div data-testid="button-box" className="flex justify-between mt-6">
        <Button
          // opens modal to compare rates feature
          onClick={() => open(<Compare />)}
          styleClasses="mr-5 border border-purpleish-250 text-purpleish-250"
        >
          Compare Rates
        </Button>
        <Button
          styleClasses="bg-purpleish-150 text-misc-white"
          onClick={() => {
            if (showDetails) {
              history.push(`/recipient?page=${2}`);
            } else {
              Toast({
                type: "error",
                message: "Provide required inputs",
              });
            }
          }}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

/**
 * TransactionDetails will display transaction details conditionally
 * @param props props including transfer fee, amout that will be sent and rate.
 * @returns
 */
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
