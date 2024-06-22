// src/index.ts
import * as grpc from '@grpc/grpc-js';
// src/index.ts
import * as fs from 'fs';

import { ApiClient } from './generated/client';
// src/index.ts
const client = new ApiClient('18.203.155.106:57291', grpc.credentials.createInsecure());

// const request = {
//     number: 250708
// };
const request = { account_id: { id: "0x96dbc8850ff58230" } };

client.GetBlockByNumber({ number: "259538" }, (error: grpc.ServiceError, response: any) => {
    if (error) {
        console.error(error);
        return;

    }



    // const buffer = JSON.stringify(response);
    // const decodedString = Buffer.from(buffer, 'utf8');
    // console.log(decodedString);

    // // const buffer = response.toString();
    // // const decodedString = buffer.toString('utf8');
    // // console.log(decodedString);

    // fs.writeFileSync('buffer.json', decodedString);

    const jsonString = fs.readFileSync('buffer.json', 'utf8');

    // Parse the JSON string into a JavaScript object
    const jsonObject = JSON.parse(jsonString);

    // Decode the data attribute
    const buffer = Buffer.from(jsonObject.block.data);
    const decodedString = buffer.toString('binary');
    
    console.log(buffer.toString('utf8'));
    console.log(buffer.toString('ascii'));
    console.log(buffer.toString('latin1'));
    console.log(buffer.toString('hex'));
    console.log(buffer.toString('base64'));
    // fs.writeFileSync('data.json', buffer);
})

// client.SyncState((error: grpc.ServiceError, response: any) => {
//     if (error) {
//         console.error(error);
//         return;
//     }
//     fs.writeFileSync('sync.json', JSON.stringify(response, null, 2));
// })

// client.GetAccountDetails(request, (error: grpc.ServiceError, response: any) => {
//     if (error) {
//         console.error(error);
//         return;
//     }
//     fs.writeFileSync('acc.json', JSON.stringify(response, null, 2));
// })


