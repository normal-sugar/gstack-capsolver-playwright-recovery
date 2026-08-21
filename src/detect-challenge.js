/** Detect configured checkpoint markers through the public Playwright Page contract. */
export async function detectChallenge(page, selectors) {
  const matched = [];
  for (const selector of selectors) {
    if (await page.locator(selector).count() > 0) matched.push(selector);
  }
  return { detected: matched.length > 0, matched };
}
