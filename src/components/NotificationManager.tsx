import {useEffect} from 'react';
import * as Notifications from 'expo-notifications';
import {useTranslation} from 'react-i18next';
import {notificationsConfig} from '@/config/notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false
  })
});

async function requestNotificationPermission() {
  const {status} = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    return false;
  }
  return true;
}

async function sendImmediateNotification(t: any) {
  const messages = t('notifications.title', {returnObjects: true});
  const message = messages[Math.floor(Math.random() * messages.length)];

  await Notifications.scheduleNotificationAsync({
    content: {
      title: message,
      body: t('notifications.body')
    },
    trigger: null
  });
}

async function scheduleDailyRandomNotifications(t: any) {
  const {schedule, notificationsPerDay} = notificationsConfig;
  const messages = t('notifications.title', {returnObjects: true});

  for (let i = 0; i < notificationsPerDay; i++) {
    const randomHour = Math.floor(Math.random() * (schedule.to - schedule.from)) + schedule.from;
    const randomMinute = Math.floor(Math.random() * 60);

    const triggerDate = new Date();
    triggerDate.setHours(randomHour, randomMinute, 0);

    if (triggerDate <= new Date()) {
      continue;
    }

    const message = messages[Math.floor(Math.random() * messages.length)];

    await Notifications.scheduleNotificationAsync({
      content: {
        title: message,
        body: t('notifications.body')
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
        hour: triggerDate.getHours(),
        minute: triggerDate.getMinutes(),
        repeats: true
      }
    });
  }
}

const NotificationManager = () => {
  const {t} = useTranslation();

  useEffect(() => {
    (async () => {
      const permissionGranted = await requestNotificationPermission();
      if (!permissionGranted) return;

      sendImmediateNotification(t);
      scheduleDailyRandomNotifications(t);
    })();
  }, [t]);

  return null;
};

export default NotificationManager;
