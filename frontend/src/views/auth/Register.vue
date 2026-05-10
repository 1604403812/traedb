<template>
  <div class="auth-view">
    <h2 class="auth-view__title">注册账号</h2>
    <p class="auth-view__subtitle">创建您的数字收藏馆账号</p>

    <a-form :model="formState" :rules="rules" @finish="handleSubmit" layout="vertical">
      <a-form-item name="username">
        <a-input v-model:value="formState.username" placeholder="用户名" size="large" />
      </a-form-item>

      <a-form-item name="email">
        <a-input v-model:value="formState.email" placeholder="邮箱" size="large" />
      </a-form-item>

      <a-form-item name="password">
        <a-input-password v-model:value="formState.password" placeholder="密码" size="large" />
      </a-form-item>

      <a-form-item name="password_confirm">
        <a-input-password v-model:value="formState.password_confirm" placeholder="确认密码" size="large" />
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit" size="large" block :loading="loading">
          注册
        </a-button>
      </a-form-item>
    </a-form>

    <div class="auth-view__footer">
      已有账号？
      <router-link to="/auth/login">立即登录</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();
const loading = ref(false);

const formState = reactive({
  username: '',
  email: '',
  password: '',
  password_confirm: '',
});

const rules = {
  username: [{ required: true, message: '请输入用户名' }],
  email: [
    { required: true, message: '请输入邮箱' },
    { type: 'email', message: '请输入有效邮箱' },
  ],
  password: [
    { required: true, message: '请输入密码' },
    { min: 6, message: '密码至少6位' },
  ],
  password_confirm: [
    { required: true, message: '请确认密码' },
    {
      validator: (_: unknown, value: string) => {
        if (value !== formState.password) {
          return Promise.reject('两次密码不一致');
        }
        return Promise.resolve();
      },
    },
  ],
};

const handleSubmit = async () => {
  loading.value = true;
  try {
    await authStore.register(formState);
    message.success('注册成功，请登录');
    router.push('/auth/login');
  } catch {
    message.error('注册失败，请重试');
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.auth-view {
  &__title {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-text-primary);
    text-align: center;
    margin: 0 0 8px;
  }
  
  &__subtitle {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    text-align: center;
    margin: 0 0 32px;
  }
  
  &__footer {
    text-align: center;
    margin-top: 24px;
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    
    a {
      color: var(--color-primary);
      font-weight: var(--font-weight-medium);
    }
  }
}
</style>
