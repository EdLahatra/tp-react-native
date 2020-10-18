import axios from 'axios';

import config from '../../data/config';

const { urlUp } = config;

export const post = async (data: string) => {
  try {
    const res = await axios({
      method: 'post',     //put
      url: urlUp,
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
