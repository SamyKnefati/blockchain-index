// src/index.ts
import * as grpc from '@grpc/grpc-js';
// src/index.ts
import * as fs from 'fs';

import { ApiClient } from './generated/client';
// src/index.ts
const client = new ApiClient('18.203.155.106:57291', grpc.credentials.createInsecure());

const request = {
    number: 250708
};

client.GetBlockByNumber(request, (error: grpc.ServiceError, response: any) => {
    if (error) {
        console.error(error);
        return;
    }

    fs.writeFileSync('block.json', JSON.stringify(response, null, 2));
    console.log('Response written to block.json');
    // toString('hex');
    // const hash = blockData.slice(0, 64);
    // const hashBuffer = Buffer.from(hash, 'hex');
    const blockData = Buffer.from(response.block);
    const hash = blockData.slice(0, 64);
    console.log(hash)
    // const hashBuffer = Buffer.from(hash, 'hex');
})

client.SyncState(request, request, (error: grpc.ServiceError, response: any) => {
    if (error) {
        console.error(error);
        return;
    }
    fs.writeFileSync('sync.json', JSON.stringify(response, null, 2));
})

client.GetAccountDetails(request, request, (error: grpc.ServiceError, response: any) => {
    if (error) {
        console.error(error);
        return;
    }
    fs.writeFileSync('acc.json', JSON.stringify(response, null, 2));
})


