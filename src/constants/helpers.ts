export const extractFilenameFromUrl = (url: string) => {
  return url.substring(url.lastIndexOf("/") + 1);
};

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("token");
  return !!token;
};

export const convertCentsToDollars = (cents: number) => {
  return (cents / 100).toFixed(2); // Convert cents to dollars with two decimal places
};
