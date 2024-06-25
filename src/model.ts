import * as grpc from '@grpc/grpc-js';
import * as fs from 'fs';
import { ApiClient } from './generated/client';

class GrpcClient {
    private client;

    constructor(serverAddress: string) {
        this.client = new ApiClient(serverAddress, grpc.credentials.createInsecure());
    }

    getBlockHeaderByNumber(number: string, callback: (error: grpc.ServiceError | null, response: any | null) => void) {
        this.client.GetBlockHeaderByNumber({ number }, callback);
    }
    syncState(callback: (error: grpc.ServiceError | null, response: any | null) => void) {
        this.client.SyncState({},callback);
    }

}

export default GrpcClient;
