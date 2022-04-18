/// <reference types="node" />
import http from 'http';
export default function createSocket(server: http.Server): void;
export declare function broadCastMessage(type: string, message: any): void;
