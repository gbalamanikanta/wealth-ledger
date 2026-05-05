import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../index';

const selectNotificationsState = (state: RootState) => state.notifications;

export const selectAllNotifications = createSelector(
  [selectNotificationsState],
  (notifications) => notifications.items
);

export const selectRecentNotifications = createSelector([selectAllNotifications], (items) =>
  items.slice(0, 3)
);

export const selectUnreadNotifications = createSelector([selectAllNotifications], (items) =>
  items.filter((item) => !item.read)
);

export const selectHasUnreadNotifications = createSelector(
  [selectUnreadNotifications],
  (items) => items.length > 0
);
