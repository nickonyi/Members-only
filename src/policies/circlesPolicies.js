export const canDeleteCircle = (req) => {
  return req.membership?.role === "owner";
};
export const canManageMembers = (req) => {
  return req.membership?.role === "owner" || req.membership?.role === "admin";
};
