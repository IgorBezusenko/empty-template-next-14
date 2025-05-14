import { clsx, type ClassValue } from "clsx";
import { UseFormSetError } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const formatArgumentsSchema = z.object({
  ComparisonValue: z.number().optional(),
  ComparisonProperty: z.string().optional(),
  PropertyName: z.string(),
  PropertyValue: z.union([z.string(), z.number()]),
  PropertyPath: z.string(),
  MinLength: z.number().optional(),
  MaxLength: z.number().optional(),
  TotalLength: z.number().optional(),
  CollectionIndex: z.number().optional()
});

export const validationErrorSchema = z.object({
  collectionIndex: z.number().nullable(),
  propertyName: z.string(),
  errorCode: z.string(),
  errorMessage: z.string(),
  errorFormat: z.string(),
  formatArguments: formatArgumentsSchema
});

// ✅ Пример использования:
export type ValidationError = z.infer<typeof validationErrorSchema>;

/* eslint-disable @typescript-eslint/no-explicit-any */
export function applyServerErrors<T extends Record<string, any>>(
  data: ValidationError[],
  setError: UseFormSetError<T>
) {
  data.forEach((err) => {
    const path = err.formatArguments?.PropertyPath ?? err.propertyName;

    // Преобразуем путь вида Phones[0].Phone => Phones.0.Phone
    const normalizedPath = path
      .replace(/\[(\d+)]/g, ".$1") // => Phones.0.Phone
      .replace(/^\./, ""); // убираем ведущую точку, если есть

    setError(normalizedPath as any, {
      type: "server",
      message: err.errorMessage
    });
  });
}
