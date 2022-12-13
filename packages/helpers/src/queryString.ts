export const parameterToString = (parameter: string | any): string => {
  if (typeof parameter === "string") {
    return parameter;
  }

  throw new Error("Parameter is not string");
};
