export type Comunidade = {
  id: number;
  name: string;
}

export type Usuario = {
  email: string;
  name: string;
  permission: string;
}

export type Convite = {
  communityId: number;
  communityName: string;
  userName: string;
  userEmail: string;
  status: string;
}