import getEnvVar from './getEnvVar.js';

export default function (value, defaultValue) {
  const boolValue = getEnvVar(value, defaultValue);
  if (boolValue === 'true') return true;
  if (boolValue === 'false') return false;
  throw new Error(`Process.env [${boolValue}] should be boolean type`);
}
