import axios from 'axios';

import config from '../../config';

const { urlWS } = config;

const toData = (name = 'no%20file') => `action=update&code_mag=HAP1&numero_caisse=07&cle_serveur=5DADA245&last_file=${name}`;

export const post = async (name: string | undefined) => {
  try {
    const res = await axios({
      method: 'post',     //put
      url: urlWS,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: toData(name),
    });
    // console.log('post res ------------>', res);
    return res;
  } catch (e) {
    console.log('e.response', e);

    const errors = e && e.response ? e.response.data : { error: true };
    console.log('post errors ------------>', errors);
    return errors;
  }
};
