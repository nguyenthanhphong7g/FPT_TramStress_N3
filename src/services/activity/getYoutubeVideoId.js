export const getYoutubeVideoID = (url) => {
  if (typeof url !== 'string') return null;
  const regExp = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&\n?#]+)/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};
