const { test, expect } = require('@playwright/test');

// Utility: wait until Sinhala characters appear anywhere
async function waitForSinhala(page) {
  await page.waitForFunction(() => {
    return /[\u0D80-\u0DFF]/.test(document.body.innerText);
  }, { timeout: 15000 });
}

// Utility: type input
async function typeInput(page, text) {
  await page.locator('textarea').first().fill('');
  await page.locator('textarea').first().type(text, { delay: 50 });
}



// 1 Simple sentence
test('Pos_Fun_01 - Simple daily sentence', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await typeInput(page, 'mama gedhara yanavaa');
  await waitForSinhala(page);
  expect(await page.textContent('body')).toMatch(/[\u0D80-\u0DFF]/);
});

// 2 Question
test('Pos_Fun_02 - Question sentence', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await typeInput(page, 'oyaata kohomadha?');
  await waitForSinhala(page);
  expect(await page.textContent('body')).toMatch(/[\u0D80-\u0DFF]/);
});

// 3 Command
test('Pos_Fun_03 - Command sentence', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await typeInput(page, 'vahaama enna');
  await waitForSinhala(page);
  expect(await page.textContent('body')).toMatch(/[\u0D80-\u0DFF]/);
});

// 4 Negative sentence
test('Pos_Fun_04 - Negative sentence', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await typeInput(page, 'mama ehema karanne naehae');
  await waitForSinhala(page);
  expect(await page.textContent('body')).toMatch(/[\u0D80-\u0DFF]/);
});

// 5 Greeting
test('Pos_Fun_05 - Greeting', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await typeInput(page, 'aayuboovan!');
  await waitForSinhala(page);
  expect(await page.textContent('body')).toMatch(/[\u0D80-\u0DFF]/);
});

// 6 Polite request
test('Pos_Fun_06 - Polite request', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await typeInput(page, 'karunaakaralaa mata udhavvak karanna puluvandha?');
  await waitForSinhala(page);
  expect(await page.textContent('body')).toMatch(/[\u0D80-\u0DFF]/);
});

// 7 Informal sentence
test('Pos_Fun_07 - Informal phrasing', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await typeInput(page, 'ehema karapan');
  await waitForSinhala(page);
  expect(await page.textContent('body')).toMatch(/[\u0D80-\u0DFF]/);
});

// 8 Mixed English
test('Pos_Fun_08 - Mixed Singlish + English', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await typeInput(page, 'ada Zoom meeting ekak thiyenavaa');
  await waitForSinhala(page);
  expect(await page.textContent('body')).toMatch(/[\u0D80-\u0DFF]/);
});

// 9 Past tense
test('Pos_Fun_09 - Past tense', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await typeInput(page, 'mama iye gedhara giyaa');
  await waitForSinhala(page);
  expect(await page.textContent('body')).toMatch(/[\u0D80-\u0DFF]/);
});

// 10 Future tense
test('Pos_Fun_10 - Future tense', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await typeInput(page, 'api heta yamu');
  await waitForSinhala(page);
  expect(await page.textContent('body')).toMatch(/[\u0D80-\u0DFF]/);
});

// 11 Plural
test('Pos_Fun_11 - Plural usage', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await typeInput(page, 'oyaalaa enavaa');
  await waitForSinhala(page);
  expect(await page.textContent('body')).toMatch(/[\u0D80-\u0DFF]/);
});

// 12 Repeated words
test('Pos_Fun_12 - Repeated words', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await typeInput(page, 'hari hari lassanayi');
  await waitForSinhala(page);
  expect(await page.textContent('body')).toMatch(/[\u0D80-\u0DFF]/);
});

// 13 Joined words
test('Pos_Fun_13 - Joined words', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await typeInput(page, 'mamagedharayanavaa');
  await waitForSinhala(page);
  expect(await page.textContent('body')).toMatch(/[\u0D80-\u0DFF]/);
});

// 14 Numbers
test('Pos_Fun_14 - Numbers', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await typeInput(page, 'Rs. 1500 ganna ona');
  await waitForSinhala(page);
  expect(await page.textContent('body')).toMatch(/[\u0D80-\u0DFF]/);
});

// 15 Date
test('Pos_Fun_15 - Date format', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await typeInput(page, '2025-12-25 api holiday');
  await waitForSinhala(page);
  expect(await page.textContent('body')).toMatch(/[\u0D80-\u0DFF]/);
});

// 16 Place name
test('Pos_Fun_16 - Place name', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await typeInput(page, 'api Kandy yamu');
  await waitForSinhala(page);
  expect(await page.textContent('body')).toMatch(/[\u0D80-\u0DFF]/);
});

// 17 Slang
test('Pos_Fun_17 - Slang language', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await typeInput(page, 'ela machan supiri');
  await waitForSinhala(page);
  expect(await page.textContent('body')).toMatch(/[\u0D80-\u0DFF]/);
});

// 18 Medium paragraph
test('Pos_Fun_18 - Medium paragraph', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await typeInput(page, 'ada vaessa vahinavaa nisaa api gedhara inne. passe api kathaa karamu.');
  await waitForSinhala(page);
  expect(await page.textContent('body')).toMatch(/[\u0D80-\u0DFF]/);
});

// 19 Punctuation
test('Pos_Fun_19 - Punctuation', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await typeInput(page, 'meeka hariyata vaeda karanavaadha?');
  await waitForSinhala(page);
  expect(await page.textContent('body')).toMatch(/[\u0D80-\u0DFF]/);
});

// 20 Time
test('Pos_Fun_20 - Time format', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await typeInput(page, '7.30 AM enna');
  await waitForSinhala(page);
  expect(await page.textContent('body')).toMatch(/[\u0D80-\u0DFF]/);
});

// 21 Measurement
test('Pos_Fun_21 - Measurement units', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await typeInput(page, 'kg 5 bath ona');
  await waitForSinhala(page);
  expect(await page.textContent('body')).toMatch(/[\u0D80-\u0DFF]/);
});

// 22 Line break
test('Pos_Fun_22 - Line break input', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await typeInput(page, 'mama gedhara inne\noyaa enavadha?');
  await waitForSinhala(page);
  expect(await page.textContent('body')).toMatch(/[\u0D80-\u0DFF]/);
});

// 23 Long input
test('Pos_Fun_23 - Long input', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await typeInput(page, 'dhitvaa suli kunaatuva samaga api gedhara inne namuth passe yamu kiyala hithanavaa.');
  await waitForSinhala(page);
  expect(await page.textContent('body')).toMatch(/[\u0D80-\u0DFF]/);
});

// 24 Pronouns
test('Pos_Fun_24 - Pronoun variation', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await typeInput(page, 'eyaalaa gedhara enavaa');
  await waitForSinhala(page);
  expect(await page.textContent('body')).toMatch(/[\u0D80-\u0DFF]/);
});




test('Neg_Fun_01 - Empty input', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await typeInput(page, '');
  await page.waitForTimeout(2000);
  expect(await page.textContent('body')).not.toMatch(/[\u0D80-\u0DFF]/);
});

test('Neg_Fun_02 - Only numbers', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await typeInput(page, '123456');
  await page.waitForTimeout(2000);
  expect(await page.textContent('body')).not.toMatch(/[\u0D80-\u0DFF]/);
});

test('Neg_Fun_03 - Only symbols', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await typeInput(page, '@@@###');
  await page.waitForTimeout(2000);
  expect(await page.textContent('body')).not.toMatch(/[\u0D80-\u0DFF]/);
});

test('Neg_Fun_04 - Random letters', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await typeInput(page, 'asdfghjkl');
  await page.waitForTimeout(2000);
  expect(await page.textContent('body')).not.toMatch(/[\u0D80-\u0DFF]/);
});

test('Neg_Fun_05 - Extra spaces', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await typeInput(page, 'mama    gedhara     yanavaa');
  await waitForSinhala(page);
  expect(await page.textContent('body')).not.toMatch(/[\u0D80-\u0DFF]/);
});

test('Neg_Fun_06 - English only', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await typeInput(page, 'Please send the email');
  await page.waitForTimeout(2000);
  expect(await page.textContent('body')).not.toMatch(/[\u0D80-\u0DFF]/);
});

test('Neg_Fun_07 - Long English paragraph', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await typeInput(page, 'This is a long English paragraph used to test system behavior.');
  await page.waitForTimeout(2000);
  expect(await page.textContent('body')).not.toMatch(/[\u0D80-\u0DFF]/);
});

test('Neg_Fun_08 - Mixed garbage', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await typeInput(page, '!!! mama ### yanavaa ???');
  await waitForSinhala(page);
  expect(await page.textContent('body')).not.toMatch(/[\u0D80-\u0DFF]/);
});

test('Neg_Fun_09 - Rapid typing', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await page.locator('textarea').first().type('mamagedharayanavaa', { delay: 1 });
  await waitForSinhala(page);
  expect(await page.textContent('body')).not.toMatch(/[\u0D80-\u0DFF]/);
});

test('Neg_Fun_10 - Clear input', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await typeInput(page, 'mama gedhara yanavaa');
  await page.locator('textarea').first().fill('');
  await page.waitForTimeout(2000);
  expect(await page.textContent('body')).not.toMatch(/[\u0D80-\u0DFF]/);
});
