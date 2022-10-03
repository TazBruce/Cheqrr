export type Role = {
  orgID: string;
  role: RoleType;
}

export enum RoleType {
  Owner = 'owner',
  Admin = 'admin',
  Maintainer = 'maintainer',
  Reporter = 'reporter',
}
