import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useQuery } from "react-query";

import { InputWithSelect as Input } from "./Input";
import Button from "./Button";

import { getOptions } from "../helpers/format-data";
import currencies from "../constants/currencies";
import compareSchema from "../validation/compare-rates";
import { formatCurrency } from "../helpers/format-data";
import { fetch } from "../helpers/fetch-data";
import { STALE_TIME } from "../constants/payout";

const Compare = () => {
  const [queryKey, setQuerykey] = useState("");
  const [values] = useState({
    fromCurrency: "",
    toCurrency: "",
    amount: 0,
    conversion: "",
  });
  const formik = useFormik({
    initialValues: values,
    validateOnBlur: true,
    validationSchema: compareSchema,
    onSubmit: async (values: {
      fromCurrency: string;
      toCurrency: string;
      amount: number;
    }) => {
      setQuerykey(`${fromCurrency}${toCurrency}${amount}`);
    },
  });

  const { fromCurrency, toCurrency, amount } = formik.values;

  const { data, isLoading } = useQuery(
    `compare_${fromCurrency}_${toCurrency}`,
    () => fetch(fromCurrency, toCurrency, amount),
    {
      enabled: queryKey !== "",
      staleTime: STALE_TIME,
    }
  );

  const handleChange = ({ target }: any) => {
    const { name, value } = target;

    if (name === "conversion") {
      formik.setFieldValue(name, formatCurrency(Number(value)));
    }
  };

  useEffect(() => {
    if (data?.result) {
      formik.setFieldValue("conversion", formatCurrency(Number(data?.result)));
    }
    // eslint-disable-next-line
  }, [data?.result]);

  const handleSelectChange = (
    selected: { label: string; value: string },
    { name }: { name: string }
  ) => {
    formik.setFieldValue(name, selected.label);
  };

  return (
    <form
      className="mt-16 sm:border border-greyish-550 max-w-lg mx-auto bg-misc-white p-6 mb-4"
      onSubmit={formik.handleSubmit}
    >
      <p className="text-base text-purpleish-300 font-semibold">
        Compare Rates
      </p>

      <Input
        placeholder="Amount"
        name="amount"
        selectName="fromCurrency"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        onSelectChange={handleSelectChange}
        options={getOptions(currencies)}
        value={formik.values.amount}
        error={formik.errors.amount && formik.touched.amount}
        errorMessage={formik.errors.amount}
        styleClasses="mt-5 mb-3"
        defaultVal={
          formik.values.fromCurrency !== ""
            ? {
                label: formik.values.fromCurrency,
                value: formik.values.fromCurrency,
              }
            : null
        }
      />
      {data && <p className="text-xs">Rate: {data?.info?.rate}</p>}

      <Input
        placeholder="Conversion"
        name="conversion"
        selectName="toCurrency"
        onChange={handleChange}
        onBlur={formik.handleBlur}
        onSelectChange={handleSelectChange}
        options={getOptions(currencies)}
        value={formik.values.conversion}
        styleClasses="mt-4 mb-3"
        disabled={true}
        error={formik.errors.toCurrency}
        errorMessage={formik.errors.toCurrency}
        defaultVal={
          formik.values.toCurrency !== ""
            ? {
                label: formik.values.toCurrency,
                value: formik.values.toCurrency,
              }
            : null
        }
      />

      <Button styleClasses="bg-purpleish-150 text-misc-white" type="submit">
        {isLoading ? "Loading..." : "Compare"}
      </Button>
    </form>
  );
};

export default Compare;
