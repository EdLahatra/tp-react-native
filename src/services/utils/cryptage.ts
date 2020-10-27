const md5 = require('js-md5');

function string2Bin(text: string) {
  var result = [];
  for (var i = 0; i < text.length; i++) {
    result.push(text.charCodeAt(i));
  }
  return result;
}

const toMd5 = (text: string) => {
  const array = string2Bin(text); // [49, 50, 51, 52, 53]
  const arrayToMd5 = md5.array(array); // [225, 10, 220, 57, 73, 186, 89, 171, 190, 86, 224, 87, 242, 15, 136, 62]
  let res = '';
  for (let i = 0; i < arrayToMd5.length; i++) {
    const hex = arrayToMd5[i].toString(16).toUpperCase();
    res = res.concat(hex.length === 1 ? `0${hex}` : hex)
  }
  return res;
}

const passwordOk = (text: number) => {
  return toMd5(toMd5(text.toString()) + 'shpt');
}


export default passwordOk;
