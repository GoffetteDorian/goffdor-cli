#!/usr/bin/env node

const axios = require("axios").default;
const { getCode } = require("country-list");

const countryName = process.argv.slice(2)[0];
const date = process.argv.slice(2)[1]
  ? process.argv.slice(2)[1]
  : new Date().getFullYear();

const apiURL = "https://date.nager.at/api/v2/publicholidays";

if (countryName) {
  const countryCode = getCode(countryName);
  if (countryCode) {
    axios
      .get(apiURL + `/${date}/${countryCode}`)
      .then((response) => {
        console.log(`For the year ${date}, these are the holidays:`);
        response.data.map((item) => {
          const evt = new Date(item.date);
          const options = {
            weekday: "long",
            month: "long",
            year: "numeric",
            day: "numeric",
          };
          console.log(
            `\t- ${item.name} -> ${evt.toLocaleDateString("fr-FR", options)}`
          );
        });
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    console.error("There may be an error with your country name");
  }
} else {
  console.error("Whoops! You did not enter a country name");
}
