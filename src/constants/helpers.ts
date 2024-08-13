import { authRequest } from "@/config/baseUrl";

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

export const downloadCompressPdf = async (compressedFileUrl: string) => {
  try {
    console.log({ compressedFileUrl });
    const response = await fetch(compressedFileUrl);
    const blob = await response.blob();

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", extractFilenameFromUrl(compressedFileUrl));
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // save to db
    authRequest.post(`/history/save_download/`, { path: compressedFileUrl });
  } catch (error) {
    console.error("Error downloading PDF:", error);
  }
};

export const formattedDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });
