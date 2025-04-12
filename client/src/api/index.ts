import { apiInstance } from "./axiosInstance";
import { achievementRoutes } from "./routes/achievementRoutes";
import { notificationRoutes } from "./routes/notificationRoutes";
import { announcementRoutes } from "./routes/announcementRoutes";

export const api = {
  addAchievement: (data: any) =>
    apiInstance.post(achievementRoutes.addAchievement, data),

  addCertificate: (id: string) =>
    apiInstance.patch(achievementRoutes.addCertificate(id)),

  editAchievement: (id: string, data: any) =>
    apiInstance.patch(achievementRoutes.editAchievement(id), data),

  deleteAchievement: (id: string) =>
    apiInstance.delete(achievementRoutes.deleteAchievement(id)),

  getAchievement: (id: string) =>
    apiInstance.get(achievementRoutes.getAchievement(id)),

  getAllAchievements: () =>
    apiInstance.get(achievementRoutes.getAllAchievements),

  exportUserAchievements: () =>
    apiInstance.get(achievementRoutes.exportUserAchievements),

  createNotification: (data: { content: string }) =>
    apiInstance.post(notificationRoutes.createNotification, data),

  updateNotificationStatus: (id: number, status: string) =>
    apiInstance.patch(notificationRoutes.updateNotificationStatus(id), {
      status,
    }),

  getStudentNotifications: () =>
    apiInstance.get(notificationRoutes.getStudentNotifications),

  getAllNotifications: () =>
    apiInstance.get(notificationRoutes.getAllNotifications),

  addAnnouncement: (data: any) =>
    apiInstance.post(announcementRoutes.addAnnouncement, data),

  getAnnouncements: () => apiInstance.get(announcementRoutes.getAnnouncements),

  deleteAnnouncement: (id: number) =>
    apiInstance.delete(announcementRoutes.deleteAnnouncement(id)),
};
