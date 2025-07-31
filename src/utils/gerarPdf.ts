
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { captureRef } from "react-native-view-shot";
import { DadosMensalCompleto } from "./dadosMensal";
import { formatarMoeda } from "./formatarMoeda";

type Resumo = {
  entradas: number;
  saidas: number;
};

export const gerarPDF = async (
  ref: React.RefObject<any>,
  mesAtual: number,
  anoAtual: number,
  atual: Resumo,
  anterior: Resumo
) => {
  if (!ref.current) return;

  const nomeMes = DadosMensalCompleto[mesAtual];
  const entradas = atual.entradas.toFixed(2);
  const saidas = atual.saidas.toFixed(2);
  const entradasAnt = anterior.entradas.toFixed(2);
  const saidasAnt = anterior.saidas.toFixed(2);
  const diffSaida = (anterior.saidas - atual.saidas).toFixed(2);

  const economiaPercentual =
    anterior.saidas > 0
      ? ((anterior.saidas - atual.saidas) / anterior.saidas) * 100
      : 0;

  const economiaTexto =
    economiaPercentual > 0
      ? `Economia de ${economiaPercentual.toFixed(1)}% em relação ao mês anterior.`
      : economiaPercentual < 0
      ? `Aumento de gastos em ${Math.abs(economiaPercentual).toFixed(1)}%.`
      : "Sem variação nos gastos.";

  const imageUri = await captureRef(ref, {
    format: "png",
    quality: 1,
    result: "base64",
  });

  const html = `
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { text-align: center; }
          .info { margin-bottom: 16px; }
          .label { font-weight: bold; }
          .grafico { text-align: center; margin: 30px 0; }
        </style>
      </head>
      <body>
        <h1>Relatório - ${nomeMes}/${anoAtual}</h1>
        <div class="grafico">
          <img src="data:image/png;base64,${imageUri}" style="width: 100%; max-width: 400px;" />
        </div>
        <div class="info"><span class="label">Entradas:</span> R$ ${formatarMoeda(entradas)}</div>
        <div class="info"><span class="label">Saídas:</span> R$ ${formatarMoeda(saidas)}</div>
        <div class="info"><span class="label">Entradas (mês anterior):</span> R$ ${formatarMoeda(entradasAnt)}</div>
        <div class="info"><span class="label">Saídas (mês anterior):</span> R$ ${formatarMoeda(saidasAnt)}</div>
        <div class="info"><span class="label">Diferença de Saídas:</span> R$ ${formatarMoeda(diffSaida)}</div>
        <div class="info"><span class="label">Resumo:</span> ${economiaTexto}</div>
      </body>
    </html>
  `;

  const { uri } = await Print.printToFileAsync({ html });
  await Sharing.shareAsync(uri);
};
