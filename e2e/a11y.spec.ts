import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = ["/", "/work", "/playground", "/about", "/accessibility"];

// Both color schemes: dark is the primary mode, light must hold AA too.
for (const colorScheme of ["dark", "light"] as const) {
  test.describe(`${colorScheme} mode`, () => {
    test.use({ colorScheme });

    for (const route of routes) {
      test(`${route} has no axe violations`, async ({ page }) => {
        await page.goto(route);
        const results = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
          .analyze();
        expect(
          results.violations.map((v) => ({
            id: v.id,
            impact: v.impact,
            nodes: v.nodes.map((n) => n.target),
          })),
        ).toEqual([]);
      });
    }
  });
}

test("skip link is the first focusable element and works", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.locator(".skip-link");
  await expect(skip).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
});

test.describe("reduced motion", () => {
  // NOTE: the `reducedMotion` context option doesn't apply in this
  // Playwright version — emulate per-page instead.
  test("home intro is static and fully visible", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    // no GSAP pinning (scroll-jacking) under reduced motion
    await expect(page.locator(".pin-spacer")).toHaveCount(0);
    // statement words render at full opacity, not dimmed
    const opacity = await page
      .locator(".intro-word")
      .first()
      .evaluate((el) => getComputedStyle(el).opacity);
    expect(opacity).toBe("1");
  });
});

test("folder CTA opens on hover and on keyboard focus", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  const link = page.locator(".folder-link");
  await expect(link).toHaveAccessibleName(/work/i);
  const front = page.locator(".folder-front");

  const transformOf = () =>
    front.evaluate((el) => getComputedStyle(el).transform);

  expect(await transformOf()).toBe("none");
  await link.hover();
  await page.waitForTimeout(600);
  const hovered = await transformOf();
  expect(hovered).not.toBe("none");

  // keyboard parity: focus must open the folder too
  await page.mouse.move(0, 0);
  await page.waitForTimeout(600);
  await link.focus();
  // focus() alone doesn't set :focus-visible in all engines; tab to it
  await page.keyboard.press("Shift+Tab");
  await page.keyboard.press("Tab");
  await page.waitForTimeout(600);
  expect(await transformOf()).not.toBe("none");
});

test("work index sets aria-current and moves focus on activation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/work");
  // wait for hydration: clicking before React attaches the handler falls
  // back to default anchor behavior (correct progressive enhancement, but
  // not what this test asserts)
  await page.waitForLoadState("networkidle");
  const secondLink = page.getByRole("navigation", { name: "Projects" }).getByRole("link").nth(1);
  await secondLink.click();
  const heading = page.locator("#project-screen-reader-analytics");
  await expect(heading).toBeFocused();
  await expect(secondLink).toHaveAttribute("aria-current", "true");
});
