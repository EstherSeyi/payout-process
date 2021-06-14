const Dot = ({ styleClasses }: { styleClasses: string }) => {
  return (
    <svg
      width="7"
      height="7"
      viewBox="0 0 7 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styleClasses}
    >
      <circle cx="3.5" cy="3.5" r="3.5" fill="#636166" />
    </svg>
  );
};

export default Dot;
