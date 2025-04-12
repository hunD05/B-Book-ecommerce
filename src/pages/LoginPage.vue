<template>
    <BreadcrumbComponent :items="[{ label: 'Trang chủ', to: '/' }, { label: 'Đăng nhập' }]" />
    <section
        class="p-[24px] rounded-lg shadow-[0_0_56px_rgba(0,38,3,0.08)] border-1 border-black md:w-1/4 md:mx-auto mx-5 my-15"
    >
        <h1 class="text-center text-2xl font-semibold mb-3">Đăng nhập</h1>
        <div
            class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
            v-if="apiError"
        >
            {{ apiError }}
        </div>
        <Form @submit="login" :validation-schema="userSchema">
            <div class="mb-5">
                <Field v-slot="{ field, errors }" name="email">
                    <input
                        v-bind="field"
                        type="email"
                        id="email"
                        class="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-black block w-full p-2.5"
                        :class="{ 'border-red-500 focus:border-red-500': errors.length > 0 }"
                        placeholder="Email của bạn"
                        required
                    />
                </Field>
                <ErrorMessage name="email" class="mt-2 text-xs text-red-600" />
            </div>
            <div class="mb-5">
                <Field v-slot="{ field, errors }" name="password">
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

            <div class="flex items-center justify-between mb-2">
                <div class="flex items-center">
                    <input
                        id="remember"
                        type="checkbox"
                        value=""
                        class="w-4 h-4 text-black bg-gray-100 border-black rounded"
                    />
                    <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-200"
                        >Ghi nhớ tôi</label
                    >
                </div>

                <RouterLink to="/forget-password" class="text-sm text-black hover:underline dark:text-gray-200"
                    >Quên mật khẩu?</RouterLink
                >
            </div>

            <button type="submit" class="w-full rounded-lg bg-gray-700 text-white px-4 py-2 text-sm font-medium hover:bg-gray-600" :disabled="isLoading">
                <i class="fa-solid fa-circle-notch fa-spin" v-if="isLoading"></i>
                <span v-else>Đăng nhập</span>
            </button>
        </Form>
        <p class="text-center mt-5 text-gray-600 dark:text-gray-400">
            Chưa có tài khoản?
            <span class="text-black dark:text-gray-200">
                <router-link to="/register">Đăng ký ngay</router-link>
            </span>
        </p>
        <!-- Phần tài khoản mẫu -->
        <div class="mt-5 p-4 border border-black rounded-lg bg-gray-50 dark:bg-gray-800">
            <p class="text-center text-sm text-gray-700 dark:text-gray-300">
                Bạn có thể dùng tài khoản mẫu để đăng nhập ngay:
            </p>
            <p class="text-center text-sm text-gray-900 font-medium mt-2 dark:text-gray-200">
                Email: <span class="text-black dark:text-gray-200">phuhuynh@bbook.vn</span>
            </p>
            <p class="text-center text-sm text-gray-900 font-medium dark:text-gray-200">
                Mật khẩu: <span class="text-black dark:text-gray-200">Matkhau123</span>
            </p>
        </div>
    </section>
</template>

<script setup>
import BreadcrumbComponent from "../components/BreadcrumbComponent.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import * as Yup from "yup";
import { toast } from "vue3-toastify";

const apiError = ref(null);
const router = useRouter();
const isLoading = ref(false);

const userSchema = Yup.object({
    email: Yup.string().required("Vui lòng nhập email").email("Email không hợp lệ"),
    password: Yup.string()
        .required("Vui lòng nhập mật khẩu")
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d).{6,15}$/,
            "Mật khẩu phải có ít nhất 6 ký tự, bao gồm ít nhất một chữ cái và một số"
        ),
});

function login(values) {
    isLoading.value = true;

    // Giả lập đăng nhập với tài khoản mẫu
    const sampleEmail = "phuhuynh@bbook.vn";
    const samplePassword = "Matkhau123";

    setTimeout(() => {
        if (values.email === sampleEmail && values.password === samplePassword) {
            // Lưu token và thông tin người dùng vào localStorage
            localStorage.setItem("token", "fake-token-for-demo");
            localStorage.setItem("user", JSON.stringify({
                name: "Manh Hung",
                email: values.email,
            }));

            // Phát sự kiện user-updated để MainNavbar nhận biết
            window.dispatchEvent(new Event("user-updated"));

            toast.success("Đăng nhập thành công!", {
                autoClose: 2000,
            });
            router.push({ name: "home" });
        } else {
            apiError.value = "Email hoặc mật khẩu không đúng!";
        }
        isLoading.value = false;
    }, 1000);
}

// Kiểm tra trạng thái đăng nhập khi vào trang
onMounted(() => {
    if (localStorage.getItem("token")) {
        router.push({ name: "home" }); // Nếu đã có token, chuyển về trang chủ
    }
});
</script>

<style lang="scss" scoped></style>