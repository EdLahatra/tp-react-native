import axios from 'axios';

import config from '../../data/config';

const { urlWS, cle_serveur, code_mag, numero_caisse } = config;

const toData = (name = 'no%20file') => `action=update&code_mag=${code_mag}&numero_caisse=${numero_caisse}&cle_serveur=${cle_serveur}&last_file=${name}`;

export const postApi = async (name: string | undefined) => {
  const data = toData(name);
  console.log(urlWS, data);
  try {
    const res = await axios({
      method: 'post',     //put
      url: urlWS,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data,
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
