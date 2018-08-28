// tslint:disable no-expression-statement

import test from "ava";
import { createStore } from "./index";

test("create empty store", t => {
   t.deepEqual(createStore<{}>(), { items: [] });
});

test("always create a new store", t => {
   t.not(createStore<{}>(), createStore<{}>());
});
