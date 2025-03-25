export enum Role {
  Consumer = 'consumer',
  Admin = 'admin',
}

export const RoleIdMapping: Record<Role, string> = {
  [Role.Consumer]: "0f0462d9-11a6-41b6-8e90-8be83206fdba", // Database ID for "consumer"
  [Role.Admin]: "7c744383-c745-48bb-965e-cfc310fbb2fc",    // Database ID for "admin"
};