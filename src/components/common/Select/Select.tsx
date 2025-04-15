import { Badge } from "@/components/ui/badge";
import {
  Select as BaseSelect,
  SelectContent,
  SelectItem,
  SelectTrigger
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import * as SelectPrimitive from "@radix-ui/react-select";
import { SelectProps as RadixSelectProps } from "@radix-ui/react-select";
import { Check, X } from "lucide-react";
import { useMemo, useState } from "react";

interface SelectProps<T> extends Omit<RadixSelectProps, "value"> {
  className?: string;
  components?: {
    Item?: (props: { value: T | undefined }) => JSX.Element;
    Trigger?: (props: {
      placeholder?: string;
      value: T | undefined;
    }) => JSX.Element;
  };
  data: T[] | undefined;
  getOptionLabel?: (option: T) => string;
  getOptionValue?: (option: T) => string;
  onChange?: (value: T | undefined) => void;
  isMulti?: boolean;
  placeholder?: string;
  value?: T | T[];
}

type CorrectProps<T> = SelectProps<T> &
  ({ isMulti: true; value: T[] } | { isMulti?: false; value?: T });

export default function Select<T>({
  className,
  data,
  components,
  getOptionLabel,
  getOptionValue,
  onChange,
  placeholder,
  value,
  isMulti,
  ...props
}: CorrectProps<T>) {
  const [localValue, setLocalValue] = useState<T | T[] | undefined>(value);

  const getOptionValueFn = useMemo(
    () =>
      getOptionValue ??
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((option: T) => (option as any)?.val as string) ??
      "",
    [getOptionValue]
  );

  const getOptionLabelFn = useMemo(
    () =>
      getOptionLabel ??
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((option: T) => (option as any)?.val as string) ??
      "",
    [getOptionLabel]
  );

  const handleChange = (value: string) => {
    if (onChange) {
      onChange(data?.find((option) => getOptionValueFn(option) === value));
    } else {
      setLocalValue(data?.find((option) => getOptionValueFn(option) === value));
    }
  };

  return (
    <BaseSelect
      onValueChange={handleChange}
      value={value && !Array.isArray(value) ? getOptionValueFn(value) : ""}
      {...props}
    >
      {components?.Trigger ? (
        <SelectPrimitive.Trigger asChild>
          {components.Trigger({
            placeholder,
            value: Array.isArray(value)
              ? value.at(0)
              : value ||
                (Array.isArray(localValue) ? localValue.at(0) : localValue)
          })}
        </SelectPrimitive.Trigger>
      ) : (
        <SelectTrigger
          className={cn("h-auto min-h-10", isMulti && "px-2 py-1", className)}
        >
          {value && Array.isArray(value) && isMulti ? (
            <div className='flex flex-wrap gap-2'>
              {value.map((item) => (
                <Badge
                  className='mr-1 flex h-8 items-center gap-2 rounded-md border border-slate-300 py-2.5 text-sm font-normal leading-[14px] text-slate-900'
                  key={getOptionValueFn(item)}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    console.log(
                      "getOptionValueFn(item)",
                      getOptionValueFn(item)
                    );
                    handleChange(getOptionValueFn(item));
                  }}
                  variant='secondary'
                >
                  {getOptionLabelFn(item)}
                  <X className='size-4' />
                </Badge>
              ))}
            </div>
          ) : value && !Array.isArray(value) ? (
            getOptionLabelFn(value)
          ) : localValue && !Array.isArray(localValue) ? (
            getOptionLabelFn(localValue)
          ) : (
            <span className='font-normal text-slate-500'>{placeholder}</span>
          )}
        </SelectTrigger>
      )}
      <SelectContent>
        {data?.map((item) =>
          components?.Item ? (
            <SelectPrimitive.Item
              className='focus-visible:bg-slate-100 focus-visible:outline-none'
              key={getOptionValueFn(item)}
              value={getOptionValueFn(item)}
            >
              <SelectPrimitive.ItemText>
                {components.Item({ value: item })}
              </SelectPrimitive.ItemText>
            </SelectPrimitive.Item>
          ) : (
            <SelectItem
              key={getOptionValueFn(item)}
              onPointerUp={(e) => {
                if (isMulti) {
                  e.preventDefault();
                  handleChange(getOptionValueFn(item));
                }
              }}
              disabled={
                item &&
                typeof item === "object" &&
                "disabled" in item &&
                (item as { disabled: boolean }).disabled
              }
              value={getOptionValueFn(item)}
            >
              {value && Array.isArray(value) && isMulti ? (
                value.find(
                  (option) =>
                    getOptionValueFn(option) === getOptionValueFn(item)
                ) ? (
                  <div key={getOptionValueFn(item)}>
                    {getOptionLabelFn(item)}
                    <Check className='absolute right-2 top-1/2 size-4 -translate-y-1/2' />
                  </div>
                ) : (
                  getOptionLabelFn(item)
                )
              ) : (
                getOptionLabelFn(item)
              )}
            </SelectItem>
          )
        )}
      </SelectContent>
    </BaseSelect>
  );
}
