// @ts-ignore
export const stringFromEnv = (env: string | undefined): string => window?._env_?.[env] || '';
