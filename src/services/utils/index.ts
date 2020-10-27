import RNFS from 'react-native-fs';
import RNFetchBlob from "rn-fetch-blob";
import { unzip } from 'react-native-zip-archive';

import transformString from './convert';
import { post } from '../technique/api';

import config from '../../data/config';
import { getStoredState } from 'redux-persist';
import { format } from "date-fns";

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
    names: 'TicketsPaiements',
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

export const ckeckFile = async (filename: string, path: string) => {
	const fl = filename.split('_');
	const file = fl[fl.length - 1];
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

  await RNFS.unlink(path);
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
  try {
    const res = await RNFetchBlob
    .config({ fileCache: true, path: `${temp}/${name}.zip` })
    .fetch('GET', urlGetZip(name), {});
    if(res) {
      return res.path();
    }
    return null;
  } catch (error) {
    return null;
  }
}

export const readDirAndCopy = async (pathFile: string, folder: string) => {
	const dir = await RNFS.readDir(pathFile);
	if (dir) {
		const dirs = dir.map(async ({ name, path }) => {
			const isFile = Object.values(fileN).includes(name);
			if(isFile) {
				const dest = `${temp}/${folder}_${name}`;
				await RNFS.moveFile(path, dest);
				return;
			}
			await RNFS.unlink(path);
			return null
    });
    // console.log({ dirs })
    const results = await Promise.all(dirs).then((res) => {
      return res ? res.filter(k => k !== null) : [];
		}).catch(() => []);
		await RNFS.unlink(pathFile);
		// console.log({ results });
		return results;
	}
	return [];
}

export const unzipFile = async (name: string) => {
  const sourcePath = `${temp}/${name}.zip`;
  // const sourcePath = `${res.path()}/20191119_161550_hap.zip`
  const targetPath = `${temp}/${name}`;
  const charset = 'UTF-8';

  await RNFS.mkdir(targetPath);
  // charset possible values: UTF-8, GBK, US-ASCII and so on. If none was passed, default value is UTF-8

	const zipFiles = await unzip(sourcePath, targetPath, charset);
	const files = await readDirAndCopy(zipFiles, name);
	if (files) {
    await RNFS.unlink(sourcePath);
    return zipFiles;
  }
  // if (zipFiles) {
  //   await RNFS.unlink(sourcePath);
  //   return zipFiles;
  // }
  return null;
}

export const ckeckCSVName = async (targetPath: string) => {
  const isDir = await RNFetchBlob.fs.isDir(targetPath);
  if(!isDir) {
    return [];
  }

  const dir = await RNFS.readDir(targetPath);
  if(dir && dir.length > 0){
    const dirs = dir.map(async ({ path, name, size }) => {
      // console.log({ name, path });
      const curent = await ckeckFile(name, path);
			// console.log({ curent });
			if(size == "19008732") {
				return null;
			}

      if(curent) {
        return { size, filename: name, ...curent };
      }
      return null;
    });
    // console.log({ dirs })
    return Promise.all(dirs).then((res) => {
      return res ? res.filter(k => k !== null) : [];
    }).catch(() => []);
  }

  return [];
}

export const lastSynchroFile = async (file: string) => {
  const filesOld = await ckeckCSVName(temp);
  if(filesOld && filesOld.length > 0) {
    return {
      zip_name: file,
      files: filesOld,
    };
  }
  return {};
}

export const synchroOneToOne = async (file: string) => {
  const filesOld = await ckeckCSVName(temp);
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

export const toDatetime = (date: Date) => (((new Date(date)).getTime() * 10000) + 621355968000000000);

export const toDatetimeDisplay = (date: number) => new Date((date - 621355968000000000) / 10000);

export const  displayDate =  (date : number) =>{
 return format(toDatetimeDisplay(date),"dd/MM/yyyy");
}

export const displayHour = (date : number) =>{
  return format(toDatetimeDisplay(date),"HH:mm");
}
