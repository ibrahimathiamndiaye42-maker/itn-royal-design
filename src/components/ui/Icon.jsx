const paths = {
  search: <><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></>,
  bag: <><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 8V6.5a3 3 0 0 1 6 0V8" /></>,
  heart: <path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  menu: <path d="M4 8h16M4 16h16" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  left: <path d="m14.5 5-7 7 7 7" />,
  right: <path d="m9.5 5 7 7-7 7" />,
  down: <path d="m5 9.5 7 7 7-7" />,
  share: <><path d="M12 15V4" /><path d="m8 8 4-4 4 4" /><path d="M5 12v7h14v-7" /></>,
  filter: <><path d="M4 7h10M18 7h2M4 17h2M10 17h10" /><circle cx="16" cy="7" r="2" /><circle cx="8" cy="17" r="2" /></>,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  arrow: <path d="M4 12h15m-5-5 5 5-5 5" />,
  trash: <><path d="M5 7h14M10 7V5h4v2M7 7l1 12h8l1-12" /></>,
  home: <><path d="M4 11 12 4l8 7" /><path d="M6 10v10h12V10" /></>,
  grid: <><rect x="4" y="4" width="6.5" height="6.5" /><rect x="13.5" y="4" width="6.5" height="6.5" /><rect x="4" y="13.5" width="6.5" height="6.5" /><rect x="13.5" y="13.5" width="6.5" height="6.5" /></>,
  single: <rect x="5" y="4" width="14" height="16" />,
  instagram: <><rect x="4" y="4" width="16" height="16" rx="4.5" /><circle cx="12" cy="12" r="3.6" /><circle cx="17" cy="7" r=".6" /></>,
  facebook: <path d="M14 20v-7h2.6l.5-3H14V8.2c0-.9.4-1.5 1.6-1.5H17V4.1C16.6 4 15.7 4 14.9 4 12.800 4 11 5.300 11 7.800V10H8.500v3H11v7" />,
  tiktok: <path d="M14 4v10.2a3.2 3.2 0 1 1-3.2-3.200M14 4c.4 2.300 1.800 3.800 4.200 4" />,
};

export function Icon({ name, className = 'h-[22px] w-[22px]', filled = false, strokeWidth = 1.5, ...rest }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}

export function WhatsAppIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M12.040 2a9.900 9.900 0 0 0-8.450 15.040L2 22l5.100-1.560A9.900 9.900 0 1 0 12.040 2Zm0 1.800a8.100 8.100 0 1 1-4.150 15.050l-.3-.18-3.020.92.94-2.940-.2-.32A8.100 8.100 0 0 1 12.040 3.800Zm-3.100 3.700c-.17 0-.45.06-.69.32-.24.260-.9.880-.9 2.150s.93 2.490 1.060 2.660c.13.170 1.800 2.860 4.440 3.900 2.200.870 2.640.7 3.120.66.480-.04 1.540-.63 1.760-1.240.22-.61.22-1.130.15-1.240-.06-.11-.24-.17-.5-.3-.27-.13-1.540-.76-1.780-.85-.24-.09-.41-.13-.59.130-.17.260-.68.850-.83 1.020-.15.170-.3.200-.57.070-.26-.13-1.100-.4-2.100-1.300-.78-.69-1.300-1.540-1.450-1.800-.15-.26-.02-.4.110-.53.120-.12.260-.3.390-.46.130-.15.170-.26.260-.44.090-.17.040-.33-.02-.46-.07-.13-.58-1.420-.8-1.940-.2-.5-.42-.43-.58-.44h-.5Z" />
    </svg>
  );
}
