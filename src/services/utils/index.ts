import RNFS from 'react-native-fs';
import RNFetchBlob from "rn-fetch-blob";
import { unzip } from 'react-native-zip-archive';

import transformString from './convert';
import { post } from '../technique/api';

import config from '../../data/config';

const { urlGetZip } = config;

export const temp = `${RNFS.CachesDirectoryPath}/temp`;

export const fileN = {
  reglements: 'reglements3.csv',
  utilisateurs: 'utilisateurs3.csv',
  clients: 'clients3.csv',
  articles: 'articles3.csv',
  codesbarres: 'codesbarres.csv',
  magasins: 'magasins.csv',
  motifs: 'motifs2.csv',
  parametres: 'parametres2.csv',
  promos: 'promos3.csv',
  messages: 'messages.csv',
  reglements_verifs: 'reglements_verifs.csv',
};

export const tables_synchro_up = {
  Clotures: {
    name: 'Clotures',
  },
  Clients: {
    name: 'Clients',
  },
  Pointages: {
    name: 'Pointages',
  },
  CloturesDetailsPaiement: {
    name: 'CloturesDetailsPaiement',
    columns: [
      'numero_ticket',
      'statut',
      'user_creation',
      'id_clientvarchar',
      'user_annulation',
      'motif_annulation',
      'date_debut',
      'date_fin',
      'id_cloture',
      'vendeurs'
    ],
  },
  Tickets: {
    name: 'Tickets',
  },
  TicketsDetail: {
    name: 'TicketsDetail',
  },
  TicketsPaiements: {
    name: 'TicketsPaiements',
  },
};

export const tables = {
  ControlesCaisse: {
    name: 'ControlesCaisse',
  },
  CloturesAnnuelle: {
    name: 'CloturesAnnuelle',
  },
  CloturesMensuelle: {
    name: 'CloturesMensuelle',
  },
  OuverturesTiroir: {
    name: 'OuverturesTiroir',
  },
  Utilisateurs: {
    name: 'Utilisateurs',
  },
  ...tables_synchro_up,
};

export const ckeckFile = async (file: string, path: string) => {
  console.log(file);

  if (file === fileN.articles) {
    return {
      path,
      name: 'Articles',
      transform: transformString.Articles,
    };
  }

  if (file === fileN.clients) {
    return {
      path,
      name: 'Clients',
      transform: transformString.Clients,
    };
  }

  if (file === fileN.codesbarres) {
    return {
      path,
      name: 'ArticlesCodesBarres',
      transform: transformString.ArticlesCodesBarres,
    };
  }
  if (file === fileN.messages) {
    return {
      path,
      name: 'Messages',
      transform: transformString.Messages,
    };
  }
  if (file === fileN.motifs) {
    return {
      path,
      name: 'MotifsRemises',
      transform: transformString.MotifsRemises,
    };
  }
  if (file === fileN.magasins) {
    return {
      path,
      name: 'Magasins',
      transform: transformString.Magasins,
    };
  }

  if (file === fileN.magasins) {
    return {
      path,
      name: 'Magasins',
      transform: transformString.Magasins,
    };
  }
  if (file.includes(fileN.motifs)) {
    return {
      path,
      name: 'MotifsRemises',
      transform: transformString.MotifsRemises,
    };
  }
  if (file === fileN.parametres) {
    return {
      path,
      name: 'Parametres',
      transform: transformString.Parametres,
    };
  }
  if (file === fileN.promos) {
    return {
      path,
      name: 'Promos',
      transform: transformString.Promos,
    };
  }
  if (file === fileN.reglements_verifs) {
    return {
      path,
      name: 'ModesReglementsVerifs',
      transform: transformString.ModesReglementsVerifs,
    };
  }
  if (file === fileN.reglements) {
    return {
      path,
      name: 'ModesReglements',
      transform: transformString.ModesReglements,
    };
  }
  if (file === fileN.utilisateurs) {
    return {
      path,
      name: 'Utilisateurs',
      transform: transformString.Utilisateurs,
    };
  }
  const rm = await RNFS.unlink(path);
  console.log({ rm });
  return null;
};

export const getFileToString = async (csvFilePath: string) => {
  try {
    const fileString = await RNFetchBlob.fs.readFile(csvFilePath, 'utf8');
    // await RNFS.unlink(csvFilePath);
    return fileString;
  } catch (err) {
    return null;
    // console.log('ERROR:', err);
  }
};

export const getZipFile = async (name = '20200121_153346_hap') => {
  const res = await RNFetchBlob
    .config({ fileCache: true, path: `${temp}/${name}.zip` })
    .fetch('GET', urlGetZip(name), {});
  console.log({ res });

  if(res) {
    return res.path();
  }
  return null;
}

export const unzipFile = async (name: string) => {
  const sourcePath = `${temp}/${name}.zip`;
  // const sourcePath = `${res.path()}/20191119_161550_hap.zip`
  // const targetPath = `${temp}`;
  const charset = 'UTF-8';

  // await RNFS.mkdir(targetPath);
  // charset possible values: UTF-8, GBK, US-ASCII and so on. If none was passed, default value is UTF-8

  const zipFiles = await unzip(sourcePath, temp, charset);
  if (zipFiles) {
    const removeZip = await RNFS.unlink(sourcePath);
    console.log({ removeZip });
    return zipFiles;
  }
  return null;
}

export const ckeckCSVName = async (targetPath: string) => {
  const dir = await RNFS.readDir(targetPath);
  console.log({ dir });
  if(dir){
    const dirs = dir.map(async ({ path, name, size }) => {
      // console.log({ name, path });
      const curent = await ckeckFile(name, path);
      // console.log({ curent });
      if(curent) {
        return { size, ...curent };
      }
      return null;
    });
    // console.log({ dirs })
    return Promise.all(dirs).then((res) => {
      console.log({ res });
      return res ? res.filter(k => k !== null) : [];
    }).catch(() => []);
  }

  return [];
}

export const synchroOneToOne = async (file: string) => {
  const filesOld = await ckeckCSVName(temp);
  console.log({ filesOld });
  if(filesOld && filesOld.length > 0) {
    return {
      zip_name: file,
      files: filesOld,
    };
  }
  const nameLastFile = file && typeof file === 'string' && file.length > 10 ? file : 'no%20file';
  const filename = await post(nameLastFile);
  if (filename && filename.data && filename.data !== 'no update') {
    const nameFile = filename.data;
    const zipFile = await getZipFile(nameFile);
    if(zipFile) {
      const unZip = await unzipFile(nameFile);
      console.log({ unZip });
      if(unZip) {
        const files = await ckeckCSVName(unZip);
        if (files && files.length > 0) {
          return {
            files,
            zip_name: filename.data,
          };
        }
      }
    }
  }
  return {
    zip_name: filename?.data,
    files: [],
  };
}

export const toDatetime = (date: Date) => new Date(date).toTimeString();
