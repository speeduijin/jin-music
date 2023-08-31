import { RowDataPacket } from 'mysql2';

declare global {
  namespace Express {
    // tslint:disable-next-line:no-empty-interface
    interface User extends RowDataPacket {
      id: number;
      email: string;
      password: string;
    }
  }
}

export {};
