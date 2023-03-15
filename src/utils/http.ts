import axios, { type AxiosResponse } from "axios";

import { wait } from "./time";

export const attemptFetch = async (url: string, attempts = 50): Promise<AxiosResponse> => {
  let res: AxiosResponse | undefined = undefined;

  while (!res && attempts > 0) {
    try {
      res = await axios.get(url, { responseType: "json" });
    } catch (error) {
      attempts--;
      await wait();
    }
  }

  if (!res) throw new Error(`Failed to fetch ${url}.`);

  return res;
};
