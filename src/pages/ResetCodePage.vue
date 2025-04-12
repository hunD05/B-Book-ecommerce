<template>
    <BreadcrumbComponent>Verify Reset Code</BreadcrumbComponent>
    <section
        class="p-[24px] rounded-lg shadow-[0_0_56px_rgba(0,38,3,0.08)] border-1 border-gray-200 md:w-1/4 md:mx-auto mx-5 my-15"
    >
        <h1 class="text-center text-2xl font-semibold mb-3">Verify Reset Code</h1>
        <div
            class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
            v-if="apiError"
        >
            {{ apiError }}
        </div>
        <Form @submit="sendResetCode" :validation-schema="resetCodeSchema">
            <div class="mb-5">
                <Field v-slot="{ field, meta, errors }" name="resetCode">
                    <input
                        v-bind="field"
                        type="text"
                        id="resetCode"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-primary block w-full p-2.5"
                        :class="{ 'border-red-500 focus:border-red-500': errors.length > 0 }"
                        placeholder="Enter Reset Code"
                        required
                    />
                </Field>
                <ErrorMessage name="resetCode" class="mt-2 text-xs text-red-600" />
            </div>

            <button type="submit" class="btn-primary w-full" :disabled="isLoading">
                <i class="fa-solid fa-circle-notch fa-spin" v-if="isLoading"></i>
                <span v-else>Send Reset Code</span>
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

const resetCodeSchema = Yup.object({
    resetCode: Yup.string().required("Vui lòng nhập mã reset").min(6, "Mã reset phải có ít nhất 6 ký tự"),
});

function sendResetCode(values) {
    isLoading.value = true;

    // Giả lập kiểm tra mã reset
    const validResetCode = "123456"; // Mã reset hợp lệ

    setTimeout(() => {
        if (values.resetCode === validResetCode) {
            // Thành công: Hiển thị thông báo và chuyển hướng
            toast.success("Xác minh mã reset thành công!", {
                autoClose: 3000, // Hiển thị thông báo trong 10 giây
            });

            // Trì hoãn chuyển hướng để thông báo hiển thị đủ thời gian
            setTimeout(() => {
                router.push({ name: "reset-password" });
            }, 10000);
        } else {
            // Thất bại: Hiển thị lỗi
            apiError.value = "Mã reset không hợp lệ!";
            toast.error("Mã reset không hợp lệ!", {
                autoClose: 3000, // Hiển thị thông báo trong 10 giây
            });
        }
        isLoading.value = false;
    }, 1000); // Giả lập thời gian xử lý 1 giây
}
</script>

<style lang="scss" scoped></style>