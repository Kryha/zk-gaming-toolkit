import { lib } from "../src";

export const tests = {
  foo: () => {
    lib.foo();
  },
};

const run = () => {
  tests.foo();
};

run();
