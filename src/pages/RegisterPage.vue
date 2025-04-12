<template>
    <BreadcrumbComponent>Đăng ký</BreadcrumbComponent>
    <section
        class="p-[24px] rounded-lg shadow-[0_0_56px_rgba(0,38,3,0.08)] border-1 border-black md:w-1/4 md:mx-auto mx-5 my-15"
    >
        <h1 class="text-center text-2xl font-semibold mb-3">Tạo tài khoản</h1>
        <div
            class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
            v-if="apiError"
        >
            {{ apiError }}
        </div>
        <Form @submit="register" :validation-schema="userSchema">
            <div class="mb-5">
                <Field v-slot="{ field, meta, errors }" name="name">
                    <input
                        v-bind="field"
                        type="text"
                        id="name"
                        class="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-black block w-full p-2.5"
                        :class="{ 'border-red-500 focus:border-red-500': errors.length > 0 }"
                        placeholder="Tên"
                        required
                    />
                </Field>
                <ErrorMessage name="name" class="mt-2 text-xs text-red-600" />
            </div>
            <div class="mb-5">
                <Field v-slot="{ field, meta, errors }" name="email">
                    <input
                        v-bind="field"
                        type="email"
                        id="email"
                        class="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-black block w-full p-2.5"
                        :class="{ 'border-red-500 focus:border-red-500': errors.length > 0 }"
                        placeholder="Email"
                        required
                    />
                </Field>
                <ErrorMessage name="email" class="mt-2 text-xs text-red-600" />
            </div>
            <div class="mb-5">
                <Field v-slot="{ field, meta, errors }" name="phone">
                    <input
                        v-bind="field"
                        type="tel"
                        id="phone"
                        class="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-black block w-full p-2.5"
                        :class="{ 'border-red-500 focus:border-red-500': errors.length > 0 }"
                        placeholder="Số điện thoại"
                        required
                    />
                </Field>
                <ErrorMessage name="phone" class="mt-2 text-xs text-red-600" />
            </div>
            <div class="mb-5">
                <Field v-slot="{ field, meta, errors }" name="password">
                    <input
                        v-bind="field"
                        type="password"
                        id="password"
                        class="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-black block w-full p-2.5"
                        :class="{ 'border-red-500 focus:border-red-500': errors.length > 0 }"
                        placeholder="Mật khẩu"
                        required
                    />
                </Field>
                <ErrorMessage name="password" class="mt-2 text-xs text-red-600" />
            </div>
            <div class="mb-5">
                <Field v-slot="{ field, meta, errors }" name="rePassword">
                    <input
                        v-bind="field"
                        class="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-black block w-full p-2.5"
                        :class="{ 'border-red-500 focus:border-red-500': errors.length > 0 }"
                        placeholder="Xác nhận mật khẩu"
                        type="password"
                        id="confirmPassword"
                        required
                    />
                </Field>
                <ErrorMessage name="rePassword" class="mt-2 text-xs text-red-600" />
            </div>
            <button type="submit" class="w-full rounded-lg bg-gray-700 text-white px-4 py-2 text-sm font-medium hover:bg-gray-600" :disabled="isLoading">
                <i class="fa-solid fa-circle-notch fa-spin" v-if="isLoading"></i>
                <span v-else>Tạo tài khoản</span>
            </button>
        </Form>
        <p class="text-center mt-5 text-gray-600">
            Đã có tài khoản?
            <span class="text-black"> <router-link to="/login">Đăng nhập</router-link></span>
        </p>
    </section>
</template>

<script setup>
import BreadcrumbComponent from "../components/BreadcrumbComponent.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import * as Yup from "yup";
import { toast } from "vue3-toastify";

const apiError = ref(null);
const router = useRouter();
const route = useRoute();
const isLoading = ref(false);

const userSchema = Yup.object({
    name: Yup.string().required("Tên là bắt buộc").min(3, "Tên phải có ít nhất 3 ký tự"),
    email: Yup.string().required("Email là bắt buộc").email("Email không hợp lệ"),
    phone: Yup.string()
        .required("Số điện thoại là bắt buộc")
        .matches(
            /^(?:\+84|0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])\d{7}$/,
            "Số điện thoại không hợp lệ (phải bắt đầu bằng +84 hoặc 0, sau đó là đầu số hợp lệ và đủ 10 chữ số)"
        ),
    password: Yup.string()
        .required("Mật khẩu là bắt buộc")
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d).{6,15}$/,
            "Mật khẩu phải có ít nhất 6 ký tự và chứa ít nhất một chữ cái và một số"
        ),
    rePassword: Yup.string()
        .required("Xác nhận mật khẩu là bắt buộc")
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
        .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp"),
});

onMounted(() => {
    const emailFromQuery = route.query.email;
    if (emailFromQuery) {
        userSchema.fields.email.initialValue = emailFromQuery;
    }
});

function register(values) {
    isLoading.value = true;

    const sampleEmail = "phuhuynh@bbook.vn";

    setTimeout(() => {
        if (values.email === sampleEmail) {
            apiError.value = "Email đã tồn tại!";
        } else {
            localStorage.setItem("token", "fake-token-for-demo");
            localStorage.setItem("user", JSON.stringify({
                name: values.name,
                email: values.email,
                phone: values.phone,
            }));
            toast.success("Đăng ký thành công!", {
                autoClose: 10000,
            });
            window.dispatchEvent(new Event("user-updated"));
            router.push({ name: "home" });
        }
        isLoading.value = false;
    }, 2000);
}
</script>

<style lang="scss" scoped></style>