import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const TruncatedText = ({ text, maxLength = 200 }) => {
  // Se il testo è più corto del limite, lo mostriamo direttamente
  if (text.length <= maxLength) {
    return <span>{text}</span>;
  }

  // Testo troncato
  const truncated = text.slice(0, maxLength) + "...";

  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip>{text}</Tooltip>}
    >
      <span style={{ cursor: "pointer"}}>
        {truncated}
      </span>
    </OverlayTrigger>
  );
};

export default TruncatedText;
