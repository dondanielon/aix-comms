export const XIcon = (props: { className: string }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={props.className}
  >
    <path d='M18 6 6 18' />
    <path d='m6 6 12 12' />
  </svg>
);

export const JoinIcon = (props: { className: string }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={props.className}
  >
    <path d='M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4' />
    <polyline points='10 17 15 12 10 7' />
    <line x1='15' x2='3' y1='12' y2='12' />
  </svg>
);

export const AdminIcon = (props: { className: string }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={props.className}
  >
    <path d='M2 21a8 8 0 0 1 10.434-7.62' />
    <circle cx='10' cy='8' r='5' />
    <circle cx='18' cy='18' r='3' />
    <path d='m19.5 14.3-.4.9' />
    <path d='m16.9 20.8-.4.9' />
    <path d='m21.7 19.5-.9-.4' />
    <path d='m15.2 16.9-.9-.4' />
    <path d='m21.7 16.5-.9.4' />
    <path d='m15.2 19.1-.9.4' />
    <path d='m19.5 21.7-.4-.9' />
    <path d='m16.9 15.2-.4-.9' />
  </svg>
);
