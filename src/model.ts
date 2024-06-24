import * as grpc from '@grpc/grpc-js';
import * as fs from 'fs';
import { ApiClient } from './generated/client';

class GrpcClient {
    private client;

    constructor(serverAddress: string) {
        this.client = new ApiClient(serverAddress, grpc.credentials.createInsecure());
    }

    getNotesById(noteId: string, callback: (error: grpc.ServiceError | null, response: any | null) => void) {
        const note_id = { note_id: { id: noteId } };
        this.client.GetNotesById(note_id, callback);
    }

    getBlockByNumber(number: string, callback: (error: grpc.ServiceError | null, response: any | null) => void) {
        this.client.GetBlockByNumber({ number }, callback);
    }
    getBlockHeaderByNumber(number: string, callback: (error: grpc.ServiceError | null, response: any | null) => void) {
        this.client.GetBlockHeaderByNumber({ number }, callback);
    }
    syncState(callback: (error: grpc.ServiceError | null, response: any | null) => void) {
        this.client.SyncState(callback);
    }

    getAccountDetails(accountId: string, callback: (error: grpc.ServiceError | null, response: any | null) => void) {
        const request = { account_id: { id: accountId } };
        this.client.GetAccountDetails(request, callback);
    }
}

export default GrpcClient;
