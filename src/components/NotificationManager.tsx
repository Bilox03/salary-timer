import {useEffect} from 'react';
import * as Notifications from 'expo-notifications';
import {notificationsConfig} from '@/config/notifications';

// Funzione per richiedere i permessi di notifica
async function requestNotificationPermission() {
  // Ottieni il permesso per le notifiche
  const {status} = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    console.log('Permessi di notifica non concessi');
  } else {
    console.log('Permessi di notifica concessi');
  }
}

// Funzione per inviare una notifica immediata
async function sendImmediateNotification() {
  const message = notificationsConfig.messages[Math.floor(Math.random() * notificationsConfig.messages.length)];

  console.log('Invio notifica immediata...');
  console.log('Messaggio:', message);

  // Invia una notifica immediata
  const res = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Notifica di prova',
      body: 'Questa è una notifica di prova inviata da Expo!'
    },
    trigger: null // Invia immediatamente
  });

  console.log('Notifica inviata:', res);

  console.log('Notifica inviata immediatamente!');
}

// Funzione per programmare notifiche locali in un orario casuale
async function scheduleDailyRandomNotifications() {
  const {schedule, messages, notificationsPerDay} = notificationsConfig;

  for (let i = 0; i < notificationsPerDay; i++) {
    const randomHour = Math.floor(Math.random() * (schedule.to - schedule.from)) + schedule.from;
    const randomMinute = Math.floor(Math.random() * 60); // Minuti casuali

    const triggerDate = new Date();
    triggerDate.setHours(randomHour, randomMinute, 0); // Imposta ora e minuti casuali

    const message = messages[Math.floor(Math.random() * messages.length)];

    await Notifications.scheduleNotificationAsync({
      content: {
        title: '👋 Hey!',
        body: message
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
        hour: triggerDate.getHours(),
        minute: triggerDate.getMinutes(),
        repeats: true // Imposta ripetizione giornaliera
      }
    });

    console.log(`Notifica programmata per: ${triggerDate.toLocaleTimeString()}`);
  }
}

const NotificationManager = () => {
  useEffect(() => {
    requestNotificationPermission(); // Richiedi permesso notifiche
    sendImmediateNotification(); // Invia una notifica immediata
    scheduleDailyRandomNotifications(); // Programma notifiche giornaliere
  }, []);

  return null; // Non renderizza nulla, solo la logica delle notifiche
};

export default NotificationManager;
