export const validateNumber = (input: any, _default: number = 0) => {
  if (Number(input) >= 0) {
    return Number(input);
  }
  return _default;
};

export function generateSerialKeys(
  length: number = 20,
  separator: string = "-",
): string {
  separator = separator || "-";
  const license = new Array(length + 1)
    .join((Math.random().toString(36) + "00000000000000000").slice(2, 18))
    .slice(0, length);
  return license
    .toUpperCase()
    .replace(/(\w{4})/g, "$1" + separator)
    .substr(0, length + Math.round(length / 4) - 1);
}

export function returnObject(obj: any, key: string, name?: string) {
  if (obj && obj[key]) {
    return {
      [name || key]: obj[key],
    };
  }
  return {};
}

export function returnKeyValue(obj: any, key: string) {
  if (obj && obj[key]) {
    return obj[key];
  }
  return undefined;
}

export function mapToObject(obj: any, items: [string, string][]) {
  let object = {};

  items.forEach(([name, key]) => {
    const data = returnKeyValue(obj, key || name);
    if (data) {
      object = {
        ...object,
        [name]: data,
      };
    }
  });
  return object;
}

export function isEmail(email: String) {
  const regex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

  if (email.match(regex)) {
    return true;
  }

  return false;
}
