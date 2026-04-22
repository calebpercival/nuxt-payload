// // plugins/reveal.ts
// const variants = {
//   "fade-up": {
//     hidden: "opacity: 0; transform: translateY(30px);",
//     visible: "opacity: 1; transform: translateY(0);",
//     transition: "opacity 0.6s ease, transform 0.6s ease",
//   },
//   "fade-in": {
//     hidden: "opacity: 0;",
//     visible: "opacity: 1;",
//     transition: "opacity 0.6s ease",
//   },
//   "clip-in": {
//     hidden: "opacity: 1; clip-path: inset(0 100% 0 0);",
//     visible: "opacity: 1; clip-path: inset(0 0% 0 0);",
//     transition: "clip-path 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
//   },
// } as const;

// type VariantKey = keyof typeof variants;

// interface RevealOptions {
//   variant?: VariantKey;
//   delay?: number;
//   threshold?: number;
// }

// export default defineNuxtPlugin((nuxtApp) => {
//   const router = nuxtApp.$router as ReturnType<typeof useRouter>;

//   nuxtApp.vueApp.directive("reveal", {
//     mounted(el: HTMLElement, binding) {
//       const options: RevealOptions =
//         typeof binding.value === "string"
//           ? { variant: binding.value as VariantKey }
//           : (binding.value ?? {});

//       const { variant = "fade-up", delay = 0, threshold = 0.15 } = options;
//       const v = variants[variant];

//       el.setAttribute("style", `${v.hidden} transition: ${v.transition};`);

//       let observer: IntersectionObserver | null = null;

//       router.isReady().then(() => {
//         setTimeout(() => {
//           if (!el.isConnected) return;

//           observer = new IntersectionObserver(
//             ([entry]) => {
//               if (entry.isIntersecting) {
//                 setTimeout(() => {
//                   if (!el.isConnected) return;
//                   el.setAttribute(
//                     "style",
//                     `${v.visible} transition: ${v.transition};`,
//                   );
//                 }, delay);
//                 observer?.disconnect();
//                 observer = null;
//               }
//             },
//             { threshold },
//           );

//           observer.observe(el);
//         }, 100);
//       });

//       (el as any)._revealCleanup = () => {
//         observer?.disconnect();
//         observer = null;
//       };
//     },

//     unmounted(el: HTMLElement) {
//       (el as any)._revealCleanup?.();
//     },
//   });
// });

// new version allowing for large elements by using fixed px safe threshold rather than percent of element visible.
const variants = {
  "fade-up": {
    hidden: "opacity: 0; transform: translateY(30px);",
    visible: "opacity: 1; transform: translateY(0);",
    transition: "opacity 0.6s ease, transform 0.6s ease",
  },
  "fade-in": {
    hidden: "opacity: 0;",
    visible: "opacity: 1;",
    transition: "opacity 0.6s ease",
  },
  "clip-in": {
    hidden: "opacity: 1; clip-path: inset(0 100% 0 0);",
    visible: "opacity: 1; clip-path: inset(0 0% 0 0);",
    transition: "clip-path 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
  },
} as const;

type VariantKey = keyof typeof variants;

interface RevealOptions {
  variant?: VariantKey;
  delay?: number;
  threshold?: number;
}

// Convert a desired visible-pixel amount into a safe 0–1 threshold,
// clamped so it never exceeds what the viewport can show at once.
function safeThreshold(el: HTMLElement, desiredPx = 150): number {
  const elHeight = el.getBoundingClientRect().height;
  if (elHeight === 0) return 0;
  const viewportH = window.innerHeight;
  // Never ask for more than fits in the viewport (with a small safety margin)
  const maxPx = viewportH * 0.9;
  const px = Math.min(desiredPx, maxPx);
  return Math.min(px / elHeight, 1);
}

export default defineNuxtPlugin((nuxtApp) => {
  const router = nuxtApp.$router as ReturnType<typeof useRouter>;

  nuxtApp.vueApp.directive("reveal", {
    mounted(el: HTMLElement, binding) {
      const options: RevealOptions =
        typeof binding.value === "string"
          ? { variant: binding.value as VariantKey }
          : (binding.value ?? {});

      const { variant = "fade-up", delay = 0, threshold } = options;
      const v = variants[variant];

      el.setAttribute("style", `${v.hidden} transition: ${v.transition};`);

      let observer: IntersectionObserver | null = null;

      router.isReady().then(() => {
        setTimeout(() => {
          if (!el.isConnected) return;

          // Use caller-supplied threshold if explicit, otherwise compute a
          // pixel-based one that's safe for elements of any height.
          const resolvedThreshold = threshold ?? safeThreshold(el);

          observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                setTimeout(() => {
                  if (!el.isConnected) return;
                  el.setAttribute(
                    "style",
                    `${v.visible} transition: ${v.transition};`,
                  );
                }, delay);
                observer?.disconnect();
                observer = null;
              }
            },
            { threshold: resolvedThreshold },
          );

          observer.observe(el);
        }, 100);
      });

      (el as any)._revealCleanup = () => {
        observer?.disconnect();
        observer = null;
      };
    },

    unmounted(el: HTMLElement) {
      (el as any)._revealCleanup?.();
    },
  });
});
