export const generateUsername = (firstName, lastName) => {
  const randomNum = Math.floor(Math.random() * 10000);
  return `${firstName}${lastName}${randomNum}`;
};
