import { isNil } from "lodash";
import * as fp from "lodash/fp";

export type AnyRecord = Record<any, any>;

export interface Store<T extends AnyRecord> {
   readonly items: ReadonlyArray<T>;
}

export function createStore<T extends AnyRecord>(): Store<T> {
   return {
      items: [],
   };
}

function predicateWithPartial<T extends AnyRecord>(
   options: Partial<T>,
   matchOnEmpty: boolean,
   value: T,
): boolean {
   return Object.keys(options).reduce(
      (previousValue: any | undefined, currentValue) => {
         return previousValue === false
            ? previousValue
            : !isNil(value[currentValue]) &&
                 value[currentValue] === options[currentValue];
      },
      matchOnEmpty ? true : null,
   );
}

export function findOne<T extends AnyRecord>(
   store: Store<T>,
   options: Partial<T>,
): T | null {
   const predicate = fp.curry(predicateWithPartial)(
      options,
      false,
      fp.placeholder,
   );
   return store.items.find(predicate) || null;
}

export function find<T extends AnyRecord>(
   store: Store<T>,
   options: Partial<T>,
): ReadonlyArray<T> {
   const predicate = fp.curry(predicateWithPartial)(
      options,
      true,
      fp.placeholder,
   );
   return store.items.filter(predicate);
}

export function findAndStore<T extends AnyRecord>(
   store: Store<T>,
   options: Partial<T>,
): Store<T> {
   return {
      items: find(store, options),
   };
}
