export type Role = {
  orgID: string;
  role: RoleType;
}

export enum RoleType {
  Admin = 'admin',
  Maintainer = 'maintainer',
  Reporter = 'reporter',
}
