export type Role = 'admin' | 'viewer';

export interface User {
  id: string;
  name: string;
  role: Role;
  country: string;
}

export interface DataEntry {
  id: string;
  title: string;
  description: string;
  country: string;
  createdAt: string;
  updatedAt: string;
}