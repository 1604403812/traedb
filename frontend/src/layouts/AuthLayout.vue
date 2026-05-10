<template>
  <div class="auth-layout">
    <div class="auth-layout__container">
      <div class="auth-layout__branding">
        <div class="auth-layout__logo">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect width="48" height="48" rx="12" fill="var(--color-primary)"/>
            <path d="M14 34V14h8l6 10 6-10h8v20h-6V22l-4 6h-8l-4-6v12h-6z" fill="white"/>
          </svg>
        </div>
        <h1 class="auth-layout__title">数字收藏馆</h1>
        <p class="auth-layout__subtitle">Personal Collection Hub</p>
      </div>
      
      <div class="auth-layout__content">
        <slot />
      </div>
    </div>
    
    <div class="auth-layout__decoration">
      <div class="auth-layout__circle auth-layout__circle--1"></div>
      <div class="auth-layout__circle auth-layout__circle--2"></div>
      <div class="auth-layout__circle auth-layout__circle--3"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.auth-layout {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-primary);
  position: relative;
  overflow: hidden;
  
  &__container {
    width: 100%;
    max-width: 420px;
    padding: 48px;
    position: relative;
    z-index: 10;
  }
  
  &__branding {
    text-align: center;
    margin-bottom: 48px;
  }
  
  &__logo {
    margin-bottom: 24px;
    
    svg {
      filter: drop-shadow(0 8px 24px rgba(139, 134, 133, 0.3));
    }
  }
  
  &__title {
    font-size: 28px;
    font-weight: 600;
    color: var(--color-text-primary);
    margin: 0 0 8px;
  }
  
  &__subtitle {
    font-size: 14px;
    color: var(--color-text-muted);
    margin: 0;
    letter-spacing: 2px;
  }
  
  &__content {
    background: var(--color-surface);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: var(--radius-xl);
    padding: 40px;
    box-shadow: var(--shadow-lg);
  }
  
  &__decoration {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }
  
  &__circle {
    position: absolute;
    border-radius: 50%;
    opacity: 0.5;
    
    &--1 {
      width: 400px;
      height: 400px;
      background: linear-gradient(135deg, rgba(139, 134, 133, 0.1), rgba(196, 186, 180, 0.1));
      top: -100px;
      right: -100px;
    }
    
    &--2 {
      width: 300px;
      height: 300px;
      background: linear-gradient(135deg, rgba(138, 154, 139, 0.1), rgba(200, 212, 200, 0.1));
      bottom: -50px;
      left: -50px;
    }
    
    &--3 {
      width: 200px;
      height: 200px;
      background: linear-gradient(135deg, rgba(142, 154, 168, 0.1), rgba(196, 205, 212, 0.1));
      bottom: 100px;
      right: 100px;
    }
  }
}
</style>
