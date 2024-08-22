import path from "path";

interface Config {
  rootDir: string;
  // Add other configuration properties here
}

const config: Config = {
  rootDir: path.resolve(__dirname)
  // ... other config options ...
};

export default config;
