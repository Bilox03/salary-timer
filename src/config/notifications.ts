// Definizione del tipo per la configurazione delle notifiche
interface NotificationsConfig {
  schedule: {
    from: number;
    to: number;
  };
  messages: string[];
  notificationsPerDay: number;
}

// Configurazione delle notifiche
export const notificationsConfig: NotificationsConfig = {
  schedule: {
    from: 10, // Ora di inizio
    to: 16 // Ora di fine
  },
  messages: [
    'Hai già fatto qualcosa per te oggi?',
    'Prenditi una pausa ☕',
    'Sei sulla strada giusta 🚀',
    'Non mollare proprio ora 💪',
    'Un piccolo passo è sempre meglio di niente',
    'Ehi, sei abbastanza. Sempre. ✨'
  ],
  notificationsPerDay: 3 // Numero di notifiche per giorno
};
