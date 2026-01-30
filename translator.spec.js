const { test, expect } = require('@playwright/test');

const URL = 'https://www.swifttranslator.com/';


const OUTPUT_LOCATOR = 'div[class*="whitespace-pre-wrap"][class*="overflow-y-auto"]'; 

// Wait until output Sinhala text appears in output box
async function waitForSinhalaOutput(page) {
  const output = page.locator(OUTPUT_LOCATOR).first();
  await expect(output).toBeVisible({ timeout: 15000 });
  await expect(output).toContainText(/[\u0D80-\u0DFF]/, { timeout: 15000 });
}

// Type like real user
async function typeInput(page, text) {
  const input = page.locator('textarea').first();
  await input.fill('');
  await input.type(text, { delay: 40 });
}

test.beforeEach(async ({ page }) => {
  await page.goto(URL);
  await page.waitForTimeout(2000);
});



const positiveCases = [
  'mama gedhara yanavaa',
  'oyaata kohomadha?',
  'vahaama enna',
  'mama ehema karanne naehae',
  'aayuboovan!',
  'karunaakaralaa mata udhavvak karanna puluvandha?',
  'ehema karapan',
  'ada Zoom meeting ekak thiyenavaa',
  'mama iye gedhara giyaa',
  'api heta yamu',
  'oyaalaa enavaa',
  'hari hari lassanayi',
  'mamagedharayanavaa',
  'Rs. 1500 ganna ona',
  '2025-12-25 api holiday',
  'api Kandy yamu',
  'ela machan supiri',
  'ada vaessa vahinavaa nisaa api gedhara inne.',
  'meeka hariyata vaeda karanavaadha?',
  '7.30 AM enna',
  'kg 5 bath ona',
  'mama gedhara inne\noyaa enavadha?',
  'dhitvaa suli kunaatuva samaga api gedhara inne.',
  'eyaalaa gedhara enavaa'
];

positiveCases.forEach((sentence, i) => {
  test(`Pos_Fun_${i+1}`, async ({ page }) => {
    await typeInput(page, sentence);
    await waitForSinhalaOutput(page);
  });
});




const negativeCases = [
  ['Neg_Fun_01', 'mamagedharayanavaa'],
  ['Neg_Fun_02', 'oyakohomadhainne'],
  ['Neg_Fun_03', 'apibathkanavaa'],
  ['Neg_Fun_04', '123456'],
  ['Neg_Fun_05', '@#$%^&*'],
  ['Neg_Fun_06', 'mama    gedhara    yanavaa'],
  ['Neg_Fun_07', 'MAMA GEDHARA YANAVAA'],
  ['Neg_Fun_08', 'මම ගෙදර යනවා'],
  ['Neg_Fun_09', 'mama'],
  ['Neg_Fun_10', ' ']
];

negativeCases.forEach(([id, inputText]) => {
  test(id, async ({ page }) => {
    await typeInput(page, inputText);

    const output = page.locator(OUTPUT_LOCATOR).first();
    await expect(output).toBeVisible({ timeout: 5000 });
    await expect(output).not.toContainText(/[\u0D80-\u0DFF]/);
  });
});
