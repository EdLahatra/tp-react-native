export interface File {
	name: string,
  path: string,
  size: string,
};

export interface requeteSelect {
	table: string,
  where: string[] | undefined,
  limit: string | undefined,
  query: string | undefined,
  like: boolean | undefined,
  operator: string | undefined,
  values: string[] | undefined,
};

export interface Flags {
  flag: boolean,
  files: File[],
  lastFile: string,
};

export interface Counts {
  articles: number,
  reglements: number,
  clients: number,
  utilisateurs: number,
  codebarres: number,
  reglements_verifs: number,
  magasins: number,
  motifs: number,
  parametres: number,
  promos: number,
  messages: number,
};

export const initialCount = {
  articles: 0,
  reglements: 0,
  clients: 0,
  utilisateurs: 0,
  codebarres: 0,
  reglements_verifs: 0,
  magasins: 0,
  motifs: 0,
  parametres: 0,
  promos: 0,
  messages: 0,
};
