<template>
    <BreadcrumbComponent>Quên mật khẩu</BreadcrumbComponent>
    <section
      class="p-[24px] rounded-lg shadow-[0_0_56px_rgba(0,38,3,0.08)] border-1 border-gray-200 md:w-1/4 md:mx-auto mx-5 my-15"
    >
      <h1 class="text-center text-2xl font-semibold mb-3">Quên mật khẩu</h1>
      <div
        class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
        role="alert"
        v-if="apiError"
      >
        {{ apiError }}
      </div>
      <Form @submit="sendResetCode" :validation-schema="forgetPasswordSchema">
        <div class="mb-5">
          <Field v-slot="{ field, meta, errors }" name="email">
            <input
              v-bind="field"
              type="email"
              id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-primary block w-full p-2.5"
              :class="{ 'border-red-500 focus:border-red-500': errors.length > 0 }"
              placeholder="Email của bạn"
              required
            />
          </Field>
          <ErrorMessage name="email" class="mt-2 text-xs text-red-600" />
        </div>
  
        <button type="submit" class="btn-primary w-full" :disabled="isLoading">
          <i class="fa-solid fa-circle-notch fa-spin" v-if="isLoading"></i>
          <span v-else>Gửi mã xác nhận</span>
        </button>
      </Form>
    </section>
  </template>
  
  <script setup>
  import { useRouter } from "vue-router";
  import BreadcrumbComponent from "../components/BreadcrumbComponent.vue";
  import { Form, Field, ErrorMessage } from "vee-validate";
  import { ref } from "vue";
  import * as Yup from "yup";
  import { toast } from "vue3-toastify";
  
  const apiError = ref(null);
  const router = useRouter();
  const isLoading = ref(false);
  
  const forgetPasswordSchema = Yup.object({
    email: Yup.string()
      .required("Vui lòng nhập email")
      .email("Email không hợp lệ"),
  });
  
  function sendResetCode(values) {
  isLoading.value = true;

  setTimeout(() => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.email === values.email);

    if (user) {
      // Lưu email để dùng tiếp ở bước xác nhận/reset password (tùy bạn xử lý tiếp)
      localStorage.setItem("resetEmail", values.email);

      toast.success("Mã xác nhận đã được gửi đến email của bạn!");
      router.push({ name: "verify-reset-code" }); // Điều hướng sang trang xác nhận mã
    } else {
      apiError.value = "Email không tồn tại!";
      toast.error("Email không tồn tại!", {
        autoClose: 1000,
      });
    }

    isLoading.value = false;
  }, 1500);
}

  </script>
  
  <style lang="scss" scoped></style>