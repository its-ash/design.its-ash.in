<script setup lang="ts">
import { marked } from 'marked';
import type { ThemeInfo } from '~/utils/themes';
import { THEMES } from '~/utils/themes';

const route = useRoute();
const router = useRouter();

const activeThemeId = ref<string>(THEMES[0].id);
const promptOpen = ref(false);
const promptRaw = ref('');
const promptHtml = ref('');
const promptLoading = ref(false);
const promptError = ref('');
const copied = ref(false);
const iframeRef = ref<HTMLIFrameElement | null>(null);
const iframeKey = ref(0);
const mobileTab = ref<'themes' | 'preview'>('themes');
const isMobile = ref(false);

function checkMobile() {
    isMobile.value = window.innerWidth < 768;
}
function selectTheme(id: string) {
    activeThemeId.value = id;
    if (isMobile.value) mobileTab.value = 'preview';
}

const activeTheme = computed<ThemeInfo>(
    () => THEMES.find((t) => t.id === activeThemeId.value) || THEMES[0],
);

const iframeSrc = computed(() => activeTheme.value.previewPath);

const fullIframeUrl = computed(() => {
    if (import.meta.client) {
        return window.location.origin + activeTheme.value.previewPath;
    }
    return `https://design.its-ash.in${activeTheme.value.previewPath}`;
});

const thumbObserver = ref<IntersectionObserver | null>(null);
const visibleThumbs = ref(new Set<string>());

function initThumbObserver() {
    if (!import.meta.client) return;
    thumbObserver.value = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            const id = (entry.target as HTMLElement).dataset.thumbId;
            if (!id) continue;
            if (entry.isIntersecting) {
                visibleThumbs.value.add(id);
            }
        }
    }, { rootMargin: '200px' });
}

function observeThumb(el: HTMLElement, id: string) {
    if (!el || !thumbObserver.value) return;
    el.dataset.thumbId = id;
    thumbObserver.value.observe(el);
}

watch(activeThemeId, (id) => {
    if (route.query.theme !== id) {
        router.replace({ query: { ...route.query, theme: id } });
    }
});

onMounted(() => {
    const q = route.query.theme as string | undefined;
    if (q && THEMES.some((t) => t.id === q)) {
        activeThemeId.value = q;
    } else {
        router.replace({ query: { ...route.query, theme: activeThemeId.value } });
    }
    checkMobile();
    initThumbObserver();
    window.addEventListener('resize', checkMobile);
});
onBeforeUnmount(() => {
    window.removeEventListener('resize', checkMobile);
    thumbObserver.value?.disconnect();
});

async function loadPrompt(theme: ThemeInfo) {
    promptOpen.value = true;
    promptLoading.value = true;
    promptError.value = '';
    promptRaw.value = '';
    promptHtml.value = '';
    copied.value = false;
    try {
        const res = await fetch(theme.promptFile);
        if (!res.ok) throw new Error(`Failed to load prompt (${res.status})`);
        promptRaw.value = await res.text();
        promptHtml.value = await marked.parse(promptRaw.value) as string;
    } catch (e) {
        promptError.value = (e as Error).message || 'Unable to load prompt.';
    } finally {
        promptLoading.value = false;
    }
}

async function copyPrompt() {
    try {
        await navigator.clipboard.writeText(promptRaw.value);
        copied.value = true;
        setTimeout(() => (copied.value = false), 1800);
    } catch {
        promptError.value = 'Clipboard permission denied.';
    }
}

function reloadIframe() {
    iframeKey.value++;
}

function handleIframeLoad() {
    try {
        const doc = iframeRef.value?.contentDocument;
        if (doc && doc.title) {
            seoState.previewTitle = doc.title;
        }
    } catch {
        // cross-origin — ignore
    }
}

const seoState = reactive({
    previewTitle: '',
});

useHead(() => ({
    title: `${activeTheme.value.name} Theme Preview`,
    meta: [
        {
            name: 'description',
            content: `Live preview of the ${activeTheme.value.name} web UI design system. Browse the full interactive landing page and copy its AI design prompt.`,
        },
        { name: 'keywords', content: `${activeTheme.value.name}, design system, UI theme, web design, AI prompt, landing page` },
        { property: 'og:title', content: `${activeTheme.value.name} Theme · Design Prompt` },
        {
            property: 'og:description',
            content: `Explore the ${activeTheme.value.name} design system — a production-ready, fully responsive web UI theme with a detailed AI build prompt.`,
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: `https://design.its-ash.in/?theme=${activeTheme.value.id}` },
        { property: 'og:image', content: '/og-image.svg' },
        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:title', content: `${activeTheme.value.name} Theme · Design Prompt` },
        {
            property: 'twitter:description',
            content: `Explore the ${activeTheme.value.name} design system — production-ready UI theme with AI build prompt.`,
        },
    ],
    link: [
        { rel: 'canonical', href: `https://design.its-ash.in/?theme=${activeTheme.value.id}` },
    ],
}));

const structuredThemes = THEMES.map((t) => ({
    '@type': 'CreativeWork',
    name: `${t.name} Design System`,
    url: `https://design.its-ash.in/?theme=${t.id}`,
    description: `${t.name} web UI design system with AI build prompt.`,
}));

useHead({
    script: [
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'Design Prompt',
                url: 'https://design.its-ash.in/',
                description: 'A curated gallery of 30 production-ready web UI design themes with AI design prompts.',
                potentialAction: {
                    '@type': 'SearchAction',
                    target: 'https://design.its-ash.in/?theme={theme_id}',
                    'query-input': 'required name=theme_id',
                },
            }),
        },
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'ItemList',
                name: 'Design Prompt Theme Gallery',
                itemListElement: structuredThemes.map((item, idx) => ({
                    '@type': 'ListItem',
                    position: idx + 1,
                    item,
                })),
            }),
        },
    ],
});
</script>

<template>
    <div class="flex h-screen flex-col">
        <!-- Top bar -->
        <header class="flex items-center justify-between gap-2 border-b border-[#1f1f1f] bg-[#111111] px-3 py-2.5 sm:px-4 md:gap-3 md:px-6 md:py-3">
            <div class="flex items-center gap-3">
                <div class="leading-tight">
                    <h1 class="text-sm font-bold tracking-tight sm:text-base md:text-lg" style="color:#e6c558">Design Prompt</h1>
                    <p class="hidden text-xs text-ink-400 sm:block">30 UI themes · live preview + AI prompts</p>
                </div>
            </div>
            <div class="flex items-center gap-1.5 sm:gap-2">
                <a href="https://its-ash.github.io" target="_blank" rel="noopener noreferrer"
                    class="btn-ghost text-xs font-medium" aria-label="Visit its-ash.github.io">
                    <span class="hidden sm:inline">its-ash.github.io</span>
                    <span class="sm:hidden">its-ash</span>
                    <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                        <path d="M7 17L17 7M7 7h10v10" />
                    </svg>
                </a>
                <span class="hidden bg-[#1f1f1f] px-2.5 py-1 text-xs font-medium text-ink-300 md:inline-flex">
                    {{ THEMES.length }} themes
                </span>
                <button class="btn-primary px-2.5 sm:px-4" @click="loadPrompt(activeTheme)" aria-label="Show design prompt">
                    <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        aria-hidden="true">
                        <path d="M4 4h12v12H4z" />
                        <path d="M8 8h12v12" />
                    </svg>
                    <span class="hidden sm:inline">Prompt</span>
                </button>
            </div>
        </header>

        <!-- Mobile tab switcher -->
        <nav class="flex border-b border-[#1f1f1f] bg-[#111111] md:hidden" aria-label="Mobile navigation">
            <button
                class="flex-1 py-2.5 text-xs font-semibold uppercase tracking-wider transition"
                :class="mobileTab === 'themes' ? 'bg-[#1f1f1f]' : 'text-ink-400'"
                :style="mobileTab === 'themes' ? 'color:#e6c558' : ''"
                @click="mobileTab = 'themes'"
            >
                Themes
            </button>
            <button
                class="flex-1 py-2.5 text-xs font-semibold uppercase tracking-wider transition"
                :class="mobileTab === 'preview' ? 'bg-[#1f1f1f]' : 'text-ink-400'"
                :style="mobileTab === 'preview' ? 'color:#e6c558' : ''"
                @click="mobileTab = 'preview'"
            >
                Preview
            </button>
        </nav>

        <!-- Body: sidebar + preview -->
        <div class="flex flex-1 overflow-hidden">
            <!-- Sidebar -->
            <aside
                class="scrollbar-thin w-full shrink-0 overflow-y-auto border-r border-[#1f1f1f] bg-[#0d0d0d] md:w-80"
                :class="isMobile && mobileTab !== 'themes' ? 'hidden' : 'block'"
                aria-label="Theme list"
            >
                <div class="sticky top-0 z-10 border-b border-[#1f1f1f] bg-[#111111] px-4 py-3">
                    <p class="text-xs font-semibold uppercase tracking-wider text-ink-400">Themes</p>
                </div>
                <div class="grid grid-cols-2 gap-3 p-3 md:grid-cols-1">
                    <button
                        v-for="theme in THEMES"
                        :key="theme.id"
                        type="button"
                        class="group relative flex flex-col overflow-hidden border text-left transition-all duration-200"
                        :class="
                            theme.id === activeThemeId
                                ? 'border-transparent shadow-lg'
                                : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                        "
                        :style="
                            theme.id === activeThemeId
                                ? 'box-shadow:0 0 0 1px rgba(212,175,55,0.6),0 8px 20px rgba(212,175,55,0.18)'
                                : ''
                        "
                        :aria-current="theme.id === activeThemeId ? 'true' : 'false'"
                        @click="selectTheme(theme.id)"
                    >
                        <div
                            :ref="(el) => observeThumb(el as HTMLElement, theme.id)"
                            class="relative aspect-[16/10] w-full overflow-hidden bg-ink-950 pointer-events-none"
                        >
                            <iframe
                                v-if="visibleThumbs.has(theme.id)"
                                :src="theme.previewPath"
                                :title="`${theme.name} thumbnail`"
                                class="pointer-events-none absolute left-0 top-0 origin-top-left border-0"
                                style="width: 1280px; height: 800px; transform: scale(0.25)"
                                loading="lazy"
                                scrolling="no"
                                sandbox="allow-scripts allow-same-origin"
                                tabindex="-1"
                                aria-hidden="true"
                            />
                            <span
                                class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100 pointer-events-none"
                                aria-hidden="true"
                            />
                        </div>
                        <div class="flex items-center justify-between gap-2 px-3 py-2.5">
                            <span class="truncate text-sm font-semibold">{{ theme.name }}</span>
                            <span
                                v-if="theme.id === activeThemeId"
                                class="h-1.5 w-1.5 shrink-0"
                                style="background: #d4af37"
                                aria-hidden="true"
                            />
                        </div>
                    </button>
                </div>
            </aside>

            <!-- Preview pane -->
            <main
                class="flex flex-1 flex-col overflow-hidden"
                :class="isMobile && mobileTab !== 'preview' ? 'hidden' : 'flex'"
            >
                <div class="flex items-center justify-between gap-2 border-b border-[#1f1f1f] bg-[#111111] px-4 py-2.5">
                    <div class="min-w-0">
                        <h2 class="truncate text-sm font-semibold text-white">{{ activeTheme.name }}</h2>
                        <ClientOnly>
                            <a :href="fullIframeUrl" target="_blank" rel="noopener noreferrer"
                                class="truncate text-xs text-ink-400 font-mono hover:underline hover:text-[#e6c558] transition block">
                                {{ fullIframeUrl }}
                            </a>
                            <template #fallback>
                                <span class="truncate text-xs text-ink-400 font-mono block">{{ iframeSrc }}</span>
                            </template>
                        </ClientOnly>
                    </div>
                    <button class="btn-ghost" @click="reloadIframe" aria-label="Reload preview">
                        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            aria-hidden="true">
                            <path d="M21 12a9 9 0 1 1-2.64-6.36" />
                            <path d="M21 3v6h-6" />
                        </svg>
                        <span class="hidden sm:inline">Reload</span>
                    </button>
                </div>
                <div class="relative flex-1 bg-ink-950">
                    <iframe :key="iframeKey" ref="iframeRef" :src="iframeSrc" :title="`${activeTheme.name} preview`"
                        class="absolute inset-0 h-full w-full border-0 bg-white"
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals" loading="lazy"
                        @load="handleIframeLoad" />
                </div>
            </main>
        </div>

        <!-- Prompt modal -->
        <div v-if="promptOpen" class="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/80" role="dialog"
            aria-modal="true" aria-labelledby="promptTitle">
            <div class="absolute inset-0 bg-black/85" @click="promptOpen = false" />
            <div
                class="scrollbar-thin relative flex h-full w-full max-w-3xl flex-col overflow-hidden border border-[#2a2a2a] bg-[#111111] shadow-2xl sm:h-auto sm:max-h-[88vh] sm:border">
                <header class="flex items-center justify-between gap-2 border-b border-[#1f1f1f] px-5 py-3">
                    <div class="flex items-center gap-2">
                        <h3 id="promptTitle" class="text-sm font-semibold text-white">
                            Design Prompt — {{ activeTheme.name }}
                        </h3>
                    </div>
                    <div class="flex items-center gap-2">
                        <button class="btn-ghost" :disabled="promptLoading || !promptRaw" @click="copyPrompt">
                            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                aria-hidden="true">
                                <rect x="9" y="9" width="13" height="13" rx="2" />
                                <path d="M5 15V5a2 2 0 0 1 2-2h10" />
                            </svg>
                            {{ copied ? 'Copied!' : 'Copy' }}
                        </button>
                        <button class="btn-ghost" aria-label="Close" @click="promptOpen = false">
                            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                aria-hidden="true">
                                <path d="M6 6l12 12M6 18L18 6" />
                            </svg>
                        </button>
                    </div>
                </header>
                <div class="scrollbar-thin overflow-y-auto px-5 py-4 text-sm leading-relaxed text-ink-200">
                    <div v-if="promptLoading" class="flex flex-col items-center gap-3 py-10 text-ink-400">
                        <div class="h-7 w-7 animate-spin"
                            style="border:2px solid rgba(212,175,55,0.25);border-top-color:#d4af37"></div>
                        <p>Loading prompt…</p>
                    </div>
                    <div v-else-if="promptError" class="py-10 text-center text-red-400">{{ promptError }}</div>
                    <article v-else class="prose-prompt" v-html="promptHtml" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.prose-prompt :deep(h1) {
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 1rem;
}

.prose-prompt :deep(h2) {
    font-size: 1.15rem;
    font-weight: 700;
    color: #e2e8f0;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
}

.prose-prompt :deep(h3) {
    font-size: 1rem;
    font-weight: 600;
    color: #cbd5e1;
    margin-top: 1rem;
    margin-bottom: 0.4rem;
}

.prose-prompt :deep(p) {
    margin-bottom: 0.75rem;
    color: #cbd5e1;
}

.prose-prompt :deep(ul) {
    list-style: disc;
    padding-left: 1.25rem;
    margin-bottom: 0.75rem;
}

.prose-prompt :deep(li) {
    margin-bottom: 0.25rem;
    color: #cbd5e1;
}

.prose-prompt :deep(strong) {
    color: #fff;
    font-weight: 700;
}

.prose-prompt :deep(code) {
    background: #1e293b;
    color: #a5b4fc;
    padding: 0.1rem 0.35rem;
    border-radius: 0.25rem;
    font-size: 0.85em;
}

.prose-prompt :deep(pre) {
    background: #0f172a;
    border: 1px solid #1e293b;
    border-radius: 0.5rem;
    padding: 0.9rem;
    overflow-x: auto;
    margin-bottom: 1rem;
}

.prose-prompt :deep(pre code) {
    background: transparent;
    padding: 0;
    color: #e2e8f0;
}

.prose-prompt :deep(blockquote) {
    border-left: 3px solid #6366f1;
    padding-left: 0.85rem;
    color: #94a3b8;
    margin-bottom: 0.75rem;
}

.prose-prompt :deep(hr) {
    border-color: #1e293b;
    margin: 1.25rem 0;
}
</style>