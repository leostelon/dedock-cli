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
		.argument('<image>')
		.action(async (image) => {
			console.log("Uploading to Dedocker...\n")

			const tag = image.split(":").pop();
			const name = image.split(":").slice(0, -1).join(":")
			if (!tag || !name) return console.log("Please specify proper image name with tag.");

			// Save docker image
			const { stdout, stderr } = await exec(`docker save -o ${path.join(__dirname, "./" + name)}.tar ${name}:${tag}`);
			if (stderr) return console.log("Docker image save failed!");

			// Get path
			const filePath = path.join(__dirname, `./${name}.tar`)

			// Get token
			const token = fs.readFileSync(path.join(__dirname, './config'), { encoding: 'utf8', flag: 'r' });
			if (!token || token === "") return console.log("Please login into CLI.");

			// Upload to dedocker server
			const form = new Formdata()
			const file = fs.readFileSync(filePath);
			form.append('file', file, `${name}.tar`);
			form.append("image", image);

			const response = await axios.post("http://91mgmk08k5b2t7erab6klh3atc.ingress.america.computer/upload", form, {
				headers: {
					...form.getHeaders(),
					Authorization: `Bearer ${token}`
				},
			});
			console.log(response.data)
			console.log("\nSuccessfully uploaded to Dedocker⚡\n")

			// TODO: delete the gzip
		});

	program.command("pull").description("Pull image from dedocker.").argument('<image>').action(async (image) => {
		let tag;
		let name;
		if (image.includes(":")) {
			tag = image.split(":").pop();
			name = image.split(":").slice(0, -1).join(":")
		} else {
			name = image;
		}
		if (!name) return console.log("Please specify proper image name with tag.");
		if (!tag) console.log("No tag was specified, pulling the latest image.");

		// Get token
		let token;
		try {
			token = fs.readFileSync(path.join(__dirname, './config'), { encoding: 'utf8', flag: 'r' });
		} catch (err) { }

		const response = await axios.get("http://91mgmk08k5b2t7erab6klh3atc.ingress.america.computer/pull?image=" + image, {
			headers: {
				"Content-Type": `application/json`,
				Authorization: "Bearer " + token
			}
		});
		if (response.status !== 200) {
			return console.log(response.data)
		}

		const data = response.data.data;
		console.log("Fetched image from polybase.");
		console.log("Downloading image from Decloud...\n");
		const fileName = data.name.split("/")[1];
		axios({
			method: "get",
			url: `${data.image}/${fileName}.tar`,
			responseType: "stream"
		}).then(async function (response) {
			await response.data.pipe(fs.createWriteStream(`${fileName}.tar`));
			const { stdout, stderr } = await exec(`docker load < ${fileName}.tar`);
			if (stderr) return console.log("Docker image load failed!");
			console.log(`Succefully pulled ${fileName} from Dedocker⚡`);
		});
	});

	program.command("login")
		.description("Login to dedocker, provide token.")
		.requiredOption("-t, --token <value>", "Token from web app.")
		.action(async (options) => {
			const token = options.token;
			fs.writeFileSync(path.join(__dirname, './config'), token, { flag: 'w' });
		})
};

module.exports = { commands };
