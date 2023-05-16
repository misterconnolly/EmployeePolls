export const nameAvatarUrl = (name) => {
  return `https://eu.ui-avatars.com/api/?name=${name}&size=250`;
};

export const createAvatarUrlIfEmpty = (url, name) => {
  return url && url !== "" ? url : nameAvatarUrl(name);
};
