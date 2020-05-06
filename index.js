#!/usr/bin/env node

const { getCode, getName } = require("country-list");

const countryName = process.argv.slice(2)[0];
if (countryName) {
  const countryCode = getCode(countryName);
  if (countryCode) {
    console.log(countryCode);
  } else {
    console.error("There may be an error with your country name");
  }
} else {
  console.error("Whoops! You did not enter a country name");
}
