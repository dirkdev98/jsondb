// tslint:disable no-expression-statement no-object-mutation

import anyTest, { TestInterface } from "ava";
import { find, Store } from "./index";

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

test("full input", t => {
   t.deepEqual(find(t.context.store, { foo: "fo", bar: 0 }), [
      { foo: "fo", bar: 0 },
   ]);
});
test("partial input I", t => {
   t.deepEqual(find(t.context.store, { foo: "foo" }), [
      { foo: "foo", bar: 1 },
      { foo: "foo", bar: 1 },
      { foo: "foo", bar: 0 },
   ]);
});
test("partial input II", t => {
   t.deepEqual(find(t.context.store, { bar: 2 }), [{ foo: "fooo", bar: 2 }]);
});
test("partial input III", t => {
   t.deepEqual(find(t.context.store, { foo: "bar" }), []);
});
test("partial input IV", t => {
   t.deepEqual(find(t.context.store, { bar: 8 }), []);
});
test("partial input V", t => {
   t.deepEqual(find(t.context.store, {}), t.context.store.items);
});
