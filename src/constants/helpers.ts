export const extractFilenameFromUrl = (url: string) => {
  return url.substring(url.lastIndexOf("/") + 1);
};

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("token");
  return !!token;
};
