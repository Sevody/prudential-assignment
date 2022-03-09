export const uploadImage = async (uri) => {
  const data = new FormData();
  // @ts-ignore
  data.append("file", { uri, type: "image/jpeg", name: "image.jpg" });
  data.append("upload_preset", "upload_preset");
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload`,
    {
      method: "post",
      body: data,
    }
  );
  return await res.json();
};
