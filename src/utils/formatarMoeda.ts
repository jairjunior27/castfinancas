export function formatarMoeda(valor: string, idioma: "br" | "en" = "br"): string {
  const numero = valor.replace(/\D/g, "");
  const valorNumerico = (parseInt(numero, 10) / 100).toFixed(2);

  const config = {
    br: { locale: "pt-BR", currency: "BRL" },
    en: { locale: "en-US", currency: "USD" },
  };

  const { locale, currency } = config[idioma];

  return Number(valorNumerico).toLocaleString(locale, {
    style: "currency",
    currency,
  });
}

export function limparMoeda(valor: string): number {
  const limpo = valor.replace(/\D/g, "");
  return parseFloat((parseInt(limpo, 10) / 100).toFixed(2));
}
