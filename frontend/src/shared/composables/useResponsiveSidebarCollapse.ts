import { onBeforeUnmount, onMounted, type Ref } from "vue";

const DEFAULT_BREAKPOINT = 1024;

export function useResponsiveSidebarCollapse(
  sidebarCollapsedRef: Ref<boolean>,
  breakpoint = DEFAULT_BREAKPOINT
): void {
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
