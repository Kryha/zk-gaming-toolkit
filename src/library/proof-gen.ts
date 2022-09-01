import { aleoExec } from "../utils";

export const proofGen = {
  // TODO: implement function
  generate: async () => {
    const res = await aleoExec.call.generateProof(2, 3);
    return res;
  },
};
