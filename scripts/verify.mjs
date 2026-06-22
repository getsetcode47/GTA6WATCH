import { chromium } from 'playwright-core'
import { mkdirSync } from 'node:fs'

const OUT = '/tmp/gtavi-shots'
mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch({ channel: 'chrome', headless: true })
const errors = []

async function runViewport(name, viewport, isMobile) {
  const ctx = await browser.newContext({ viewport, isMobile, deviceScaleFactor: 2 })
  const page = await ctx.newPage()
  page.on('console', (m) => m.type() === 'error' && errors.push(`[${name}] ${m.text()}`))
  page.on('pageerror', (e) => errors.push(`[${name}] PAGEERROR: ${e.message}`))

  await page.goto('http://localhost:5180', { waitUntil: 'networkidle' })
  await page.waitForTimeout(2600) // let the loading screen finish + hero settle
  await page.screenshot({ path: `${OUT}/${name}-1-hero.png` })

  // countdown should be ticking — sample twice
  const t1 = await page.locator('[role="timer"]').first().innerText()
  await page.waitForTimeout(1500)
  const t2 = await page.locator('[role="timer"]').first().innerText()
  console.log(`[${name}] countdown sample:`, JSON.stringify(t1.replace(/\n/g, ' ')), '→ changed:', t1 !== t2)

  // horizontal overflow check
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
  console.log(`[${name}] horizontal overflow px:`, overflow)

  const stops = ['#live', '#intel', '#story', '#cast', '#missions', '#community', '#gallery']
  for (const sel of stops) {
    await page.locator(sel).scrollIntoViewIfNeeded()
    await page.waitForTimeout(900)
    await page.screenshot({ path: `${OUT}/${name}-${sel.slice(1)}.png` })
  }
  // bottom: CTA + footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await page.waitForTimeout(900)
  await page.screenshot({ path: `${OUT}/${name}-z-footer.png` })

  // the email popup auto-opens after 25s — capture it, then dismiss
  const closeBtn = page.locator('button[aria-label="Close signup popup"]')
  if (await closeBtn.isVisible().catch(() => false)) {
    await page.screenshot({ path: `${OUT}/${name}-popup.png` })
    await closeBtn.click()
    await page.waitForTimeout(500)
  }

  // interactions on desktop only
  if (!isMobile) {
    await page.locator('#cast [role="tab"]').nth(3).click() // Dre'Quan
    await page.waitForTimeout(700)
    await page.locator('#cast').scrollIntoViewIfNeeded()
    await page.screenshot({ path: `${OUT}/${name}-cast-drequan.png` })

    await page.locator('#intel button', { hasText: 'Rumors' }).click()
    await page.waitForTimeout(600)
    await page.locator('#intel').scrollIntoViewIfNeeded()
    await page.screenshot({ path: `${OUT}/${name}-intel-rumors.png` })

    await page.locator('#gallery button[aria-label^="Open image"]').first().click()
    await page.waitForTimeout(800)
    await page.screenshot({ path: `${OUT}/${name}-lightbox.png` })
    await page.keyboard.press('ArrowRight')
    await page.waitForTimeout(500)
    await page.keyboard.press('Escape')
  } else {
    // mobile nav menu
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(600)
    await page.locator('button[aria-label="Open menu"]').click()
    await page.waitForTimeout(500)
    await page.screenshot({ path: `${OUT}/${name}-menu.png` })
  }

  await ctx.close()
}

await runViewport('desktop', { width: 1440, height: 900 }, false)
await runViewport('mobile', { width: 390, height: 844 }, true)

console.log('console/page errors:', errors.length ? errors : 'none')
await browser.close()
