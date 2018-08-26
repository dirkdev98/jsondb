import { isString } from 'lodash';

export enum PropertyType {
  BOOLEAN = 'BOOLEAN',
  NUMBER = 'NUMBER',
  STRING = 'STRING'
}

export interface SchemaInterface {
  readonly type: PropertyType;
  readonly index: boolean;
}

export interface Schema {
  readonly [name: string]: SchemaInterface | PropertyType;
}

export interface CompiledSchemaInterface {
  readonly columnName: string;
  readonly columnType: PropertyType;
  readonly indexed: boolean;
}

export function compileSchema(
  schema: Schema
): ReadonlyArray<CompiledSchemaInterface> {
  return Object.keys(schema).map(value => {
    const type: PropertyType = isString(schema[value])
      ? (schema[value] as PropertyType)
      : (schema[value] as SchemaInterface).type;
    const indexed: boolean = isString(schema[value])
      ? false
      : (schema[value] as SchemaInterface).index;

    return {
      columnName: value,
      columnType: type,
      indexed
    };
  });
}
