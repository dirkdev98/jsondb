// tslint:disable no-expression-statement no-object-mutation

import anyTest, { TestInterface } from "ava";
import { findOne, Store } from "./index";

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
   t.deepEqual(findOne(t.context.store, { foo: "fo", bar: 0 }), {
      bar: 0,
      foo: "fo",
   });
});

test("partial input I", t => {
   t.deepEqual(findOne(t.context.store, { foo: "fooo" }), {
      bar: 2,
      foo: "fooo",
   });
});

test("partial input II", t => {
   t.deepEqual(findOne(t.context.store, { bar: 2 }), {
      bar: 2,
      foo: "fooo",
   });
});

test("partial input III", t => {
   t.is(findOne(t.context.store, { foo: "bar" }), null);
});

test("partial input IV", t => {
   t.is(findOne(t.context.store, { bar: 8 }), null);
});

test("partial input V", t => {
   t.is(findOne(t.context.store, {}), null);
});
