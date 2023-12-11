import { namespaces } from "@/constants/namespace";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFilePath(namespace: string) {
  const path = namespaces.find((_namespace) => _namespace.name === namespace);

  return path?.secondary_path;
}
