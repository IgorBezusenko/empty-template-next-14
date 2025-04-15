"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import useServerErrorStore from "@/lib/store/serverErrorStore";
import { cn } from "@/lib/utils";
import { MessageCircleWarning, TriangleAlert } from "lucide-react";

const ServerErrorDialog = () => {
  const clearError = useServerErrorStore((state) => state.clearError);
  const error = useServerErrorStore((state) => state.error);
  const msgError = useServerErrorStore((state) => state.msgError);
  const isClientWarning = useServerErrorStore((state) => state.isClientWarning);
  const isOneMsgGet = !!error || !!msgError;

  return (
    <Dialog
      open={isOneMsgGet}
      onOpenChange={clearError}
    >
      <DialogContent
        className={cn("scrollbar max-w-[860px] gap-2", {
          "max-w-[512px]": isClientWarning
        })}
      >
        <DialogHeader className='space-y-2'>
          <DialogTitle
            className={cn(
              "flex w-full items-center gap-2 text-lg font-semibold text-red-600",
              {
                "text-slate-900": isClientWarning
              }
            )}
          >
            {isClientWarning ? (
              <>
                <MessageCircleWarning className='size-[25px] text-emerald-500' />
                titleClientWarning
              </>
            ) : (
              <>
                <TriangleAlert className='size-6' />
                title
              </>
            )}
          </DialogTitle>
          <DialogDescription
            className={cn("text-base leading-6 text-slate-800", {
              "text-slate-800": isClientWarning
            })}
          >
            {error?.errorMessageShort || msgError}
          </DialogDescription>
        </DialogHeader>

        <div>{error?.errorMessageFull || msgError}</div>
        <DialogClose asChild>
          <Button className='ml-auto mt-2'>close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default ServerErrorDialog;
