<template>
  <section class="auth-card glass-card">
    <p class="eyebrow">Create Account</p>
    <h2>注册新的收藏者身份</h2>
    <p class="page-subtitle">表单结构已为登录、注册、邮箱验证与后续权限控制预留位置。</p>

    <a-form layout="vertical" class="auth-form">
      <a-form-item label="用户名">
        <a-input placeholder="输入展示昵称" size="large" />
      </a-form-item>
      <a-form-item label="邮箱">
        <a-input placeholder="collector@example.com" size="large" />
      </a-form-item>
      <a-form-item label="密码">
        <a-input-password placeholder="设置安全密码" size="large" />
      </a-form-item>
      <a-form-item label="确认密码">
        <a-input-password placeholder="再次输入密码" size="large" />
      </a-form-item>
      <a-button type="primary" size="large" block>创建账号</a-button>
      <RouterLink to="/login" class="auth-back-link">返回登录</RouterLink>
    </a-form>
  </section>
</template>
