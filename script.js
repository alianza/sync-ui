import bcryptjs from "bcryptjs";

const password = "testpassword";
let dbSavedPassword;

async function main() {
  const hash = await saltAndHashPassword(password);
  console.log(`hash`, hash);
  dbSavedPassword = hash;

  const isMatch = await verifyPassword(password, hash);
  console.log(`isMatch`, isMatch);
}

export async function saltAndHashPassword(password) {
  const saltLength = 10;
  const salt = bcryptjs.genSaltSync(saltLength);
  const hash = bcryptjs.hashSync(password, salt);
  return hash;
}

export async function verifyPassword(password, hash) {
  const isMatch = await bcryptjs.compare(password, hash);
  return isMatch;
}

main()
  .then((r) => console.log("done"))
  .catch((e) => console.error(e));
