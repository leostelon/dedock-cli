
# Dedocker📦

Dedocker is decentralized private docker registry built completely on [Spheron](https://spheron.network/) stack. And by the way, the Founder of Spheron initially inspired me to make this product!
![Discord Image 1](https://dedocker-39fa247e-ae01-4a2f-ad9d-1b91e6f9e0c0-a76b82.spheron.app/Screenshot_119.png)

And this is how it all started!

![Discord Image 2](https://dedocker-39fa247e-ae01-4a2f-ad9d-1b91e6f9e0c0-a76b82.spheron.app/Screenshot_120.png)
# Get Started

The product contains three code bases, Server to server CLI commands and Client, Client, the GUI which can be accessed in website, And CLI to push and pull images from command line.

1. [Server](https://github.com/leostelon/dedock-server)
2. [Client](https://github.com/leostelon/dedocker-client)
3. [CLI](https://github.com/leostelon/dedock-cli)

**Website**

[Dedocker.xyz](https://dedocker.xyz)

**CLI**
> $ npm install -g dedocker

# Technology

 - Node.js and Express.js server, hosted on **Spheron Decentralized Compute** [[know more]](https://spheron.network/#decentralised-compute)
 - Database, **Polybase** is the database for web3. [[know more]](https://polybase.xyz/)
		 - Find schemas and logic [here](https://github.com/leostelon/dedock-server/tree/main/src/polybase).
- Docker images are stored in Decentralized storage using **Spheron Storage SDK**, [[know more]](https://spheron.network/#storage-sdk)
- React.js, hosted on **Spheron Decentralized Hosting**  [[know more]](https://spheron.network/#decentralized-hosting)

Follow belows steps to run it locally.

## Server⚙️

1. Clone Repo.
> $ git clone https://github.com/leostelon/dedock-server dedocker-server
>  $ cd dedocker-server
2. Add the .env file in the root directory. Add the below variables and replace them with your tokens, respectively.

	  SPHERON_TOKEN= < spheron-webapp-token > [Know More](https://docs.spheron.network/rest-api/#creating-an-access-token)
POLYBASE_NAMESPACE= < polybase-namespace > [Know More](https://explorer.testnet.polybase.xyz/studio)
JWT_SECRET= < your-secret >
3. Run server!
> $ npm run start

## Client💻

1. Clone Repo.
> $ git clone https://github.com/leostelon/dedocker-client dedocker-client
>  $ cd dedocker-client
2. Add the .env file in the root directory. Replace the value accordingly.

		  REACT_APP_SERVER_URL=http://localhost:3000
	  
4. Run client!
> $ npm run start

Note: It may prompt to run on a different port, hit enter.
## CLI💲

1. Clone Repo.
> $ git clone https://github.com/leostelon/dedock-cli dedocker-cli
>  $ cd dedocker-cli
2. Install the package!
> $ npm run build

#### CLI Commands

dedocker [command] [flag]
|Commands|flag  |Description
|--|--|--|
| push |  |Docker image name & tag
| pull |  |Docker image name & tag(optional)
| login |  `-t` |Token from webapp

> $ dedocker -h for more info

## Todo👨‍💻
 - [x] MVP
 - [ ] Private Registry
 - [ ] Add context to polybase, user controls the data.
 - [ ] Integrate Payments