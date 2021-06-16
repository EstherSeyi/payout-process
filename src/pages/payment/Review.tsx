import Button from "../../component/Button";

const Review = () => {
  return (
    <>
      <p className="border-b border-greyish-550 pb-1 mb-6 text-base text-purpleish-300 font-semibold">
        Review details of your transfer
      </p>
      <div className="border-b border-greyish-550 pb-1 text-13px mb-4">
        <div className="text-greyish-350 flex justify-between mb-2">
          <p>You send</p>
          <p className="text-16px text-greyish-450 font-bold">1,000 USD</p>
        </div>
        <div className="text-greyish-350 flex justify-between mb-2">
          <p>Total fees (included)</p>
          <p className=" text-greyish-450">3.69 USD</p>
        </div>
        <div className="text-greyish-350 flex justify-between mb-2">
          <p>Amount we’ll convert</p>
          <p className=" text-greyish-450">996.31 USD</p>
        </div>
        <div className="text-greyish-350 flex justify-between mb-2">
          <p>Guaranteed rate</p>
          <p className=" text-greyish-450">1.10289</p>
        </div>
        <div className="text-greyish-350 flex justify-between mb-4">
          <p>Johnny gets</p>
          <p className="text-16px text-greyish-450 font-bold">1,248.63 EUR</p>
        </div>
      </div>
      <div className="text-greyish-350 flex justify-between mb-2 text-13px">
        <p>Name</p>
        <p className=" text-greyish-450">Johnny Gbadamosi</p>
      </div>
      <div className="text-greyish-350 flex justify-between mb-2 text-13px">
        <p>Email address</p>
        <p className=" text-greyish-450">johnny.gbadamosi@gmail.com</p>
      </div>
      <div className="text-greyish-350 flex justify-between mb-2 text-13px">
        <p>IBAN / Account number</p>
        <p className=" text-greyish-450">DE898919013902102</p>
      </div>

      <Button styleClasses="bg-misc-green text-misc-white mt-8 py-3 focus:outline-none">
        Confirm and continue
      </Button>
    </>
  );
};

export default Review;
