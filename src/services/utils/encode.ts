import base64 from 'base-64';
import utf8 from 'utf8';
const SALT = 'anyString';
const PREPENDING_STR = '__enc__';

export function encodeCredential(input) {
  if (input // if the input exists
    && typeof input === 'string' // and it's a string
  ) {
    const newInput = `${input}${SALT}`; // add salt to the input
    const utf8Bytes = utf8.encode(newInput); // utf8 encode it
    const encoded = base64.encode(utf8Bytes); // base64 encode it

    const test = utf8.encode(newInput); // utf8 encode it

    return `${PREPENDING_STR}${encoded}`; // add a prepending string
  }
  return input;
}

export function decodeCredential(input) {
  if (input // if the input exists
    && typeof input === 'string' // and it's a string
    && input.startsWith(PREPENDING_STR) === true // and it's encoded yet
  ) {
    const newInput = input.replace(PREPENDING_STR, ''); // remove the prepending string
    const utf8Bytes = base64.decode(newInput); // base64 decode it
    const output = utf8.decode(utf8Bytes); // utf8 decode it
    return output.replace(SALT, '');
  }
  return input;
}