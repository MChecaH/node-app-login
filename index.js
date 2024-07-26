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

// Request handler
const options = {
	host: "localhost",
	path: "/",
	port: "3000",
	method: "POST",
};

app.post("/", (req, res) => {
	var sendRequest = http.request(options, (res) => {
		console.log("Status: " + res.statusCode);
		console.log("Headers: " + JSON.stringify(res.headers));
	});

	sendRequest.on("error", (error) => {
		console.log(error);
	});

	req.write('{ "key": "' + req.body.key + '" }');
});
