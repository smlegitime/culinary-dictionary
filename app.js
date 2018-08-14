const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
var app = express();

var culinaryTerms = [
	{
		term: "A la carte",
		defined: "Separately priced items from a menu, not as part of a set meal."
	},
	{
		term: "Acidulation",
		defined: "The process of making something acid with lemon or lime juice."
	},
	{
		term: "Baste",
		defined: "To pour juices or melted fat over meat or other food while cooking to keep it moist."
	},
	{
		term: "Coring",
		defined: "To remove the cental section of some fruits, which contain seeds and tougher material that is not usually eaten."
	}
];

//Parse any data and apply them neatly to our request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(function(req, res, next) {
	console.log(`${req.method} request for ${req.url} - ${JSON.stringify(req.body)}`);
	next();
});

app.use(express.static("./public"));

//Any domain can make a request to our dictionary API
app.use(cors());

//Setting routes and handling the different requests
app.get("/dictionary-api", function(req, res) {
	res.json(culinaryTerms);
});
app.post("/dictionary-api", function(req, res) {
	culinaryTerms.push(req.body);
	res.json(culinaryTerms);
});
app.delete("/dictionary-api/:term", function(req, res) {
	culinaryTerms = culinaryTerms.filter(function(definition) {
		return definition.term.toLowerCase() !== req.params.term.toLowerCase();
	});
	res.json(culinaryTerms);
});

app.listen(3000);

console.log("Express app running on port 3000");

module.exports = app;
