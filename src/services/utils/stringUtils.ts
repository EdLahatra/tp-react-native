import { requeteSelect } from '../../interfaces/request';

export const generateRequestSelect = (request: requeteSelect) => {
  const { where, query, table, limit, like, operator, values } = request;
  let wr = '';
  if (query && where && where.length > 0) {
    if(like) {
        wr = `WHERE ${where[0]} LIKE '%${query}%'`
    } else {
      wr = `WHERE ${where[0]} = '${query}'`
    }
  }

  return `SELECT * FROM ${table} ${wr} LIMIT ${limit || 10};`;
}
