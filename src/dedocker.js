const fs = require("fs")
const util = require("util")
const path = require("path");
const Formdata = require("form-data");
const { default: axios } = require("axios");
const exec = util.promisify(require('child_process').exec);

const commands = function (program) {
	program
		.command("push")
		.description("Push to dedocker registry.")
		.requiredOption("-i, --image <value>", "Image name with tag.")
		.action(async (options) => {
			const image = options.image;
			const tag = image.split(":").pop();
			const name = image.split(":").slice(0, -1).join(":")
			if (!tag || !name) return console.log("Please specify proper image name with tag.");

			// Save docker image
			const { stdout, stderr } = await exec(`docker save -o ${name}.tar ${name}`);
			if (stderr) return console.log("Docker image save failed!");

			// Get path
			const filePath = path.join(__dirname, `../${name}.tar`)

			// Get token
			const token = fs.readFileSync("./config", { encoding: 'utf8', flag: 'r' });
			if (!token || token === "") return console.log("Please login into CLI.");

			// Upload to dedocker server
			const form = new Formdata()
			const file = fs.readFileSync(filePath);
			form.append('file', file, `${name}.tar`);
			form.append("image", image);

			const response = await axios.post("http://localhost:3000/upload", form, {
				headers: {
					...form.getHeaders(),
					Authorization: `Bearer ${token}`
				},
			});
			console.log(response)

			// TODO: delete the gzip
		});

	program.command("login")
		.description("Login to dedocker, provide token.")
		.requiredOption("-t, --token <value>", "Token from web app.")
		.action(async (options) => {
			const token = options.token;
			fs.writeFileSync('./config', token, { flag: 'w' });
		})
};

module.exports = { commands };
