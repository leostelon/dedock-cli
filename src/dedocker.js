import { SpheronClient, ProtocolEnum } from "@spheron/storage";
const token =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlLZXkiOiIwZTFhYTczNTcyZWNjNDRhN2E0ZDU2ZGI0Mzk4ZTM2ZjkzZDQ2MDEzMzEwYzhhMThmNzcxNmE1YTFmMGRmYjk3OGY2MTZjZjQ5ZTdiZDdkMzUxZDYwYmI5NjU3MWYxZTZlZDEwMjRjM2E4YzgwZWQ2YTMwZGRkNzQ3M2RiZGU3NyIsImlhdCI6MTY4MjM1NDUxOSwiaXNzIjoid3d3LnNwaGVyb24ubmV0d29yayJ9.H6zchMgEW2FmvozXQj7s0H07LIUUZQMe55JqOnr_4nE";

const client = new SpheronClient({ token });

const commands = function (program) {
	program
		.command("push")
		.description("Push to dedocker registry.")
		.action(async () => {});
};

module.exports = { commands };
