export const announcementRoutes = {
  // POST /announcements
  addAnnouncement: "/announcements",

  // GET /announcements
  getAnnouncements: "/announcements",

  // DELETE /announcements/:id
  deleteAnnouncement: (id: number) => `/announcements/${id}`,
};
