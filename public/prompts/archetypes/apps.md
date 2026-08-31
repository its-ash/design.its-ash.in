# Archetype: Web Application

**Covers**: SaaS products, dashboards, customer portals, admin panels, CRMs.

Build the page as **Nexus Console** — a logged-in workspace. There is NO hero,
no marketing copy, no CTA banner anywhere. The user is already a customer.

Anatomy:

1. **App bar** (`#hero`) — breadcrumb meta (Workspace › Project › Overview), page title with status line (all systems operational, last deploy), right-aligned actions: Export / Tour (opens video popup) / + New Project. Rule underneath.
2. **KPI tiles** — 4-column grid of `card`s, each holding a `.stat` (use `data-count` counters; 99 renders as %) plus a delta tag (▲/▼ vs last period).
3. **Usage + Alerts** (`#features`, two-column) — Resource Usage card: progress bars for API quota / storage / seats / build minutes with a billing-period note. Alerts card: stacked alert-warning / alert-error / alert-info plus one dismissible.
4. **Recent Activity** — audit-trail table: time / actor / action / project / result tag (Success, Pending, Rolled Back). "View All" ghost button.
5. **Quick Actions + Team** — grid of outline action buttons (each `showToast`s a result); team roster rows with avatars and role tags plus seat count.
6. **What's New** — the mandatory slider, framed as release notes.
7. **Support Ticket** (`#contact`) — the mandatory contact form; subject select becomes Severity: Question / Bug / Degraded / Production down.

Signature elements: breadcrumb, KPI deltas, quota bars, audit rows, seat counts.
Tone: operational, numeric, calm-under-load.
