import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";
import {
    DATE_FORMAT_DATEPICKER_WITH_LOCALE,
    ISO_DATE_FORMAT
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { CalendarDays } from "lucide-react";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

interface TDatePickerWithRangeProps
    extends React.HTMLAttributes<HTMLDivElement> {
    value:
        | {
        from?: string | null | undefined;
        to?: string | null | undefined;
    }
        | undefined;
    onValueChange: (date: { from: string | null; to: string | null }) => void;
    defaultValueDateRange?: DateRange;
}

export function DatePickerWithRange({
                                        className,
                                        value,
                                        onValueChange,
                                        defaultValueDateRange,
                                        datatype = DATE_FORMAT_DATEPICKER_WITH_LOCALE
                                    }: TDatePickerWithRangeProps) {
    const dateFrom = value?.from && new Date(value?.from);
    const dateTo = value?.to && new Date(value?.to);
    const concatData =
        dateFrom && dateTo ? { from: dateFrom, to: dateTo } : undefined;
    const [date, setDate] = useState<DateRange | undefined>(
        defaultValueDateRange || concatData
    );

    const { t } = useTranslation("common");

    useEffect(() => {
        !value && setDate(undefined);
    }, [value]);

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id='date'
                        variant='outline'
                        className={cn(
                            "w-full justify-between px-3 text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, datatype, {
                                        locale: ru
                                    })}{" "}
                                    -{" "}
                                    {format(date.to, datatype, {
                                        locale: ru
                                    })}
                                </>
                            ) : (
                                format(date.from, datatype, {
                                    locale: ru
                                })
                            )
                        ) : (
                            <span className='text-slate-500'>
                {t("form.datePickerPlaceholder")}
              </span>
                        )}
                        <CalendarDays className='size-5 stroke-1 text-slate-500' />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                        initialFocus
                        mode='range'
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={(range) => {
                            setDate(range);
                            if (range?.from && range?.to) {
                                onValueChange({
                                    from: format(range?.from, ISO_DATE_FORMAT),
                                    to: format(range?.to, ISO_DATE_FORMAT) || null
                                });
                            } else {
                                onValueChange({ from: null, to: null });
                            }
                        }}
                        locale={ru}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
