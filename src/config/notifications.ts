interface NotificationsConfig {
  schedule: {
    from: number;
    to: number;
  };
  notificationsPerDay: number;
}

export const notificationsConfig: NotificationsConfig = {
  schedule: {
    from: 10,
    to: 16
  },
  notificationsPerDay: 1
};
