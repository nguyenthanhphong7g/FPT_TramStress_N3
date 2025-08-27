import { getYoutubeVideoID } from "./getYoutubeVideoId";

export const getThumbnailVideo = (youtubeUrl) => {
  const videoID = getYoutubeVideoID(youtubeUrl);
  if (!videoID) return null;
  return `https://img.youtube.com/vi/${videoID}/hqdefault.jpg`;
};