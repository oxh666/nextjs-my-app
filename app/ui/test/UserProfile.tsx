'use client'
import PropTypes from "prop-types";
import React from 'react';

UserProfile.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  favouriteColors: PropTypes.arrayOf(PropTypes.string).isRequired,
  isAvailable: PropTypes.bool.isRequired,
};

interface IUserProfile {
  name: string,
  age: null | number,
  favouriteColors: string[],
  isAvailable: boolean
}

export default function UserProfile({
                                      name = "",
                                      age = null,
                                      favouriteColors = [],
                                      isAvailable = false,
                                    }: IUserProfile
): React.JSX.Element {
  return (
    <>
      <h1 style={{fontSize:'32px'}}>props</h1>
      <p>My name is {name}!</p>
      <p>My age is {age}!</p>
      <p>My favourite colors are {favouriteColors.join(", ")}!</p>
      <p>I am {isAvailable ? "available" : "not available"}</p>
    </>
  );
}


