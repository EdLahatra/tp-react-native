const likeOrEq = (query: string, like: boolean) => {
  if(like) {
    return ` LIKE '%${query}%'`
  }
  return ` = '${query}' `
}

const addOperatorLogique = (req: any) => {
  const { where, query, like, operator } = req;
  return where.reduce((acc: string, curr: string, index: number): any => {
    const isOperatorLogique = operator && (index + 1) < where.length ? operator : '';
    return `${acc} ${curr} ${likeOrEq(query, like)} ${isOperatorLogique} `;
  }, 'WHERE ');
}

export class RequestSelectDTO {
  table: string | undefined;
  where: string[] | undefined;
  limit: string | undefined;
  query: string | undefined;
  like: boolean | undefined;
  operator: string | undefined;
  values: string[] | undefined;

  constructor(request: any) {
    if (request) {
      this.table = request.table;
      this.like = request.like;
      this.operator = request.operator;
      this.query = request.query;
      this.values = request.values;
      this.where = request.where;
    }
  }

  generateRequestSelect = () => {
    const req = `SELECT * FROM ${this.table} ${addOperatorLogique(this)} LIMIT ${this.limit || 10};`;
    console.log({ req });
    return req;
  }
}
