import {
  scheduleNotificationAsync,
  getAllScheduledNotificationsAsync,
  CalendarTriggerInput,
} from "expo-notifications";
import { FaturaType } from "../types/faturaType";

export const verificaNotificacao = async (fatura: FaturaType) => {

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

 
  const dataFaturaRaw = new Date(fatura.data);
  const dataFaturaZerada = new Date(dataFaturaRaw);
  dataFaturaZerada.setHours(0, 0, 0, 0);

 
  if (hoje.getTime() !== dataFaturaZerada.getTime()) return;

 
  const dataComHora = new Date(dataFaturaRaw);
  dataComHora.setHours(9, 0, 0, 0);

  
  const notificacoesAgendadas = await getAllScheduledNotificationsAsync();

  const existe = notificacoesAgendadas.some((notificacao) => {
    const trigger = notificacao.trigger as CalendarTriggerInput;

    return (
      notificacao.content?.title?.includes("Fatura vence hoje") &&
      notificacao.content?.body?.includes(fatura.titulo) &&
      trigger?.day === dataComHora.getDate() &&
      trigger?.month === dataComHora.getMonth() + 1 &&
      trigger?.year === dataComHora.getFullYear()
    );
  });

  if (existe) {
    console.log("⚠️ Notificação já existe para:", fatura.titulo);
    return;
  }

  
  await scheduleNotificationAsync({
    content: {
      title: "📅 Fatura vence hoje!",
      body: `Sua fatura "${fatura.titulo}" de ${fatura.valor} vence hoje.`,
      sound: true,
    },
    trigger: {
      year: dataComHora.getFullYear(),
      month: dataComHora.getMonth() + 1,
      day: dataComHora.getDate(),
      hour: 9,
      minute: 0,
      repeats: false,
    } as CalendarTriggerInput,
  });

  console.log("✅ Notificação agendada para:", fatura.titulo);
};
