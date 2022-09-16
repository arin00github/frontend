import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/__tests__/*.test.(js|jsx|ts|tsx)"],
};
export default config;
