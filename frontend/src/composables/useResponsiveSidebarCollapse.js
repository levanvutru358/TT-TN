import { onBeforeUnmount, onMounted } from "vue";

const DEFAULT_BREAKPOINT = 1024;

export function useResponsiveSidebarCollapse(sidebarCollapsedRef, breakpoint = DEFAULT_BREAKPOINT) {
  let wasAutoCollapsed = false;

  const syncSidebarCollapse = () => {
    if (typeof window === "undefined") {
      return;
    }

    if (window.innerWidth < breakpoint) {
      if (!sidebarCollapsedRef.value) {
        sidebarCollapsedRef.value = true;
      }
      wasAutoCollapsed = true;
      return;
    }

    if (wasAutoCollapsed) {
      sidebarCollapsedRef.value = false;
      wasAutoCollapsed = false;
    }
  };

  onMounted(() => {
    syncSidebarCollapse();
    window.addEventListener("resize", syncSidebarCollapse);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", syncSidebarCollapse);
  });
}
