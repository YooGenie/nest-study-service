import { Column, ColumnOptions } from 'typeorm';

function isSQLite(): boolean {
  return process.env.DB_TYPE === 'sqlite';
}

export function CustomColumn(options: ColumnOptions): PropertyDecorator {
  if (isSQLite() && options.type === 'timestamp') {
    return Column({
      ...options,
      type: 'text',
      default: () => (options.nullable ? null : 'CURRENT_TIMESTAMP'),
    });
  }

  if (isSQLite() && options.type === 'money') {
    return Column({ ...options, type: 'double' });
  }

  if (isSQLite() && options.type === 'bytea') {
    return Column({ ...options, type: 'blob' });
  }

  return Column(options);
}

export function CustomEnumColumn(options: ColumnOptions): PropertyDecorator {
  if (isSQLite() && options.type === 'enum') {
    return Column({ ...options, type: 'text' });
  }
  if (options.type === 'enum') {
    return Column({ ...options, type: 'varchar', length: 100 });
  }
  return Column(options);
}
