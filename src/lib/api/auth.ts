import { customAxios } from "@/lib/api/index";

export const getMock = async () => {
  const res = await customAxios.get("https://pokeapi.co/api/v2/poskemon/25");
  return res.data;
};
