import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./style.css";

const THEME_STORAGE_KEY = "workspace-theme-preference";
const ACCENT_STORAGE_KEY = "workspace-theme-accent";
const accentOptions = {
  blue: {
    accent: "#0c66e4",
    hover: "#0055cc",
    subtle: "#e9f2ff",
    brandText: "#0747a6",
  },
  green: {
    accent: "#1f845a",
    hover: "#216e4e",
    subtle: "#dcfff1",
    brandText: "#1f6b45",
  },
  orange: {
    accent: "#c25100",
    hover: "#a54800",
    subtle: "#fff3eb",
    brandText: "#943d00",
  },
  rose: {
    accent: "#c9372c",
    hover: "#ae2e24",
    subtle: "#ffeceb",
    brandText: "#9f251c",
  },
  violet: {
    accent: "#6e5dc6",
    hover: "#5e4db2",
    subtle: "#f3f0ff",
    brandText: "#5b4ab1",
  },
};

const hexToRgba = (hex, alpha) => {
  const normalized = hex.replace("#", "");
  const expanded =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => char + char)
          .join("")
      : normalized;

  const value = Number.parseInt(expanded, 16);
  const red = (value >> 16) & 255;
  const green = (value >> 8) & 255;
  const blue = value & 255;

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
};

const buildThemeTokens = (accent, resolvedTheme) => {
  const isDark = resolvedTheme === "dark";
  const subtle = isDark ? "rgba(255, 255, 255, 0.06)" : accent.subtle;
  const brandText = isDark ? "#f1f5f9" : accent.brandText;
  const pageBg = isDark
    ? "linear-gradient(180deg, #0f1215 0%, #15191d 18%, #1b2025 42%, #0f1215 100%)"
    : "linear-gradient(180deg, #ffffff 0%, #f8f9fb 18%, #f1f2f4 42%, #f1f2f4 100%)";
  const badgeGradient = isDark
    ? `linear-gradient(135deg, ${accent.hover} 0%, ${accent.accent} 100%)`
    : `linear-gradient(135deg, ${accent.brandText} 0%, ${accent.accent} 100%)`;

  return {
    subtle,
    brandText,
    pageBg,
    badgeGradient,
  };
};

const applyStoredWorkspaceTheme = () => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  const savedAccent = window.localStorage.getItem(ACCENT_STORAGE_KEY);
  const theme = ["light", "dark", "system"].includes(savedTheme) ? savedTheme : "system";
  const accentId = accentOptions[savedAccent] ? savedAccent : "blue";
  const accent = accentOptions[accentId];
  const resolvedTheme =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;
  const tokens = buildThemeTokens(accent, resolvedTheme);

  document.documentElement.dataset.themePreference = theme;
  document.documentElement.dataset.colorMode = resolvedTheme;
  document.documentElement.dataset.workspaceAccent = accentId;
  document.documentElement.style.colorScheme = resolvedTheme;
  document.documentElement.style.setProperty("--workspace-accent", accent.accent);
  document.documentElement.style.setProperty("--workspace-accent-hover", accent.hover);
  document.documentElement.style.setProperty("--workspace-accent-subtle", tokens.subtle);
  document.documentElement.style.setProperty("--workspace-brand-text", tokens.brandText);
  document.documentElement.style.setProperty("--workspace-page-bg", tokens.pageBg);
  document.documentElement.style.setProperty("--workspace-badge-gradient", tokens.badgeGradient);
};

applyStoredWorkspaceTheme();

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
