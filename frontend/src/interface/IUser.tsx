export interface IUser {
    id: string;
    username: string;
    password: string;
    token: string
    role: "admin" | "user"; 
  }
  