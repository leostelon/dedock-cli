const fs = require("fs")
const path = require("path");
const Formdata = require("form-data");
const { default: axios } = require("axios");

const commands = function (program) {
	program
		.command("push")
		.description("Push to dedocker registry.")
		.action(async () => {
			// Gzip the docker image

			// Get path
			const filePath = path.join(__dirname, './file.txt')

			// Upload to dedocker server
			const form = new Formdata()
			const file = fs.readFileSync(filePath);
			form.append('image', file, 'file.text');

			const response = await axios.post("http://localhost:3000/upload", form, {
				headers: {
					...form.getHeaders(),
				},
			});
			console.log(response)

			// TODO: delete the gzip
		});
};

module.exports = { commands };
