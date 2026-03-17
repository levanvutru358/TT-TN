<template>
  <div class="min-h-screen bg-[#0b1020] text-white flex items-center justify-center px-4 py-10">
    <div
      class="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
    >
      <div class="hidden lg:flex flex-col justify-between bg-gradient-to-br from-[#0c66e4] via-[#4f46e5] to-[#7c3aed] p-10">
        <div>
          <div class="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium">
            <span>✨</span>
            <span>Trello Workspace</span>
          </div>

          <h1 class="mt-6 text-4xl font-bold leading-tight">
            Đăng nhập để quay lại
            <br />
            workspace của bạn
          </h1>

          <p class="mt-4 max-w-md text-white/85">
            Tiếp tục theo dõi công việc, quản lý task và cộng tác cùng đội nhóm trong Trello.
          </p>
        </div>

        <div class="rounded-2xl bg-black/20 p-5 text-sm text-white/85">
          <div class="font-semibold text-white">Gợi ý</div>
          <div class="mt-2">
            Bạn có thể đăng nhập bằng email hoặc dùng nút Google để chuẩn bị cho bước tích hợp sau.
          </div>
        </div>
      </div>

      <div class="bg-[#1f232b] p-6 sm:p-8 lg:p-10">
        <div class="mx-auto max-w-md">
          <div class="mb-8">
            <div class="text-2xl font-bold">Đăng nhập</div>
            <div class="mt-2 text-sm text-white/60">
              Nhập thông tin để truy cập Trello của bạn.
            </div>
          </div>

          <form class="space-y-4" @submit.prevent="handleSubmit">
            <div>
              <label class="mb-2 block text-sm text-white/80">Email</label>
              <input
                v-model.trim="form.email"
                type="email"
                class="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-white/20"
                placeholder="name@example.com"
              />
            </div>

            <div>
              <label class="mb-2 block text-sm text-white/80">Mật khẩu</label>
              <input
                v-model.trim="form.password"
                type="password"
                class="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-white/20"
                placeholder="Nhập mật khẩu"
              />
            </div>

            <div
              v-if="errorMessage"
              class="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
            >
              {{ errorMessage }}
            </div>

            <button
              type="submit"
              class="w-full rounded-2xl bg-[#0c66e4] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0055cc]"
            >
              Đăng nhập
            </button>
          </form>

          <div class="my-6 flex items-center gap-3">
            <div class="h-px flex-1 bg-white/10"></div>
            <div class="text-xs uppercase tracking-wide text-white/40">Hoặc</div>
            <div class="h-px flex-1 bg-white/10"></div>
          </div>

          <!-- Google login UI only -->
          <button
            type="button"
            class="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm font-semibold text-[#1f232b] transition hover:bg-white/90"
            @click="handleGoogleUiOnly"
          >
            <!-- Thay ảnh này bằng logo Google của bạn nếu muốn -->
            <img
              src="/images/logo-google.png"
              alt="Google"
              class="h-5 w-5 object-contain"
            />
            <span>Đăng nhập với Google</span>
          </button>
          <div class="mt-6 text-center text-sm text-white/60">
            Chưa có tài khoản?
            <button
              type="button"
              class="font-medium text-[#6cb6ff] hover:underline"
              @click="goRegister"
            >
              Đăng ký ngay
            </button>
          </div>

          <div class="mt-8">
            <button
              type="button"
              class="text-sm text-white/60 hover:text-white"
              @click="goHome"
            >
              ← Quay về trang chủ Trello
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "@/composables/useAuth.js";

const router = useRouter();
const { login } = useAuth();

const errorMessage = ref("");

const form = reactive({
  email: "",
  password: "",
});

function handleSubmit() {
  errorMessage.value = "";

  if (!form.email || !form.password) {
    errorMessage.value = "Vui lòng nhập đầy đủ email và mật khẩu.";
    return;
  }

  login({
    email: form.email,
    name: form.email.split("@")[0] || "Người dùng",
  });

  router.push("/");
}

function handleGoogleUiOnly() {
  errorMessage.value = "Error..";
}

function goRegister() {
  router.push("/auth/register");
}

function goHome() {
  router.push("/");
}
</script>