<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useDashboardVm } from '@/features/dashboard/vm/useDashboardVm'
import { useAuthVm } from '@/features/auth/vm/useAuthVm'

const vm = useDashboardVm()
const authVm = useAuthVm()
</script>

<template>
  <main class="dashboard-page">
    <div class="dashboard-content">
      <header class="dashboard-profile">
        <div class="dashboard-profile__identity">
          <span class="dashboard-profile__avatar">{{ vm.view.profileInitials }}</span>
          <div>
            <strong>{{ vm.view.profileName }}</strong>
            <!-- <button type="button" class="dashboard-profile__points">
              {{ vm.view.profilePoints }} <span aria-hidden="true">›</span>
            </button> -->
          </div>
        </div>
        <div class="dashboard-profile__actions">
          <button type="button" aria-label="Notifikasi" class="dashboard-icon-button dashboard-icon-button--notification">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5a8 8 0 0 1 16 0v5l2 2H2l2-2v-5ZM9 20h6" /></svg>
            <i></i>
          </button>
          <button type="button" aria-label="Pengaturan" class="dashboard-icon-button">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM19 12h3M2 12h3M12 2v3M12 19v3M17 7l2-2M5 19l2-2M17 17l2 2M5 5l2 2" /></svg>
          </button>
          <button type="button" aria-label="Keluar" class="dashboard-icon-button" @click="authVm.logout">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4M14 16l4-4-4-4M9 12h9" /></svg>
          </button>
        </div>
      </header>
      <section class="dashboard-card favorite-card" aria-labelledby="favorite-title">
        <header class="dashboard-card__heading">
          <h2 id="favorite-title">Menu checklist</h2>
          <RouterLink to="/roles" class="dashboard-text-button">Atur <span class="sliders-icon">=</span></RouterLink>
        </header>

        <div class="favorite-grid">
          <RouterLink v-for="item in vm.view.favoriteItems" :key="item.id" :to="item.routePath" class="favorite-item">
            <span class="favorite-item__icon">
              <small v-if="item.badge">{{ item.badge }}</small>
              {{ item.icon }}
            </span>
            <span>{{ item.label }}</span>
          </RouterLink>
        </div>

        <!-- <div class="dashboard-promo"><span>QRIS</span><strong>{{ vm.view.promoLabel }}</strong></div> -->
      </section>
    </div>
  </main>
</template>

<style scoped>
.dashboard-page {
  background: linear-gradient(145deg, #38a9ee 0%, #269be8 52%, #168edb 100%);
  color: #252934;
  min-height: 100dvh;
  padding: 22px 12px calc(100px + env(safe-area-inset-bottom));
}

.dashboard-content {
  margin: 0 auto;
  max-width: 560px;
}

.dashboard-profile {
  align-items: center;
  color: #fff;
  display: flex;
  justify-content: space-between;
  margin: 0 12px 28px;
}

.dashboard-profile__identity,
.dashboard-profile__actions,
.dashboard-card__tools {
  align-items: center;
  display: flex;
}

.dashboard-profile__identity { gap: 12px; min-width: 0; }
.dashboard-profile__identity > div { min-width: 0; }
.dashboard-profile__avatar {
  align-items: center;
  background: #f5f5f5;
  border-radius: 50%;
  color: #262a31;
  display: flex;
  flex: 0 0 58px;
  font-size: 1.1rem;
  height: 58px;
  justify-content: center;
  width: 58px;
}
.dashboard-profile strong { display: block; font-size: 1.02rem; letter-spacing: .01em; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dashboard-profile__points { background: transparent; border: 0; color: #fff; font-size: .86rem; font-weight: 700; padding: 4px 0 0; }
.dashboard-profile__points span { font-size: 1.3rem; margin-left: 4px; vertical-align: -2px; }
.dashboard-profile__actions { gap: 9px; }
.dashboard-icon-button { background: transparent; border: 0; color: #fff; padding: 3px; position: relative; }
.dashboard-icon-button svg { fill: none; height: 30px; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 1.8; width: 30px; }
.dashboard-icon-button--notification i { background: #ef1d2f; border: 2px solid #37a4eb; border-radius: 50%; height: 13px; position: absolute; right: 0; top: 0; width: 13px; }

.dashboard-card { background: #fff; border-radius: 22px; margin-bottom: 24px; overflow: hidden; }
.account-card { padding-top: 26px; }
.dashboard-card__heading { align-items: center; display: flex; justify-content: space-between; padding: 0 25px; }
.dashboard-card__heading h1, .dashboard-card__heading h2 { font-size: 1.55rem; letter-spacing: -.03em; margin: 0; }
.dashboard-card__heading h2 { font-size: 1.48rem; }
.dashboard-card__tools { gap: 20px; }
.dashboard-text-button { align-items: center; background: transparent; border: 0; color: #72b9e3; display: inline-flex; font-size: 1rem; font-weight: 800; gap: 7px; padding: 0; text-decoration: none; }
.eye-icon { font-size: 1.2rem; font-weight: 400; }
.sliders-icon { font-size: 1.35rem; line-height: .8; transform: rotate(90deg); }

.account-categories { border-bottom: 1px solid #e6e6e6; display: grid; grid-template-columns: repeat(5, 1fr); margin-top: 21px; padding: 0 11px; }
.account-category { align-items: center; background: transparent; border: 0; color: #65656b; display: flex; flex-direction: column; font-size: .77rem; gap: 8px; min-width: 0; padding: 0 0 12px; position: relative; white-space: nowrap; }
.account-category__icon { align-items: center; background: #eaf4fd; border-radius: 6px; color: #57a9df; display: flex; font-size: .75rem; font-weight: 900; height: 30px; justify-content: center; width: 34px; }
.account-category.is-active { color: #252934; font-weight: 800; }
.account-category.is-active::after { background: #ffc400; border-radius: 5px 5px 0 0; bottom: 0; content: ''; height: 7px; left: 9%; position: absolute; width: 82%; }

.account-detail { align-items: center; border: 1px solid #e9e9e9; border-radius: 18px; display: flex; justify-content: space-between; margin: 22px 25px 25px; padding: 23px; }
.account-detail > div:first-child { display: grid; gap: 5px; }
.account-detail strong { font-size: 1.2rem; font-weight: 500; }
.account-detail span { font-size: 1.15rem; }
.account-detail__image { background: linear-gradient(135deg, #dce5e4, #929c9d); border-radius: 12px; color: #28363a; display: flex; flex-direction: column; font-size: .58rem; height: 70px; justify-content: space-between; padding: 9px; text-align: right; width: 108px; }
.account-detail__image b { font-size: .62rem; }
.other-account-button { background: transparent; border: 0; color: #73b8df; display: block; font-size: 1rem; font-weight: 800; margin: 0 auto 24px; }
.other-account-button span { font-size: 1.45rem; margin-left: 6px; vertical-align: -2px; }

.favorite-card { padding: 28px 0 24px; }
.favorite-grid { display: grid; gap: 22px 4px; grid-template-columns: repeat(4, 1fr); padding: 26px 24px 18px; }
.favorite-item { align-items: center; color: #47474c; display: flex; flex-direction: column; font-size: .76rem; gap: 8px; line-height: 1.15; text-align: center; text-decoration: none; }
.favorite-item > span:last-child { max-width: 68px; }
.favorite-item__icon { align-items: center; background: #edf6fd; border-radius: 50%; color: #168be0; display: flex; font-size: 1.15rem; font-weight: 800; height: 54px; justify-content: center; position: relative; width: 54px; }
.favorite-item__icon small { background: #ffc400; border-radius: 7px; color: #fff; font-size: .48rem; padding: 2px 3px; position: absolute; right: 0; top: 0; }
.dashboard-promo { align-items: center; background: #e7f5ff; border-radius: 18px; color: #206494; display: flex; gap: 12px; margin: 3px 25px 0; padding: 13px 16px; }
.dashboard-promo span { color: #168be0; font-size: .68rem; font-weight: 900; }
.dashboard-promo strong { font-size: .82rem; }

@media (max-width: 380px) {
  .dashboard-profile { margin-inline: 4px; }
  .dashboard-profile__actions { gap: 1px; }
  .dashboard-card__heading { padding-inline: 18px; }
  .account-detail { margin-inline: 18px; padding: 18px; }
  .favorite-grid { padding-inline: 12px; }
  .dashboard-promo { margin-inline: 18px; }
}
</style>


