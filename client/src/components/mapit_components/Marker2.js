// Marker.js
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  width: 37px;
  height: 37px;
  background-image: url(https://icon-library.com/images/pin-icon-png/pin-icon-png-15.jpg);
  background-size: contain;
  background-repeat: no-repeat;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  cursor: grab;
`;

const Marker2 = ({ text, onClick }) => <Wrapper alt={text} onClick={onClick} />;

Marker2.defaultProps = {
  onClick: null,
};

Marker2.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};

export default Marker2;
