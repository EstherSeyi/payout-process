import axios from "axios";

const fetch = async (from: string, to: string, amount: number) => {
  try {
    const { data } = await axios.get(
      `http://data.fixer.io/api/convert?access_key=${process.env.REACT_APP_FIXER_ACCESS}&from=${from}&TO=${to}&amount=${amount}`
    );
    return data;
  } catch (error) {
    return error;
  }
};

export default fetch;
