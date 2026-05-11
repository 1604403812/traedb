<template>
  <div class="auth-shell">
    <div class="ambient ambient--one" />
    <div class="ambient ambient--two" />
    <div class="auth-grid">
      <section class="auth-copy glass-card">
        <p class="eyebrow">Digital Cabinet</p>
        <h1>个人综合应用系统</h1>
        <p class="page-subtitle">
          以安静的莫兰迪色板、毛玻璃容器与跨模块导航，统一整理音声、小说、偶像资料、拼豆库存与云盘文件。
        </p>
        <div class="auth-points">
          <span>Vue 3 + Vite + TypeScript</span>
          <span>Ant Design Vue + Pinia</span>
          <span>PWA 友好结构与响应式导航</span>
        </div>
      </section>

      <main class="auth-panel">
        <slot />
      </main>
    </div>
  </div>
</template>
