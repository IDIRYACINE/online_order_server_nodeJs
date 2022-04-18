import { Database } from "firebase-admin/lib/database/database";
import { Storage } from "firebase-admin/lib/storage/storage";
export declare function UploadFile(file: any): Promise<void>;
export declare function DonwloadFile(downloadUrl: string): Promise<void>;
export declare function SynchroniseDatabase(): Promise<void>;
export default function StorageService(storage: Storage, database: Database): void;
