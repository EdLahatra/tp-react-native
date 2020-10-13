/**
 * React Native SQLite Demo
 * Copyright (c) 2018-2020 Bruce Lefebvre <bruce@brucelefebvre.com>
 * https://github.com/blefebvre/react-native-sqlite-demo/blob/master/LICENSE
 */
export interface List {
  title: string;
  id: number;
}

export interface Client {
  id_client: string;
  nom: string;
  prenom: string;
  telephone: string;
  user_createur: string;
  date_creation: string;
  date_modification: string;
}
