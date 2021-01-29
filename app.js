const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const querystring = require("querystring");
const axios = require("axios");


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname)));

const getApiResponse = async (city) => {
  try {
    const response = await axios.get(
      "https://api.openweathermap.org/" +
        `/data/2.5/weather?q=${querystring.escape(city)}&appid=${
          process.env.API_KEY
        }`
    );
    return response;
  } catch (error) {}
};

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/location", async (req, response) => {
  //console.log('posted the location: ', req.body.search_query);
  let res = getApiResponse(req.body.search_query);
  res
    .then((data) => {
      console.log('data outgoing: ',data.data.coord);
      response.render("location", {
        query: req.body.search_query,
        data: (data.data),
      });
    })
    .catch((err) => {
        console.log('error : ',err)
      response.render("notFound", {
        message: `${req.body.search_query} City not Found in our database`,
      });
    });
});

app.listen(5000, () => {
  console.log("Server started on ", 5000);
});
