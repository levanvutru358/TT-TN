<template>
  <div class="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#fbfcff_0%,#f4f6fb_100%)] text-[#172b4d]">
    <div class="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,#dfe8ff_0%,rgba(223,232,255,0)_72%)]"></div>

    <svg
      class="pointer-events-none absolute bottom-0 left-0 hidden h-[330px] w-[430px] lg:block"
      viewBox="0 0 430 330"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="36" y="92" width="88" height="162" rx="12" fill="#cfd8ff" opacity="0.9" />
      <rect x="42" y="100" width="76" height="12" rx="6" fill="#9fc0ff" />
      <rect x="42" y="118" width="76" height="40" rx="8" fill="#ffffff" opacity="0.95" />
      <rect x="42" y="164" width="76" height="68" rx="8" fill="#8da3d1" />
      <rect x="136" y="80" width="122" height="92" rx="14" fill="#a76fe9" opacity="0.3" />
      <rect x="147" y="93" width="100" height="12" rx="6" fill="#ffffff" opacity="0.4" />
      <rect x="160" y="108" width="73" height="36" rx="18" fill="#ffccf4" opacity="0.85" />
      <circle cx="226" cy="126" r="10" fill="#ffffff" opacity="0.92" />
      <rect x="168" y="147" width="104" height="59" rx="10" fill="#4f8fc4" opacity="0.92" />
      <rect x="170" y="212" width="96" height="54" rx="10" fill="#8aa3bb" />
      <rect x="120" y="96" width="20" height="13" rx="6.5" fill="#ffdb4d" />
      <path d="M126 88C126 78 134 70 144 70C154 70 162 78 162 88" stroke="#ffdb4d" stroke-width="4" stroke-linecap="round" />
      <circle cx="140" cy="88" r="4" fill="#8e70ff" />
      <rect x="299" y="98" width="96" height="58" rx="10" fill="#d9dff1" opacity="0.72" />
      <rect x="307" y="108" width="46" height="7" rx="3.5" fill="#c0d5ff" />
      <rect x="307" y="121" width="77" height="6" rx="3" fill="#eef1f8" />
      <rect x="307" y="131" width="72" height="6" rx="3" fill="#eef1f8" />
      <circle cx="96" cy="262" r="27" fill="#263041" />
      <path d="M70 329C74 297 83 279 96 279C109 279 118 298 123 329H70Z" fill="#222736" />
      <rect x="82" y="253" width="28" height="10" rx="5" fill="#8db2ff" />
      <rect x="96" y="277" width="10" height="28" rx="5" transform="rotate(-22 96 277)" fill="#1e2432" />
      <rect x="132" y="307" width="10" height="18" rx="5" transform="rotate(-12 132 307)" fill="#ff7d7d" />
      <circle cx="214" cy="274" r="22" fill="#804ac8" />
      <path d="M191 329C194 296 204 280 214 280C225 280 235 296 238 329H191Z" fill="#3d4f79" />
      <rect x="205" y="285" width="16" height="43" rx="8" fill="#1f9ed6" />
      <rect x="177" y="272" width="8" height="16" rx="4" transform="rotate(-18 177 272)" fill="#ff6969" />
      <rect x="238" y="289" width="8" height="16" rx="4" transform="rotate(-30 238 289)" fill="#ff6969" />
      <path d="M147 330C151 308 160 297 173 297C186 297 195 308 199 330H147Z" fill="#d7dce8" />
      <circle cx="173" cy="299" r="12" fill="#9aa7bf" />
      <path d="M166 309L181 309L186 330H160L166 309Z" fill="#eaf0ff" />
      <path d="M166 322L178 325" stroke="#6756d6" stroke-width="3" stroke-linecap="round" />
      <path d="M165 316L180 318" stroke="#00b8d9" stroke-width="3" stroke-linecap="round" />
    </svg>

    <svg
      class="pointer-events-none absolute bottom-0 right-0 hidden h-[340px] w-[470px] lg:block"
      viewBox="0 0 470 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="28" y="90" width="86" height="107" rx="10" fill="#d9d6ff" opacity="0.6" />
      <rect x="37" y="101" width="32" height="7" rx="3.5" fill="#b8cfff" />
      <rect x="37" y="116" width="60" height="6" rx="3" fill="#eef1f8" />
      <rect x="37" y="128" width="52" height="6" rx="3" fill="#eef1f8" />
      <rect x="144" y="88" width="115" height="142" rx="12" fill="#d8dfff" opacity="0.82" />
      <rect x="155" y="100" width="40" height="8" rx="4" fill="#a8c2ff" />
      <rect x="155" y="114" width="92" height="52" rx="10" fill="#ffffff" />
      <rect x="156" y="175" width="89" height="12" rx="6" fill="#d6ddec" />
      <rect x="156" y="195" width="89" height="12" rx="6" fill="#d6ddec" />
      <rect x="267" y="86" width="106" height="148" rx="12" fill="#c7d2f3" />
      <rect x="276" y="97" width="88" height="42" rx="10" fill="url(#panel-gradient)" />
      <rect x="276" y="147" width="88" height="10" rx="5" fill="#eef1f8" />
      <rect x="276" y="163" width="88" height="10" rx="5" fill="#eef1f8" />
      <rect x="276" y="179" width="88" height="10" rx="5" fill="#eef1f8" />
      <path d="M195 149L282 168L261 300L174 281L195 149Z" fill="#e8eef8" />
      <path d="M205 170L272 184" stroke="#b1bdd3" stroke-width="6" stroke-linecap="round" />
      <path d="M201 193L268 207" stroke="#b1bdd3" stroke-width="6" stroke-linecap="round" />
      <path d="M197 216L264 230" stroke="#b1bdd3" stroke-width="6" stroke-linecap="round" />
      <circle cx="117" cy="246" r="38" fill="#ff5b67" />
      <path d="M81 340C84 286 98 264 117 264C136 264 150 286 153 340H81Z" fill="#ff5b67" />
      <rect x="102" y="268" width="30" height="75" rx="12" fill="#ffb3bd" />
      <path d="M145 276C160 289 172 293 184 288C196 283 202 290 205 312" stroke="#ef77c8" stroke-width="14" stroke-linecap="round" />
      <path d="M146 340L158 340L166 241C166 233 171 228 178 228C185 228 190 233 191 241L198 340L210 340L201 240C199 224 189 216 178 216C167 216 157 224 155 240L146 340Z" fill="#ab9df2" />
      <circle cx="252" cy="139" r="24" fill="#34314a" />
      <path d="M224 340C228 286 238 222 252 222C266 222 276 286 280 340H224Z" fill="#2f2d45" />
      <rect x="242" y="167" width="18" height="52" rx="9" fill="#42508a" />
      <rect x="232" y="182" width="40" height="11" rx="5.5" fill="#ff7d7d" />
      <rect x="249" y="147" width="9" height="21" rx="4.5" fill="#00c7e5" />
      <rect x="236" y="295" width="10" height="24" rx="5" transform="rotate(-18 236 295)" fill="#00c7e5" />
      <rect x="258" y="303" width="10" height="24" rx="5" transform="rotate(18 258 303)" fill="#5a8dff" />
      <path d="M214 341L228 341L246 309L234 304L214 341Z" fill="#1f2330" />
      <path d="M276 341L262 341L257 309L269 304L276 341Z" fill="#1f2330" />
      <circle cx="432" cy="289" r="22" fill="#d9d6ff" />
      <rect x="407" y="243" width="42" height="55" rx="10" fill="#d9d6ff" />
      <rect x="413" y="251" width="30" height="26" rx="8" fill="#eef1ff" />
      <rect x="416" y="260" width="3" height="14" rx="1.5" fill="#98a4bb" />
      <rect x="422" y="260" width="3" height="14" rx="1.5" fill="#98a4bb" />
      <rect x="428" y="260" width="3" height="14" rx="1.5" fill="#98a4bb" />
      <path d="M407 290C393 296 388 305 388 320" stroke="#222736" stroke-width="8" stroke-linecap="round" />
      <path d="M449 291C460 299 464 308 464 321" stroke="#222736" stroke-width="8" stroke-linecap="round" />
      <path d="M418 298L414 340" stroke="#a7a1f1" stroke-width="8" stroke-linecap="round" />
      <path d="M438 298L442 340" stroke="#a7a1f1" stroke-width="8" stroke-linecap="round" />
      <rect x="408" y="252" width="40" height="10" rx="5" fill="#1f2330" />
      <rect x="445" y="250" width="18" height="6" rx="3" fill="#00c7e5" />
      <defs>
        <linearGradient id="panel-gradient" x1="276" y1="97" x2="364" y2="139" gradientUnits="userSpaceOnUse">
          <stop stop-color="#d3b7ff" />
          <stop offset="1" stop-color="#7899d6" />
        </linearGradient>
      </defs>
    </svg>

    <main class="relative z-10 flex min-h-screen items-center justify-center px-4 py-16">
      <section class="w-full max-w-[500px] rounded-[8px] border border-[#dfe1e6] bg-white px-8 py-10 shadow-[0_12px_36px_rgba(9,30,66,0.14)] sm:px-12">
        <div class="flex items-center justify-center gap-3">
          <div class="flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-[#0c66e4]">
            <svg
              class="h-8 w-8 text-white"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" fill="currentColor" />
              <rect x="7" y="7" width="4" height="10" rx="1.5" fill="#0C66E4" />
              <rect x="13" y="7" width="4" height="7" rx="1.5" fill="#0C66E4" />
            </svg>
          </div>
          <button
            type="button"
            class="text-[46px] font-semibold leading-none text-[#253858] transition-colors hover:text-[#0c66e4]"
            @click="goHome"
          >
            Trello
          </button>
        </div>

        <h1 class="mt-10 text-center text-[18px] font-semibold text-[#172b4d]">
          Chọn hoặc thêm tài khoản khác
        </h1>

        <button
          type="button"
          class="mt-8 flex w-full items-center gap-4 rounded-[8px] px-3 py-4 text-left transition-colors hover:bg-[#f7f8fa]"
          @click="selectCurrentAccount"
        >
          <div class="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-[#f04f0f] text-[18px] font-bold text-white">
            {{ userInitials }}
          </div>

          <div class="min-w-0">
            <p class="truncate text-[15px] font-semibold text-[#172b4d]">{{ displayUser.name }}</p>
            <p class="mt-1 truncate text-[14px] text-[#172b4d]">{{ displayUser.email }}</p>
          </div>
        </button>

        <div class="my-2 border-t border-[#ebecf0]"></div>

        <button
          type="button"
          class="flex w-full items-center gap-4 rounded-[8px] px-3 py-5 text-left text-[15px] text-[#172b4d] transition-colors hover:bg-[#f7f8fa]"
          @click="goToLogin"
        >
          <span class="flex h-[42px] w-[42px] shrink-0 items-center justify-center text-[#1d2125]">
            <svg
              class="h-7 w-7"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="11" fill="currentColor" />
              <circle cx="12" cy="9" r="3.2" fill="white" />
              <path
                d="M6.8 18.3C7.8 15.6 9.7 14.4 12 14.4C14.3 14.4 16.2 15.6 17.2 18.3"
                stroke="white"
                stroke-width="1.8"
                stroke-linecap="round"
              />
            </svg>
          </span>
          <span>Thêm tài khoản khác</span>
        </button>

        <div class="my-2 border-t border-[#ebecf0]"></div>

        <button
          type="button"
          class="w-full rounded-[8px] px-3 py-6 text-center text-[15px] text-[#0c66e4] transition-colors hover:bg-[#f7f8fa]"
          @click="handleLogout"
        >
          Đăng xuất
        </button>

      </section>
    </main>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "@/composables/useAuth.js";

const router = useRouter();
const { authUser, logout } = useAuth();

const fallbackUser = {
  name: "Lê văn vũ trụ",
  email: "letru7@gmail.com",
};

const displayUser = computed(() => authUser.value ?? fallbackUser);

const userInitials = computed(() => {
  const source = displayUser.value.name || "LT";

  return source
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
});

const selectCurrentAccount = () => {
  router.push(authUser.value ? "/" : "/auth/login");
};

const goToLogin = () => {
  router.push("/auth/login");
};

const goHome = () => {
  router.push("/");
};

const handleLogout = () => {
  logout();
  localStorage.removeItem("authToken");
  router.push("/auth/login");
};
</script>
