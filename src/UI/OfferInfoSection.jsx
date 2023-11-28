const OfferInfoSection = ({ text, value, text2, value2 }) => {
  return (
    <div
      style={{
        fontWeight: "600",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        justifyContent: "space-between",
      }}
    >
      <div>
        <div
          style={{
            color: "#A0B0B9",
            fontSize: "12px",

            lineHeight: "18px",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          {text}
        </div>
        <div style={{ color: "#4A4A4A", fontSize: "14px", lineHeight: "21px" }}>
          {value}
        </div>
      </div>
      <div>
        <div
          style={{
            color: "#A0B0B9",
            fontSize: "12px",

            lineHeight: "18px",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          {text2}
        </div>
        <div style={{ color: "#4A4A4A", fontSize: "14px", lineHeight: "21px" }}>
          {value2}
        </div>
      </div>
    </div>
  );
};

export default OfferInfoSection;
