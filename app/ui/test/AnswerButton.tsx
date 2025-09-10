import PropTypes from "prop-types";
import {Button} from 'antd'
import React from "react";

export default function AnswerButton({onYes, onNo}: any) {
  return (
    <>
      <h1 style={{fontSize:'32px'}}>childrenToFather</h1>
      <Button onClick={onYes}>YES</Button>
      &nbsp;
      <Button onClick={onNo}>NO</Button>
    </>
  );
}

AnswerButton.propTypes = {
  onYes: PropTypes.func,
  onNo: PropTypes.func,
};
