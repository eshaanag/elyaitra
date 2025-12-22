export function getUserId(): number | null {
  const id = localStorage.getItem("user_id");
  if (!id) return null;
  return Number(id);
}

export function requireAuth(router: any) {
  const userId = getUserId();
  if (!userId) {
    router.replace("/auth");
    return null;
  }
  return userId;
}
