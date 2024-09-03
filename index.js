// Express App Init
const express = require("express");
const http = require("http");
const path = require("path");
const app = express();

let port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
	console.log("Joined in port:", port);
});

// Routing
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.post("/", (req, res) => {
	// API test
	fetch("http://api.coindesk.com/v1/bpi/currentprice.json", {
		method: "GET",
	})
		.then((response) => response.json())
		.then((body) =>
			fetch("http://localhost:3000/", {
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},

				body: JSON.stringify({
					key: req.body.key,
					USD: body.bpi.USD.rate,
					GBP: body.bpi.GBP.rate,
					EUR: body.bpi.EUR.rate,
				}),
			}).then((response) => {
				console.log(response);
				res.redirect(response.url);
			})
		);
});
