import { api } from './axiosInstance'
import { achievementRoutes } from './routes';

export const achievementApi = {
  addAchievement: (data: any) =>
    api.post(achievementRoutes.addAchievement, data),

  addCertificate: (id: string) =>
    api.patch(achievementRoutes.addCertificate(id)),

  editAchievement: (id: string, data: any) =>
    api.patch(achievementRoutes.editAchievement(id), data),

  deleteAchievement: (id: string) =>
    api.delete(achievementRoutes.deleteAchievement(id)),

  getAchievement: (id: string) =>
    api.get(achievementRoutes.getAchievement(id)),

  getAllAchievements: () =>
    api.get(achievementRoutes.getAllAchievements),

  exportUserAchievements: () =>
    api.get(achievementRoutes.exportUserAchievements),
};
