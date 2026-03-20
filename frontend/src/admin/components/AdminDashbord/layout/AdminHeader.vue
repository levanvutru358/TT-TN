<template>
  <header class="border-b border-slate-200 bg-white">
    <div class="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-4 px-6 py-4 lg:px-8">
      <div>
        <p class="text-sm font-medium text-slate-500">Enterprise Admin</p>
        <h2 class="mt-1 text-xl font-semibold text-slate-950">
          System Management
        </h2>
      </div>

      <div class="flex items-center gap-3">
        <div class="hidden xl:flex">
          <input
            type="text"
            placeholder="Search anything..."
            class="w-72 rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-900"
          />
        </div>

        <button
          type="button"
          class="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
        >
          Notifications
        </button>

        <div class="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white">
          A
        </div>
      </div>
    </div>
  </header>
</template>