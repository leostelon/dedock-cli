#!/usr/bin/env node

const { Command } = require("commander");

const cliPackageJson = require("../package.json");
const { commands } = require("./dedocker");

const program = new Command();

program
	.name("dedocker")
	.description("CLI part of the operator dashboard")
	.version(cliPackageJson.version);

program
	.command("status")
	.description("Checks whether cli is up and running.")
	.action(() => {
		console.log("Working");
	});

commands(program);

// Run the program and parse the cli
program.parse(process.argv);
