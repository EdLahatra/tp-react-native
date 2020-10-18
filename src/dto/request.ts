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

const updatedCollumn = (columns: { [s: string]: string; }) => {
  const setCollumn = Object.keys(columns).map((collumn) => `${collumn} = `).join('? ');
  return setCollumn;
}

export class RequestDTO {
  table: string | undefined;
  where: string[] | undefined;
  limit: string | undefined;
  query: string | undefined;
  like: boolean | undefined;
  operator: string | undefined;
  values: string[] | undefined;
  // column: string | undefined;

  constructor(request: any) {
    if (request) {
      this.table = request.table;
      this.like = request.like;
      this.operator = request.operator;
      this.query = request.query;
      this.values = request.values;
      this.where = request.where;
      // this.column = request.column?.join();
      // this.values = request.columns?.map(() => '?').join();
    }
  }

  generateRequestSelect = () => {
    const req = `SELECT * FROM ${this.table} ${addOperatorLogique(this)} LIMIT ${this.limit || 10};`;
    console.log({ req });
    return req;
  }

  generateRequestInsert = (data: any) => {
    const keys = Object.keys(data);
    const column = keys.join();
    const values = keys?.map(() => '?').join();
    const req = `INSERT INTO ${this.table} (${column}) VALUES (${values});`;
    console.log({ req });
    return req;
  }

  generateRequestUpdate = (columns: { [s: string]: string; }) => {
    const req = `UPDATE ${this.table} SET ${updatedCollumn(columns)};`;
    console.log({ req });
    return {
      req,
      values: Object.values(columns)
    };
  }

  generateRequestDelete = () => {
    const req = `DELETE FROM ${this.table} WHERE id = ?;`;
    console.log({ req });
    return req;
  }
}
