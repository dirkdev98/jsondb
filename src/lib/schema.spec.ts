/* tslint:disable:no-expression-statement */

import test, { Assertions } from 'ava';
import { CompiledSchemaInterface, compileSchema, PropertyType } from './schema';

function schemaSnapshotMacro(
  t: Assertions,
  input: ReadonlyArray<CompiledSchemaInterface>
): void {
  t.snapshot(input);
}

test(
  'basic schema',
  schemaSnapshotMacro,
  compileSchema({
    bar: PropertyType.NUMBER,
    foo: PropertyType.BOOLEAN,
    quz: PropertyType.STRING
  })
);

test(
  'Mixed schema',
  schemaSnapshotMacro,
  compileSchema({
    bar: {
      index: false,
      type: PropertyType.NUMBER
    },
    foo: PropertyType.BOOLEAN,
    quz: {
      index: true,
      type: PropertyType.STRING
    }
  })
);
