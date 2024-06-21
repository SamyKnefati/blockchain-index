// src/generated/client.ts
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import * as path from 'path';

const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, '../../proto/rpc.proto'),
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }
);
const proto = grpc.loadPackageDefinition(packageDefinition) as any;
// src/generated/client.ts
export const ApiClient = proto.rpc.Api;
