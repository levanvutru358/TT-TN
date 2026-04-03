<template>
  <div class="min-h-screen bg-[#0b1020] text-white flex items-center justify-center px-4 py-10">
    <div
      class="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
    >
      <div class="hidden lg:flex flex-col justify-between bg-gradient-to-br from-[#16a34a] via-[#0c66e4] to-[#7c3aed] p-10">
        <div>
          <div class="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium">
            <span>🚀</span>
            <span>Tạo tài khoản Trello</span>
          </div>

          <h1 class="mt-6 text-4xl font-bold leading-tight">
            Bắt đầu quản lý
            <br />
            công việc ngay hôm nay
          </h1>

          <p class="mt-4 max-w-lg text-lg leading-8 text-white/85">
            Tạo tài khoản mới để sử dụng board, danh sách, card và các công cụ cộng tác trong Trello.
            Đây là không gian phù hợp để quản lý dự án học tập, công việc cá nhân hoặc làm việc nhóm
            theo cách trực quan và dễ theo dõi hơn.
          </p>

          <div class="mt-8 space-y-4">
            <div class="flex items-start gap-3 rounded-2xl bg-white/10 p-4">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-lg">
                🧩
              </div>
              <div>
                <div class="text-base font-semibold text-white">Tạo không gian làm việc riêng</div>
                <div class="mt-1 text-sm leading-6 text-white/75">
                  Bắt đầu với bảng riêng của bạn, thêm danh sách công việc, chia nhỏ task và tổ chức mọi thứ
                  theo cách dễ hiểu ngay từ đầu.
                </div>
              </div>
            </div>

            <div class="flex items-start gap-3 rounded-2xl bg-white/10 p-4">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-lg">
                📋
              </div>
              <div>
                <div class="text-base font-semibold text-white">Theo dõi tiến độ hiệu quả</div>
                <div class="mt-1 text-sm leading-6 text-white/75">
                  Di chuyển thẻ giữa các giai đoạn, thêm ghi chú, ngày hạn, checklist và theo dõi quá trình
                  hoàn thành công việc một cách trực quan.
                </div>
              </div>
            </div>

            <div class="flex items-start gap-3 rounded-2xl bg-white/10 p-4">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-lg">
                🤝
              </div>
              <div>
                <div class="text-base font-semibold text-white">Sẵn sàng để cộng tác</div>
                <div class="mt-1 text-sm leading-6 text-white/75">
                  Khi cần, bạn có thể mời thêm thành viên, phân quyền, chia sẻ bảng và làm việc cùng nhau
                  trên cùng một quy trình rõ ràng.
                </div>
              </div>
            </div>
          </div>

          <div class="mt-8 grid grid-cols-3 gap-3">
            <div class="rounded-2xl bg-black/20 p-4 text-center">
              <div class="text-2xl font-bold text-white">Mới</div>
              <div class="mt-1 text-xs uppercase tracking-wide text-white/60">Tài khoản</div>
            </div>
            <div class="rounded-2xl bg-black/20 p-4 text-center">
              <div class="text-2xl font-bold text-white">Nhanh</div>
              <div class="mt-1 text-xs uppercase tracking-wide text-white/60">Khởi tạo</div>
            </div>
            <div class="rounded-2xl bg-black/20 p-4 text-center">
              <div class="text-2xl font-bold text-white">Sẵn sàng</div>
              <div class="mt-1 text-xs uppercase tracking-wide text-white/60">Làm việc</div>
            </div>
          </div>
        </div>
        
        <!-- phần lưu ý của đăng kí chưa cần sử dụng -->
        <!-- <div class="rounded-2xl bg-black/20 p-5 text-sm text-white/85">
          <div class="font-semibold text-white">Lưu ý</div>
          <div class="mt-2 leading-6">
            Sau khi đăng ký thành công, bạn sẽ được chuyển thẳng về trang chủ Trello để bắt đầu tạo bảng,
            quản lý danh sách và làm việc ngay.
          </div>
        </div> -->

      </div>

      <div class="bg-[#1f232b] p-6 sm:p-8 lg:p-10">
        <div class="mx-auto max-w-md">
          <div class="mb-8">
            <div class="text-2xl font-bold">Đăng ký</div>
            <div class="mt-2 text-sm text-white/60">
              Tạo tài khoản mới để bắt đầu sử dụng Trello.
            </div>
          </div>

          <form class="space-y-4" @submit.prevent="handleSubmit">
            <div>
              <label class="mb-2 block text-sm text-white/80">Họ và tên</label>
              <input
                v-model.trim="form.name"
                type="text"
                class="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-white/20"
                placeholder="Nhập họ và tên"
              />
            </div>

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

            <div>
              <label class="mb-2 block text-sm text-white/80">Xác nhận mật khẩu</label>
              <input
                v-model.trim="form.confirmPassword"
                type="password"
                class="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-white/20"
                placeholder="Nhập lại mật khẩu"
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
              Đăng ký
            </button>
          </form>

          <div class="mt-6 text-center text-sm text-white/60">
            Đã có tài khoản?
            <button
              type="button"
              class="font-medium text-[#6cb6ff] hover:underline"
              @click="goLogin"
            >
              Đăng nhập
            </button>
          </div>

          <div class="mt-8">
            <button
              type="button"
              class="text-sm text-white/60 hover:text-white text-center w-full"
              @click="goHome"
            >
              ← Quay về trang chủ Trello
            </button>
          </div>

          <div class="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div class="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div class="flex items-center gap-2">
                <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-[#16a34a]/20 text-lg">
                  ✅
                </div>
                <div class="text-sm font-semibold text-white">Thiết lập nhanh</div>
              </div>
              <div class="mt-3 text-xs leading-6 text-white/60">
                Chỉ cần vài thông tin cơ bản để tạo tài khoản và bắt đầu quản lý công việc ngay.
              </div>
            </div>

            <div class="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div class="flex items-center gap-2">
                <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-[#7c3aed]/20 text-lg">
                  🌟
                </div>
                <div class="text-sm font-semibold text-white">Sẵn sàng sử dụng</div>
              </div>
              <div class="mt-3 text-xs leading-6 text-white/60">
                Sau khi đăng ký thành công, bạn sẽ được đưa về trang chủ để bắt đầu làm việc luôn.
              </div>
            </div>
          </div>

          <div class="mt-4 text-center text-xs text-white/40 leading-6">
            Việc tạo tài khoản giúp bạn lưu lại tiến độ, quản lý bảng cá nhân và sẵn sàng cộng tác với đội nhóm về sau.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "@/modules/auth/composables/useAuth";

const router = useRouter();
const { register } = useAuth();

const errorMessage = ref("");

const form = reactive({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

function handleSubmit() {
  errorMessage.value = "";

  if (!form.name || !form.email || !form.password || !form.confirmPassword) {
    errorMessage.value = "Vui lòng nhập đầy đủ thông tin.";
    return;
  }

  if (form.password.length < 6) {
    errorMessage.value = "Mật khẩu phải có ít nhất 6 ký tự.";
    return;
  }

  if (form.password !== form.confirmPassword) {
    errorMessage.value = "Mật khẩu xác nhận không khớp.";
    return;
  }

  register({
    name: form.name,
    email: form.email,
  });

  router.push("/");
}

function goLogin() {
  router.push("/auth/login");
}

function goHome() {
  router.push("/");
}
</script>