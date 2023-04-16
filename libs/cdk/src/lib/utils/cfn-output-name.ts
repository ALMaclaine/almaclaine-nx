function generateCfnOutputName(name: string, stage: string): string {
  return `${name}${stage}`;
}

export { generateCfnOutputName };
