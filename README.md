## About Me - Michael Templeton
Hello, QuickNode team! I am a Full-Stack Software Developer with over 10 years of professional experience, passionate about building efficient and scalable solutions. With a diverse background across various technologies and stacks, I’ve taken multiple projects from 0 to 1 — ranging from Content Management Systems and Point of Sales to Factory Embedded Hardware and, a recent favorite, Web3 ecosystems, among others.

Many of my roles have been customer-facing, and I thrive in these environments, bridging the gap between technical and non-technical teams to ensure clarity and impact.

As a natural tinkerer, I’m always optimizing workflows for efficiency — whether by saving minutes on a process or making it more effortless. Over the past three years, I’ve built and managed a Proxmox-based homelab cluster, integrating automation into my daily life and fostering continuous learning.

I'm excited to dive deeper into how my experience aligns with QuickNode's needs and the impact I can bring.

## Running The Project
#### 1. Setting Environment Variables
Please replace the default RPC URL variables `(RPC_SEPOLIA_URL, RPC_HOLESKY_URL, RPC_MAINNET_URL)` of this project's `.env` file with valid ones. 

The ENS Name can be changed via the `ENS_NAME` variable.

This project has validation that will prevent the query command from executing if any of the values are null or remain as the default value provided.

#### 2. Querying Balances
This project can be run directly from your local machine using Node, or by using the included Docker configuration.

**With Docker Compose (recommended)**
```
docker compose up --build
```

##### With Node:
```
npm run queryBalance

or

node queryBalance.js
```

____

### My Journey:

After reading the instructions I first considered which language, library, and RPC provider I wanted to use for my solution. I chose JavaScript paired with Web3.js based on previous experiences. As I'm using an ephemeral environment for this project, I knew that I wanted to use Docker as a way for both the reviewer and I to run the project without worries of dependencies. Quicknode.eth did not resolve on Holesky and Sepolia during testing so I created flexible environment variables that would allow me to pass in not only the RPC Endpoints but also the ENS Name (in which I use resolver.eth to verify my solution is functional). I created a validation mechanic surrounding the `.env` file that would help ensure values are provided for all of the RPC URLs and ENS Name. I then implemented the necessary code for execution and ran through a few tests with the possible addresses I came up with.