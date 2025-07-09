export const FormatData = (data: string) => {
  const date = data.split(",")[0];
  return date;
};

export const formatarDataParaArray = (
  data: string
): [number, number, number] => {
  const [dia, mes, ano] = data.split("/").map((v) => parseInt(v));
  return [dia, mes - 1, ano];
};
