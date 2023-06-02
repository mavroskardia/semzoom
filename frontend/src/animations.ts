import { css } from "lit";

export const animationStyles = css`
  .slide-right {
    animation: slide-right 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }

  .slide-left {
    animation: slide-left 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }

  .slide-fwd-center {
    animation: slide-fwd-center 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite
      both;
  }

  .scale-up-center {
    animation: scale-up-center 2s cubic-bezier(0.86, 0, 0.07, 1) both;
  }

  .fade-in {
    animation: fade-in 1s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  }

  @keyframes slide-right {
    0% {
      transform: translateX(calc(-1 * var(--menu-width, 200px)));
    }
    100% {
      transform: translateX(0px);
    }
  }

  @keyframes slide-left {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(-1 * var(--menu-width, 200px)));
    }
  }

  @keyframes slide-fwd-center {
    0% {
      transform: translateZ(0);
    }
    100% {
      transform: translateZ(600px);
    }
  }

  @keyframes scale-up-center {
    0% {
      transform: scale(1);
      rotate: 0deg;
    }
    75% {}
    100% {
      transform: scale(100);
      rotate: 90deg;
    }
  }

  @keyframes fade-in {
    75% {
      opacity: 0.75;
    }
    100% {
      opacity: 1;
    }
  }
`;
