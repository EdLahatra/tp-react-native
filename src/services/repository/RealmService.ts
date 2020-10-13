// import { useState, useEffect } from "react";

// import Realm, { ObjectSchema } from "realm";

// // export default new Realm(realmConfig);

// import test from './schemas/test';

// // const schema = [
// //   test,
// //   {name: 'Dog', properties: {name: 'string'}}
// // ];

// const schemaVersion = 1;
// /*eslint-disable */
const migration = (oldRealm, newRealm) => {

  /*
   https://realm.io/docs/react-native/latest/#performing-a-migration
   */

};

// const schema = [
//   test,
//   {name: 'Dog', properties: {name: 'string'}}
// ] as ObjectSchema[];

// const realmConfig: Realm.Configuration = { 
//   schema, 
//   schemaVersion: 1
// };

// // static service = new Realm({ schema, schemaVersion, migration });

// // Hook for managing and accessing lists (CRUD)
// // export function useRealm() {
// //   const [db, setDb] = useState(null);

// //   useEffect(() => {
// //     Realm.open({
// //       schema,
// //     }).then(realm => {
// //       realm.write(async () => {
// //         const oj = await realm.create('Dog', {name: 'Rex'});
// //         console.log({ oj });
// //       });
// //       setDb(realm);
// //     });
// //   }, []);

// //   useEffect(() => {
// //     // componentWillUnmount
// //     return () => {
// //       if (db !== null && !db.isClosed) {
// //         db.close();
// //       }
// //     }
// //   }, [db]);

// //   return {
// //     db,
// //   };
// // }

// export default new Realm(realmConfig);

import Realm from 'realm';
import Person from './models/Person';
import Planet from './models/Planet';

import test from './schemas/test';

export async function openRealm(): Promise<Realm> {
  // await Realm.deleteFile({
  //   schema: [
  //     {
  //       name: 'Test2',
  //       // primaryKey: 'id',
  //       properties: {
  //         yesy: { type: 'string' },
  //         yest2: { type: 'string' }
  //       },
  //     }
  //     , {
  //     name: 'Test',
  //     // primaryKey: 'id',
  //     properties: {
  //       nom: { type: 'string' },
  //       prenom: { type: 'string' }
  //     },
  //   }],
  //   schemaVersion: 1,
  //   migration,
  // })
  const realm = await Realm.open({
    schema: [
      {
        name: 'Test2',
        // primaryKey: 'id',
        properties: {
          yesy: { type: 'string' },
          yest2: { type: 'string' }
        },
      }
      , {
      name: 'Test',
      // primaryKey: 'id',
      properties: {
        nom: { type: 'string' },
        prenom: { type: 'string' }
      },
    }],
    schemaVersion: 1,
    migration,
  });

  return realm;
}
