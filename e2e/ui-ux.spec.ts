import { expect, test } from '@playwright/test'

const routes = [
  '/dashboard',
  '/checklist',
  '/checklist-tipe-jawaban',
  '/orders',
  '/delivery-orders',
  '/matriks-kpi',
  '/reports',
  '/doc',
  '/products',
  '/customers',
  '/inventory',
  '/warehouses',
  '/outlets',
  '/layanan',
  '/vehicles',
  '/employees',
  '/users',
  '/roles',
  '/shortcuts',
  '/settings/shortcuts',
  '/history'
]

test('checklist menu stays active on the checklist page', async ({ page }) => {
  await page.goto('/checklist')
  await expect(page.locator('.checklist-page-heading h2')).toHaveText('Kategori Checklist')
  await expect(page.locator('.app-sidebar__nav a.is-active')).toHaveText(/Pertanyaan/)
})

test('navigation follows the active route', async ({ page }) => {
  await page.goto('/dashboard')
  await expect(page.locator('.app-sidebar__nav a.is-active')).toHaveText(/Dashboard/)
})

for (const route of routes) {
  test(`page ${route} has proportional controls and no page overflow`, async ({ page }) => {
    await page.goto(route)
    await expect(page.locator('.app-main')).toBeVisible()

    const layout = await page.evaluate(() => {
      const viewportWidth = window.innerWidth
      const controls = [...document.querySelectorAll('.app-main button, .app-main a, .app-main input, .app-main select, .app-main textarea')]
      const visibleControls = controls.filter((element) => {
        const rect = element.getBoundingClientRect()
        const style = getComputedStyle(element)
        return rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden' && style.display !== 'none'
      })
      return {
        documentOverflow: document.documentElement.scrollWidth - viewportWidth,
        maxControlHeight: Math.max(...visibleControls.map((element) => element.getBoundingClientRect().height), 0),
        overflowingCards: [...document.querySelectorAll('.checklist-category-card')].filter((element) => {
          const rect = element.getBoundingClientRect()
          return rect.left < -1 || rect.right > viewportWidth + 1
        }).length
      }
    })

    expect(layout.documentOverflow).toBeLessThanOrEqual(1)
    expect(layout.maxControlHeight).toBeLessThanOrEqual(48)
    expect(layout.overflowingCards).toBe(0)
  })
}
