import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/__tests__/*.test.(js|jsx|ts|tsx)"],
  setupFilesAfterEnv: ["<rootDir>/jest-setup.js"],
};
export default config;
