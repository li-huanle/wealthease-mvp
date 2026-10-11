/** Join class names, skipping falsy values (a dependency-free stand-in for shadcn's cn()). */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}
