export const imageParse = (images: string) => {
  try {
    const parsedImages = JSON.parse(images);
    return Array.isArray(parsedImages) && parsedImages.length > 0
      ? parsedImages[0]
      : 'https://via.placeholder.com/300';
  } catch (error) {
    console.error("Error parsing images:", error);
    return 'https://via.placeholder.com/300';
  }
};
