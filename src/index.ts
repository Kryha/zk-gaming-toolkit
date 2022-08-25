import { aleoExec } from "./utils";

const init = async () => {
  console.log("Building aleo program...");
  await aleoExec.build();
  console.log("Aleo program successfully built!");
};

init();
