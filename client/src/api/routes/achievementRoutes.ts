export const achievementRoutes = {
  addAchievement: "/achievements/add",
  addCertificate: (id: string) => `/achievements/${id}`,
  editAchievement: (id: string) => `/achievements/edit/${id}`,
  deleteAchievement: (id: string) => `/achievements/${id}`,
  getAchievement: (id: string) => `/achievements/${id}`,
  getAllAchievements: "/achievements/all",
  exportUserAchievements: "/achievements/export",
};
