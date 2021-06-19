const dot = (img?: string) => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    backgroundImage: `url(${img})`,
    minHeight: "100%",
    borderRadius: 10,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: "15px",
    width: "15px",
  },
});
const emptyCode = () => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    borderRadius: 10,
    border: "1px solid #2c0c6a",
    content: '" "',
    display: "block",
    marginRight: 8,
    height: "15px",
    width: "15px",
  },
});
const textStyle = {
  fontSize: "12px",
  fontWeight: 600,
  color: "#2c0c6a",
};

export const optionStyles = {
  input: (styles: any, { value }: any) => ({
    ...styles,
    ...dot(`${process.env.PUBLIC_URL}/assets/flags/${value.toLowerCase()}.svg`),
    ...textStyle,
  }),
  option: (styles: any, { data }: any) => ({
    ...styles,
    ...dot(
      `${process.env.PUBLIC_URL}/assets/flags/${data.label.toLowerCase()}.svg`
    ),
    ...textStyle,
  }),

  placeholder: (styles: any) => ({ ...styles, ...emptyCode() }),
  singleValue: (styles: any, { data }: any) => ({
    ...styles,
    ...dot(
      `${process.env.PUBLIC_URL}/assets/flags/${data.label.toLowerCase()}.svg`
    ),
    ...textStyle,
  }),
};
