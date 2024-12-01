import PropTypes from "prop-types";
import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export const TruncatedText = ({ text, maxLength = 100 }) => {
  const isTruncated = text.length > maxLength;
  const displayedText = isTruncated ? `${text.slice(0, maxLength)}...` : text;

  return (
    isTruncated ? (
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip>{text}</Tooltip>}
      >
        <span className="text-truncate d-inline-block w-100" >
          {displayedText}
        </span>
      </OverlayTrigger>
    ) : (
      <span>{text}</span>
    )
  );
};

TruncatedText.propTypes = {
  text: PropTypes.string.isRequired,
  maxLength: PropTypes.number
} 