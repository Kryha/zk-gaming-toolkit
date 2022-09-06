import { leoExec } from "../utils";

export const proofGen = {
  // TODO: implement function
  generate: async () => {
    const res = await leoExec.call.generateProof(2, 3);
    return res;
  },
};
