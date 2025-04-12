export const notificationRoutes = {
  // POST /notifications/create
  createNotification: "/notifications/create",

  // PATCH /notifications/:id/status
  updateNotificationStatus: (id: number) => `/notifications/${id}/status`,

  // GET /notifications/student
  getStudentNotifications: "/notifications/student",

  // GET /notifications/all
  getAllNotifications: "/notifications/all",
};
