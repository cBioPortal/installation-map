
/// <reference types="vite/client" />

import { Instance } from "@/types/instance";

declare global {
  interface Window {
    allInstances?: Instance[];
  }
}
