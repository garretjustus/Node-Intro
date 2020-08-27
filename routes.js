"use strict";
const express = require("express");
const routes = express.Router();

const movies = [
	{ id: 1, title: "2001: A Space Odyssey", year: 1968, animated: false },
	{ id: 2, title: "2002: A Space Odyssey", year: 1968, animated: false },
	{ id: 3, title: "2003: A Space Odyssey", year: 1968, animated: false },
	{ id: 4, title: "2004: A Space Odyssey", year: 1968, animated: false },
];

let nextId = 5;

// Get /movies - respond with a JSON array of movies
routes.get("/movies", (req, res) => {
	res.json(movies);
});

routes.get("/movies/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const movie = movies.find((movie) => movie.id === id);
	if (movie) {
		res.status(200);
		res.json(movie);
	} else {
		res.status(404);
		res.send(`No movie with id ${id} exists.`);
	}
	res.json(movie);
});

routes.post("/movies", (req, res) => {
	const movie = req.body;
	movie.id = nextId++;
	movies.push(movie);

	res.status(201);
	res.json(movie);
});

routes.delete("/movies/:id", (req, res) => {
	console.log("Ran DELETE");
	const id = parseInt(req.params.id);
	const index = movies.findIndex((movie) => movie.id === id);
	if (index !== -1) {
		movies.splice(index, 1);
	}
	res.status(204);
	res.send();
});

// export routes for us in server.js
module.exports = routes;
