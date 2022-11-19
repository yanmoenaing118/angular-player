import { convertVttToJson } from "./vtt-json";

export const fetchSubtitle = async (url: string) => {
  const res = await fetch(new Request(url));
  const subtitleText = await res.text();
  return subtitleText;
};

export const createSubtitle = async (text: string) => {
  let syncData = [];
  const result:any = await convertVttToJson(text);
  let x = 0;
  for (let i = 0; i < result.length; i++) {
    if (result[i].part && result[i].part.trim() !== "") {
      syncData[x] = result[i];
      x++;
    }
  }

  return syncData;
};
