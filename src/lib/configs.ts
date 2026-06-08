export const baseUrl =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000"
    : "https://konjiehifc.vercel.app";

export const apiConfig = {
  base: `${baseUrl}/api`,
  messages: `${baseUrl}/api/messages`,
  fileUpload: `${baseUrl}/api/file/cloudinary`,
  file: `${baseUrl}/api/file`,
};