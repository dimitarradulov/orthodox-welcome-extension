import { NUMBER_OF_IMAGES, S3_BASE_IMAGES_URL } from "../constants/images";

export const getRandomImageUrl = () => {
  const randomNumber = Math.floor(Math.random() * NUMBER_OF_IMAGES) + 1;
  return `${S3_BASE_IMAGES_URL}/${randomNumber}.jpg`;
};
