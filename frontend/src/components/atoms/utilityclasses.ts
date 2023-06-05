import { css } from "lit";

export const utilityClasses = css`
  .larger {
    font-size: calc(var(--font-size, 14) * 1.25);
  }

  .ib {
    display: inline-block;
  }

  .rotate-left {
    rotate: -90deg;
  }

  .rotate-right {
    rotate: 90deg;
  }

  .mirror-h {
    transform: scale(-1, 1);
  }

  .text-shadow-1 {
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.25);
  }
`;
