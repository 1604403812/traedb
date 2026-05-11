<template>
  <section class="auth-card glass-card">
    <p class="eyebrow">Welcome Back</p>
    <h2>登录你的私人收藏馆</h2>
    <p class="page-subtitle">支持 JWT 认证、响应式布局与后续 PWA 登录态扩展。</p>

    <a-form layout="vertical" class="auth-form">
      <a-form-item label="用户名或邮箱">
        <a-input placeholder="collector@example.com" size="large" />
      </a-form-item>
      <a-form-item label="密码">
        <a-input-password placeholder="请输入密码" size="large" />
      </a-form-item>
      <a-form-item>
        <div class="auth-actions">
          <a-checkbox>记住登录状态</a-checkbox>
          <RouterLink to="/register">注册账号</RouterLink>
        </div>
      </a-form-item>
      <a-button type="primary" size="large" block>进入系统</a-button>
    </a-form>
  </section>
</template>
