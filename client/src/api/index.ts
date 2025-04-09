import { apiInstance } from './axiosInstance'
import { achievementRoutes } from './routes';

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
};
