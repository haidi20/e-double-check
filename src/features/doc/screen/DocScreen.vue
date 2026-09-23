<script setup lang="ts">
import '@/features/doc/style/docScreen.css'
import { useDocVm } from '@/features/doc/vm/useDocVm'

const vm = useDocVm()

const exportPdf = () => {
    window.print()
}
</script>

<template>
    <main class="doc-screen">
        <section class="doc-board" aria-label="CFF Manajemen Distribusi Barang Terintegrasi">
            <header class="doc-board__header">
                <div class="doc-board__title">
                    <p class="eyebrow">Analisa</p>
                    <h2> Alur Distribusi SBM</h2>
                    <!-- <p>Monitoring alur pemrosesan pesanan dari outlet ke gudang secara sistematis.</p> -->
                </div>
                <div class="doc-board__actions">
                    <button class="doc-export-button" type="button" @click="exportPdf">
                        Export PDF
                    </button>
                    <div class="doc-board__legend">
                        <span></span>
                        Alur Retur Opsional
                    </div>
                </div>
            </header>

            <div class="doc-canvas-wrap ">
                <div class="doc-canvas">
                    <div class="doc-lanes" aria-hidden="true">
                        <section v-for="(role, index) in vm.roles" :key="role.id" class="doc-lane" :style="{
                            left: `${20 + index * 300}px`,
                            borderColor: `${role.color}50`,
                            backgroundColor: `${role.color}12`
                        }">
                            <h3 :style="{ color: role.color }">{{ role.title }}</h3>
                            <p :style="{ color: role.color }">{{ role.subtitle }}</p>
                        </section>
                    </div>

                    <svg class="doc-connections " :viewBox="vm.viewBox" role="presentation" aria-hidden="true">
                        <defs>
                            <marker v-for="color in vm.arrowColors" :id="`doc-arrow-${color.replace('#', '')}`"
                                :key="color" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5"
                                orient="auto">
                                <path d="M 0 0 L 10 5 L 0 10 z" :fill="color" />
                            </marker>
                        </defs>
                        <g v-for="connection in vm.connections" :key="`${connection.from}-${connection.to}`">
                            <path class="doc-connection-glow" :d="connection.path" :stroke="connection.color" />
                            <path class="doc-connection-line" :class="{ 'is-dashed': connection.dashed }"
                                :d="connection.path" :stroke="connection.color"
                                :marker-end="`url(#${connection.markerId})`" />
                        </g>
                    </svg>

                    <article v-for="step in vm.steps" :key="step.id" class="doc-node cursor-pointer"
                        :class="{ 'doc-node--retur': step.isRetur }" :style="{
                            left: `${step.rect.left}px`,
                            top: `${step.rect.top}px`,
                            width: `${step.rect.right - step.rect.left}px`,
                            height: `${step.rect.bottom - step.rect.top}px`,
                            '--node-accent': step.isRetur ? '#ef4444' : step.role.color,
                            '--node-soft': step.isRetur ? '#fff1f2' : step.role.darkBg,
                            '--node-text': step.isRetur ? '#991b1b' : step.role.textColor
                        }">
                        <span class="doc-node__accent"></span>
                        <span class="doc-node__number">{{ step.isRetur ? '!' : step.id }}</span>
                        <div class="doc-node__icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" focusable="false">
                                <path :d="step.iconPath" />
                            </svg>
                        </div>
                        <div class="doc-node__content">
                            <h3>{{ step.title }}</h3>
                            <p>{{ step.copy }}</p>
                        </div>
                    </article>
                </div>
            </div>

            <section class="doc-details" aria-label="Kebijakan alur CFF">
                <article v-for="rule in vm.docRules" :key="`rule-${rule.id}`">
                    <span :style="{ backgroundColor: rule.color }">{{ rule.id }}</span>
                    <div>
                        <h3>{{ rule.title }}</h3>
                        <p>{{ rule.copy }}</p>
                    </div>
                </article>
            </section>
        </section>
    </main>
</template>
