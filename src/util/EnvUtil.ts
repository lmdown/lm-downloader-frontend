export class EnvUtil {

  static convertToEnvFormat(envObj: Object, addPrefix: string = ''): string {
    const lines: string[] = [];

    for (const [key, value] of Object.entries(envObj)) {
      let envValue = String(value);

      if (envValue === '') {
        continue;
      }

      if (/[=\s]/.test(envValue)) {
        envValue = `"${envValue}"`;
      }
      let line = `${key}=${envValue}`
      if(addPrefix) {
        line = addPrefix + line
      }
      lines.push(line + '\n');
    }

    return lines.join('');
  }

}
