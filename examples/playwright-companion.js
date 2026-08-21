import { chromium } from "playwright";
import { detectChallenge } from "../src/index.js";

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent('<main><div data-checkpoint>Owned QA fixture</div></main>');
console.log(await detectChallenge(page, ["[data-checkpoint]"]));
await browser.close();
