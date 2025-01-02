const { writeFileSync, mkdirSync } = require("fs");
const { resolve } = require("path");
const dotenv = require("dotenv");

dotenv.config();

const envDir = resolve(__dirname, "../environments");
mkdirSync(envDir, { recursive: true });

const envPath = resolve(envDir, "environment.ts");
const envDevPath = resolve(envDir, "environment.development.ts");

const envContent = `export const environment = {
  backendUrl: '${process.env.BACKEND_URL}',
  port: '${process.env.PORT}',
};
`;

writeFileSync(envPath, envContent);
writeFileSync(envDevPath, envContent);
