import envRaw from '../env.json';

export const initEnv = (envExtras = {}): void => {
  process.env = Object.assign(process.env, envRaw['Parameters'], envExtras)
}
