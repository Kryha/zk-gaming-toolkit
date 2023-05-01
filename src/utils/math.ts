export const randomInt = (max: number, min = 0) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/*
    cyrb53 (c) 2018 bryc (github.com/bryc)
    A fast and simple hash function with decent collision resistance.
    Largely inspired by MurmurHash2/3, but with a focus on speed/simplicity.
*/
export const getNumericHash = (stringList: string | string[], seed = 13): number => {
  const inputString = typeof stringList === "string" ? stringList : stringList.join("");

  let h1 = 0xdeadbeef ^ seed;
  let h2 = 0x41c6ce57 ^ seed;

  [...inputString].forEach((character: string) => {
    const characterCode = character.charCodeAt(0);
    h1 = Math.imul(h1 ^ characterCode, 2654435761);
    h2 = Math.imul(h2 ^ characterCode, 1597334677);
  });

  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};
