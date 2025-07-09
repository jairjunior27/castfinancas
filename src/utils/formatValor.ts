export const FormatDinheiroBr = (valor: number | null | undefined) => {
    if (typeof valor !== "number" || isNaN(valor)) return "R$ 0,00";
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };
  