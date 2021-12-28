export const isImage = (file: File): boolean => {
  // eslint-disable-next-line no-unneeded-ternary
  return /image\/\w+/.test(file.type) ? true : false;
};

export const isTxt = (file: File): boolean => {
  // eslint-disable-next-line no-unneeded-ternary
  return /text\/plain\/\w+/.test(file.type) ? true : false;
};

// 文件是否超过要求的大小
export const isSizeValid = (file: File, maxSize: number): boolean => {
  // eslint-disable-next-line no-unneeded-ternary
  return file.size > maxSize ? false : true;
};

/**
 * 图片*文件转base64
 * @param file
 * @returns
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise<string>((resolve) => {
    // 异步读取文件
    const reader = new FileReader();
    // 调用reader.readAsDataURL()方法，把图片转成base64
    reader.readAsDataURL(file);
    reader.onload = function (evt) {
      const imgBase64Data = evt.target?.result as string;

      resolve(imgBase64Data);
    };
  });
};
