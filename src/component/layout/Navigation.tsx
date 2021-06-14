import Dot from "../icons/Dot";

const Navigation = ({ stylesClasses }: { stylesClasses: string }) => {
  return (
    <nav className={stylesClasses}>
      <div className="mx-auto border border-greyish-500 mb-2 w-11/12 relative">
        <Dot styleClasses="absolute -top-0.6" />
      </div>
      <ul className="flex text-xs  justify-between items-center text-greyish-250">
        <li className="text-greyish-400">Amount</li>
        <li>Recipient</li>
        <li>Review</li>
        <li>Pay</li>
      </ul>
    </nav>
  );
};

export default Navigation;
