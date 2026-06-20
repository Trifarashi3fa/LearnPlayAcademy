import type { VisualObjectName } from "@/data/mvp-forest-world";

export function MathObjectIcon({
  object,
  className = "h-12 w-12",
}: {
  object: VisualObjectName;
  className?: string;
}) {
  const common = {
    viewBox: "0 0 64 64",
    className,
    "aria-hidden": true,
    focusable: false,
  } as const;

  switch (object) {
    case "apple":
      return (
        <svg {...common}>
          <path d="M33 17c-2-7 2-11 7-13" fill="none" stroke="#6B3F18" strokeWidth="4" strokeLinecap="round" />
          <path d="M35 12c5-5 11-3 14 1-5 3-10 4-14-1Z" fill="#66CC00" />
          <path d="M32 18c-14-8-24 4-21 20 3 17 13 22 21 15 8 7 18 2 21-15 3-16-7-28-21-20Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="2" />
          <circle cx="23" cy="29" r="5" fill="#FF8A8A" opacity=".7" />
        </svg>
      );
    case "orange":
      return (
        <svg {...common}>
          <circle cx="32" cy="35" r="21" fill="#FF9F1C" stroke="#E8790B" strokeWidth="3" />
          <path d="M32 14c2-6 7-9 13-8-1 6-6 10-13 8Z" fill="#66CC00" />
          <path d="M32 16v-6" stroke="#6B3F18" strokeWidth="3" strokeLinecap="round" />
          <circle cx="24" cy="27" r="5" fill="#FFD084" opacity=".8" />
        </svg>
      );
    case "star":
    case "sticker":
      return (
        <svg {...common}>
          <path d="m32 5 8 17 19 2-14 13 4 19-17-10-17 10 4-19L5 24l19-2 8-17Z" fill="#FFC83D" stroke="#EAA900" strokeWidth="3" strokeLinejoin="round" />
        </svg>
      );
    case "bird":
      return (
        <svg {...common}>
          <ellipse cx="31" cy="36" rx="20" ry="16" fill="#3B82F6" />
          <circle cx="43" cy="25" r="11" fill="#60A5FA" />
          <path d="m53 25 9 5-9 4Z" fill="#FF9F1C" />
          <path d="M27 33c-8 2-11 9-7 15 9-1 15-6 16-13Z" fill="#0B63F6" />
          <circle cx="46" cy="23" r="2.5" fill="#082B80" />
          <path d="M19 51h10M37 51h9" stroke="#E8790B" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case "shell":
      return (
        <svg {...common}>
          <path d="M8 50C7 28 16 10 32 10s25 18 24 40c-13 7-35 7-48 0Z" fill="#FFB4D5" stroke="#D9468D" strokeWidth="3" />
          <path d="M32 12v41M18 17l8 36M46 17l-8 36M10 39h44" fill="none" stroke="#D9468D" strokeWidth="2.5" />
        </svg>
      );
    case "berry":
      return (
        <svg {...common}>
          <path d="M32 19c-4-7-10-8-15-5 2 5 7 8 15 5Zm0 0c4-7 10-8 15-5-2 5-7 8-15 5Z" fill="#66CC00" />
          <circle cx="23" cy="32" r="10" fill="#7C3AED" />
          <circle cx="41" cy="32" r="10" fill="#8B5CF6" />
          <circle cx="32" cy="45" r="11" fill="#6D28D9" />
          <circle cx="20" cy="29" r="3" fill="#C4B5FD" />
        </svg>
      );
    case "nut":
      return (
        <svg {...common}>
          <path d="M18 27c0-12 7-19 14-19s14 7 14 19" fill="#8B5A2B" stroke="#6B3F18" strokeWidth="3" />
          <path d="M14 27h36c-1 20-8 29-18 29s-17-9-18-29Z" fill="#C87931" stroke="#6B3F18" strokeWidth="3" />
          <path d="M15 30h34" stroke="#F0B56B" strokeWidth="4" />
        </svg>
      );
    case "coin":
      return (
        <svg {...common}>
          <circle cx="32" cy="32" r="25" fill="#FFC83D" stroke="#EAA900" strokeWidth="4" />
          <circle cx="32" cy="32" r="18" fill="#FFE485" stroke="#EAA900" strokeWidth="2" />
          <path d="m32 18 4 9 10 1-7 7 2 10-9-5-9 5 2-10-7-7 10-1 4-9Z" fill="#FF9F1C" />
        </svg>
      );
    case "flower":
      return (
        <svg {...common}>
          <path d="M32 36v21M31 47c-7-5-12-3-15 1 5 5 10 6 15 3M33 47c7-5 12-3 15 1-5 5-10 6-15 3" fill="#66CC00" stroke="#3F9D00" strokeWidth="2" />
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <ellipse key={angle} cx="32" cy="17" rx="7" ry="12" fill="#FF70B7" transform={`rotate(${angle} 32 30)`} />
          ))}
          <circle cx="32" cy="30" r="9" fill="#FFC83D" />
        </svg>
      );
    case "duck":
      return (
        <svg {...common}>
          <ellipse cx="30" cy="41" rx="23" ry="14" fill="#FFC83D" />
          <circle cx="42" cy="24" r="13" fill="#FFD95F" />
          <path d="m53 25 10 5-10 5Z" fill="#FF9F1C" />
          <path d="M21 37c8-6 16-3 18 5-6 7-14 7-21 2Z" fill="#F4B400" />
          <circle cx="45" cy="21" r="2.5" fill="#082B80" />
        </svg>
      );
    case "ball":
      return (
        <svg {...common}>
          <circle cx="32" cy="32" r="26" fill="#FFFFFF" stroke="#0B63F6" strokeWidth="4" />
          <path d="m32 18 9 7-4 11H27l-4-11 9-7Zm-9 7-12 3m26 8 8 12m-18-12-8 12m22-23 12 3M19 48l-1 7m27-7 1 7" fill="none" stroke="#0B63F6" strokeWidth="3" strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="32" cy="32" r="24" fill="#DCEEFF" stroke="#0B63F6" strokeWidth="3" />
          <circle cx="25" cy="25" r="6" fill="#8B5CF6" />
          <circle cx="40" cy="39" r="8" fill="#22C55E" />
        </svg>
      );
  }
}