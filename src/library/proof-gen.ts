import { leoService } from "../services";

export const proofGen = {
  // TODO: implement function
  generate: async () => {
    const res = await leoService.call.generateProof(2, 3);
    return res;
  },
};
