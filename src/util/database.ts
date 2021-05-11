function preparingQuery(table: string, params: any): { sql: string; values: any[] } {
  let sql = `select * from ${table} where `;
  let stat = false;

  if (params.id_min >= 1 && params.id_max >= 1) {
    sql += `ID between ${params.id_min} and ${params.id_max} `;
    stat = true;
  }

  const values: any[] = [];

  let cursor = 1;
  Object.entries(params).forEach(([key, value]) => {
    if (key == 'id_min' || key == 'id_max') return;

    if (key == 'created_at' && value) {
      sql += `${stat ? 'and ' : ''}to_char(created_at, 'dd/mm/yyyy') = $${cursor}`;
      values.push(value);
      return;
    }

    if (value) {
      sql += `${stat ? 'and ' : ''}${key} = $${cursor} `;
      values.push(value);
      cursor++;
      stat = true;
    }
  });

  return { sql, values };
}

export { preparingQuery };
