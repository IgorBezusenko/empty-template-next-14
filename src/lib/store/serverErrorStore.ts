import { ServerError } from "@/types";
import { create } from "zustand";

interface ServerErrorState {
  error: ServerError | null;
  clearError: () => void;
  setError: (value: ServerError) => void;
  msgError: string;
  isClientWarning: boolean;
  setMsgError: (value: string, isClientWarning?: boolean) => void;
}

const useServerErrorStore = create<ServerErrorState>((set) => ({
  error: null,
  msgError: "",
  isClientWarning: false,
  clearError: () => {
    set({ error: null, msgError: "" });
  },
  setError: (value: ServerError) => {
    set((state) => ({ ...state, error: value }));
  },
  setMsgError: (value: string, isClientWarning = false) => {
    set((state) => ({
      ...state,
      msgError: value,
      isClientWarning: isClientWarning
    }));
  }
}));

export default useServerErrorStore;
