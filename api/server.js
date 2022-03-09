/* eslint-disable no-undef */
export const sendOCR = async (imageUrl) => {
  const res = await fetch(
    `${process.env.SERVER_HOST}/ocr?${new URLSearchParams({
      imageUrl,
    })}`,
    {
      method: "post",
      keepalive: true,
    }
  );
  return await res.json();
};

export const healthCheck = async () => {
  const res = await fetch(`${process.env.SERVER_HOST}`);
  return await res.json();
};

export const getAllOCR = async () => {
  const res = await fetch(`${process.env.SERVER_HOST}/ocrResults`);
  return await res.json();
};

export const clearAllData = async () => {
  const res = await fetch(`${process.env.SERVER_HOST}/clearOcrResult`, {
    method: "post",
  });
  return await res.json();
};
