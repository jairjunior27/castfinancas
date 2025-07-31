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

export const formatarDataTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp);
  const dia = String(date.getDate()).padStart(2, "0");
  const mes = String(date.getMonth() + 1).padStart(2, "0");
  const ano = date.getFullYear();
  return `${dia}/${mes}/${ano}`;
};
