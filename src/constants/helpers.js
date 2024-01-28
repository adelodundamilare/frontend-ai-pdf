export const extractFilenameFromUrl = (url) => {
  return url.substring(url.lastIndexOf("/") + 1);
};
