// tslint:disable no-expression-statement no-object-mutation

import anyTest, { TestInterface } from "ava";
import { findAndStore, Store } from "./index";

interface TestItem {
   readonly foo: string;
   readonly bar: number;
}

const test = anyTest as TestInterface<{ readonly store: Store<TestItem> }>;

test.before(t => {
   t.context = {
      store: {
         items: [
            { foo: "fo", bar: 0 },
            { foo: "foo", bar: 1 },
            { foo: "fooo", bar: 2 },
            { foo: "foooo", bar: 3 },
            { foo: "fooooo", bar: 4 },
            { foo: "foooooo", bar: 5 },
            { foo: "fooooooo", bar: 6 },
            { foo: "foo", bar: 1 },
            { foo: "foo", bar: 0 },
         ],
      },
   };
});

test("store - create a store", t => {
   t.deepEqual(findAndStore(t.context.store, { foo: "fo" }), {
      items: [{ foo: "fo", bar: 0 }],
   });
});

test("store - always create a new store", t => {
   t.not(
      findAndStore(t.context.store, { foo: "foo" }),
      findAndStore(t.context.store, { foo: "foo" }),
   );
});

test("find - full input", t => {
   t.deepEqual(findAndStore(t.context.store, { foo: "fo", bar: 0 }), {
      items: [{ foo: "fo", bar: 0 }],
   });
});
test("find - partial input I", t => {
   t.deepEqual(findAndStore(t.context.store, { foo: "foo" }), {
      items: [
         { foo: "foo", bar: 1 },
         { foo: "foo", bar: 1 },
         { foo: "foo", bar: 0 },
      ],
   });
});
test("find - partial input II", t => {
   t.deepEqual(findAndStore(t.context.store, { bar: 2 }), {
      items: [{ foo: "fooo", bar: 2 }],
   });
});
test("find - partial input III", t => {
   t.deepEqual(findAndStore(t.context.store, { foo: "bar" }), { items: [] });
});
test("find - partial input IV", t => {
   t.deepEqual(findAndStore(t.context.store, { bar: 8 }), { items: [] });
});
test("find - partial input V", t => {
   t.deepEqual(findAndStore(t.context.store, {}), t.context.store);
});
