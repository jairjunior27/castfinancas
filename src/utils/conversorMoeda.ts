export const ConversorMoeda = (cotacao: number | null, valor: string) => {
  if (!cotacao || !valor) return "R$ 0,00";

  const valorNumerico = normalizarValor(valor);

  const convertido = valorNumerico * cotacao;

  return convertido.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export const normalizarValor = (valor: string): number => {
  if (!valor) return 0;

  const limpo = valor.replace(/[^\d,.-]/g, "").trim();

  if (limpo.includes(",") && limpo.includes(".")) {
    const americano = limpo.replace(/,/g, "");
    return parseFloat(americano);
  }

  if (limpo.includes(",")) {
    return parseFloat(limpo.replace(/\./g, "").replace(",", "."));
  }

  return parseFloat(limpo);
};

export function formatarMoeda(valor: string, idioma: "br" | "en"): string {
  const apenasNumeros = valor.replace(/\D/g, "");
  const numero = (parseInt(apenasNumeros || "0", 10) / 100).toFixed(2);

  return Number(numero).toLocaleString(idioma === "en" ? "en-US" : "pt-BR", {
    style: "currency",
    currency: idioma === "en" ? "USD" : "BRL",
  });
}
