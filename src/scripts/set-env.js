const { writeFileSync } = require("fs");
const { resolve } = require("path");
const dotenv = require("dotenv");

dotenv.config();

const envPath = resolve(__dirname, "../environments/environment.ts");
const envContent = `export const environment = {
  backendUrl: '${process.env.BACKEND_URL}',
};
`;

writeFileSync(envPath, envContent);
