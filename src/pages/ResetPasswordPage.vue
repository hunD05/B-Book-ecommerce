<template>
    <BreadcrumbComponent>Reset Password</BreadcrumbComponent>
    <section
        class="p-[24px] rounded-lg shadow-[0_0_56px_rgba(0,38,3,0.08)] border-1 border-gray-200 md:w-1/4 md:mx-auto mx-5 my-15"
    >
        <h1 class="text-center text-2xl font-semibold mb-3">Reset Password</h1>
        <div
            class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
            v-if="apiError"
        >
            {{ apiError }}
        </div>
        <Form @submit="resetPassword" :validation-schema="resetPasswordSchema">
            <div class="mb-5">
                <Field v-slot="{ field, meta, errors }" name="email">
                    <input
                        v-bind="field"
                        type="email"
                        id="email"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-primary block w-full p-2.5"
                        :class="{ 'border-red-500 focus:border-red-500': errors.length > 0 }"
                        placeholder="Email"
                        required
                    />
                </Field>
                <ErrorMessage name="email" class="mt-2 text-xs text-red-600" />
            </div>
            <div class="mb-5">
                <Field v-slot="{ field, meta, errors }" name="newPassword">
                    <input
                        v-bind="field"
                        type="password"
                        id="newPassword"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-primary block w-full p-2.5"
                        :class="{ 'border-red-500 focus:border-red-500': errors.length > 0 }"
                        placeholder="New Password"
                        required
                    />
                </Field>
                <ErrorMessage name="newPassword" class="mt-2 text-xs text-red-600" />
            </div>

            <button type="submit" class="btn-primary w-full" :disabled="isLoading">
                <i class="fa-solid fa-circle-notch fa-spin" v-if="isLoading"></i>
                <span v-else>Reset Password</span>
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

const resetPasswordSchema = Yup.object({
    email: Yup.string().required("Vui lòng nhập email").email("Email không hợp lệ"),
    newPassword: Yup.string()
        .required("Vui lòng nhập mật khẩu mới")
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d).{6,15}$/,
            "Mật khẩu phải có ít nhất 6 ký tự và chứa ít nhất một chữ cái và một số"
        ),
});

function resetPassword(values) {
    isLoading.value = true;

    setTimeout(() => {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const userIndex = users.findIndex(u => u.email === values.email);

        if (userIndex !== -1) {
            users[userIndex].password = values.newPassword;
            localStorage.setItem("users", JSON.stringify(users));

            // Nếu user đang đăng nhập đúng là người vừa reset thì cập nhật cả trong localStorage
            const currentUser = JSON.parse(localStorage.getItem("user") || "null");
            if (currentUser && currentUser.email === values.email) {
                localStorage.setItem("user", JSON.stringify(users[userIndex]));
            }

            toast.success("Đặt lại mật khẩu thành công!", {
                autoClose: 1000,
            });

            setTimeout(() => {
                router.push({ name: "login" });
            }, 2000);
        } else {
            apiError.value = "Email không tồn tại!";
            toast.error("Email không tồn tại!", {
                autoClose: 1000,
            });
        }

        isLoading.value = false;
    }, 1000);
}

</script>

<style lang="scss" scoped></style>