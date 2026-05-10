<template>
  <div class="login-page">
    <div class="login-form">
      <h1 class="login-form__title">欢迎回来</h1>
      <p class="login-form__subtitle">登录到数字收藏馆</p>

      <a-form
        :model="formState"
        :rules="rules"
        @finish="handleSubmit"
        layout="vertical"
        class="login-form__form"
      >
        <a-form-item name="username">
          <a-input
            v-model:value="formState.username"
            placeholder="用户名"
            size="large"
          >
            <template #prefix>
              <User :size="18" class="login-form__input-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item name="password">
          <a-input-password
            v-model:value="formState.password"
            placeholder="密码"
            size="large"
          >
            <template #prefix>
              <Lock :size="18" class="login-form__input-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <div class="login-form__options">
          <a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
          <a href="#" class="login-form__forgot">忘记密码？</a>
        </div>

        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            size="large"
            block
            :loading="authStore.loading"
          >
            登录
          </a-button>
        </a-form-item>
      </a-form>

      <div class="login-form__footer">
        还没有账号？
        <router-link to="/auth/register">立即注册</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { message } from 'ant-design-vue';
import { User, Lock } from '@phosphor-icons/vue';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const formState = reactive({
  username: '',
  password: '',
  remember: true,
});

const rules = {
  username: [{ required: true, message: '请输入用户名' }],
  password: [{ required: true, message: '请输入密码' }],
};

const handleSubmit = async () => {
  try {
    await authStore.login(formState.username, formState.password);
    message.success('登录成功');
    
    const redirect = route.query.redirect as string || '/';
    router.push(redirect);
  } catch (error) {
    message.error('用户名或密码错误');
  }
};
</script>

<style lang="scss" scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
}

.login-form {
  width: 100%;
  max-width: 380px;
  
  &__title {
    font-size: var(--font-size-2xl);
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
  
  &__form {
    :deep(.ant-input-affix-wrapper) {
      padding: 12px 16px;
      border-radius: var(--radius-md);
      
      &:hover, &:focus-within {
        border-color: var(--color-primary);
      }
    }
    
    :deep(.ant-input) {
      &::placeholder {
        color: var(--color-text-muted);
      }
    }
    
    :deep(.ant-btn-primary) {
      height: 48px;
      border-radius: var(--radius-md);
      font-weight: var(--font-weight-medium);
      background: var(--color-primary);
      border-color: var(--color-primary);
      box-shadow: 0 4px 16px rgba(139, 134, 133, 0.3);
      
      &:hover, &:focus {
        background: var(--color-primary-hover);
        border-color: var(--color-primary-hover);
      }
      
      &:active {
        background: var(--color-primary-active);
        border-color: var(--color-primary-active);
      }
    }
  }
  
  &__input-icon {
    color: var(--color-text-muted);
    margin-right: 4px;
  }
  
  &__options {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
    
    :deep(.ant-checkbox-checked .ant-checkbox-inner) {
      background: var(--color-primary);
      border-color: var(--color-primary);
    }
    
    :deep(.ant-checkbox-wrapper:hover .ant-checkbox-inner) {
      border-color: var(--color-primary);
    }
  }
  
  &__forgot {
    font-size: var(--font-size-sm);
    color: var(--color-primary);
    
    &:hover {
      color: var(--color-primary-hover);
    }
  }
  
  &__footer {
    text-align: center;
    margin-top: 24px;
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    
    a {
      color: var(--color-primary);
      font-weight: var(--font-weight-medium);
      
      &:hover {
        color: var(--color-primary-hover);
      }
    }
  }
}
</style>
