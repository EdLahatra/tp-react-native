import Config from 'react-native-config';

export const initialUser = {
  id: 0,
  nom: '',
  nom_user: '',
  passwd: '',
  prenom: ''
};

export default {
 /* urlWS: 'http://172.20.3.50:5591/',//'http://192.168.1.40:6891/',
  urlGetZip: (name: string) => `http://172.20.3.50:5588/samtesttma_zip/${name}.zip`,
  urlUp: 'http://172.20.3.50:5590/',*/
  code_mag: Config.code_mag,
  numero_caisse: Config.numero_caisse,
  cle_serveur: Config.cle_serveur,
  urlWS: Config.urlWS,
  urlZip: Config.urlGetZip,
  urlGetZip: (name: string) => `${Config.urlGetZip}${name}.zip`,
  urlUp: Config.urlUp,
  numero_mag: Config.numero_mag,
  code_enseigne: Config.code_enseigne,
  last_file: Config.last_file,
  numero_enseigne: Config.numero_enseigne,
  MineFile: Config.MineFile,

  // urlUp: 'http://172.20.3.50:5591/',
  // urlWS: 'http://172.20.3.50:5590/',
  // urlGetZip: (name: string) => `http://172.20.3.50:5588/samtesttma_zip/${name}.zip`,
  // code_mag: 'HAP5',
  // numero_caisse: '05',
  // cle_serveur: '74ADF78C',
  // numero_mag: '18',
  // code_enseigne: '5D',
  // last_file: '20200928_151618_hap',
  // numero_enseigne: '04',
};
