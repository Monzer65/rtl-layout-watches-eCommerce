import { Noto_Naskh_Arabic, Vazirmatn } from "next/font/google";

export const vazirmatn = Vazirmatn({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  subsets: ["arabic", "latin-ext"],
});

export const notonaskh = Noto_Naskh_Arabic({
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["arabic", "latin-ext"],
});
