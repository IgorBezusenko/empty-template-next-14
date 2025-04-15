"use client";

import Select from "@/components/common/Select/Select";
import { getMock } from "@/lib/api/auth";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type SelectProps = { id: number; val: string };
const dataSelectMonth = [
  { id: 1, val: "111111" },
  { id: 2, val: "22222" }
];
export const About = () => {
  const [value, setValue] = useState<SelectProps[]>([]);
  const { data } = useQuery({
    queryKey: ["pokemon"],
    queryFn: getMock
  });
  console.log("data", data);
  return (
    <div>
      <h1>About</h1>
      <Select
        // open={true}
        data={dataSelectMonth}
        placeholder='placeholder'
        value={value}
        isMulti
        onChange={(newValue) => {
          if (newValue) {
            if (value?.find((item) => item.id === newValue.id)) {
              setValue(value?.filter((item) => item.id !== newValue.id));
            } else if (value) {
              setValue([...value, newValue]);
            } else {
              setValue([newValue]);
            }
          }
        }}
      />
    </div>
  );
};
