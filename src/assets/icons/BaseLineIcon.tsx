import type { IconProps } from "@/types/icons";

const BaseLineIcon = ({ className, size = 24 }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 20h16" />
    <path d="m6 16 6-12 6 12" />
    <path d="M8 12h8" />
  </svg>
);

export default BaseLineIcon;
