# Miden Blockchain Indexing
This repository contains a blockchain indexing project for the Miden blockchain.

## Description
Using gRPC from miden-node and running in a container to get last block header from the miden blockchain.

## Prerequisites
- Have Docker and docker-compose installed
- Add a .env file for the connection in the docker-compose.yaml file
  ```code
    DATABASE_URL = postgres://samy:samy@db:5432/miden
    postgres_usr = samy
    postgres_psw = samy
    POSTGRES_DB = miden
    port = 5432:5432
  
## Installation
To install and run the project locally, follow these steps:
1. Clone the repository:
```bash
git clone https://github.com/SamyKnefati/blockchain-index
```
2. Go to the repository:
```bash
cd blockchain-index
```
  3. Build the docker-compose.yaml file
```bash
docker-compose up --build
```
 4. If you don't see the logs in the terminal once the container is running, run this in a new terminal and wait for next block to be added
 ```bash
docker-compose logs -f app
```

## Links used for the projet
1. Miden node github repo: <br />https://github.com/0xPolygonMiden/miden-node<br />
2. And more specifically the proto files used for the  gRPC connection:<br />
https://github.com/0xPolygonMiden/miden-node/tree/main/crates/proto/proto


