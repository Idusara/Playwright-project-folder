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
  await page.waitForTimeout(8000);
});


const positiveCases = [
  ['mama gedhara yanavaa','මම ගෙදර යනවා'],
  ['oyaata kohomadha?','ඔයාට කොහොමද?'],
  ['vahaama enna','වහාම එන්න'],
  ['mama ehema karanne naehae','මම එහෙම කරන්නේ නැහැ'],
  ['aayuboovan!','ආයුබෝවන්!'],
  ['karunaakaralaa mata udhavvak karanna puluvandha?','කරුනාකරලා මට උදව්වක් කරන්න පුලුවන්ද?'],
  ['ehema karapan','එහෙම කරපන්'],
  ['adha Zoom meeting ekak thiyenavaa','අද Zoom meeting එකක් තියෙනවා'],
  ['mama iye gedhara giyaa','මම ඉයෙ ගෙදර ගියා'],
  ['api heta yamu','අපි හෙට යමු'],
  ['oyaalaa enavaa','ඔයාලා එනවා'],
  ['hari hari lassanayi','හරි හරි ලස්සනයි'],
  ['mamagedharayanavaa','මමගෙදරයනවා'],
  ['Rs. 1500 ganna ona','Rs. 1500 ගන්න ඔන'],
  ['2025-12-25 api holiday','2025-12-25 අපි holiday'],
  ['api Kandy yamu','අපි Kandy යමු'],
  ['ela machan supiri','එල මචන් සුපිරි'],
  ['ada vaessa vahinavaa nisaa api gedhara inne.','ඇත්තට වැසස් වහිනවා නිසා අපි ගෙදර ඉන්න'],
  ['meeka hariyata vaeda karanavaadha?','මෙකකට හරයට වැදකරනවදහ?'],
  ['7.30 AM enna','7.30 AM එනව'],
  ['kg 5 bath ona','කග. 5බතයනවආ'],
  ['mama gedhara inne\noyaa enavadha?','මමගේදහරයනවආ\nඔයලට එනවදහ?'],
  ['dhitvaa suli kunaatuva samaga api gedhara inne.','ධිත්වය සුලි කණතවසමගට අපි ගෙදර ඉන്ന'],
  ['eyaalaa gedhara enavaa','එයලටගතගතගතගතගතගතගතගතගතගතගත']
];

positiveCases.forEach((testCase, i) => {
  test(`Pos_Fun_${i+1}`, async ({ page }) => {
    const inputText = testCase[0];
    await typeInput(page, inputText);
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
    test.fail();
    await typeInput(page, inputText);

    const output = page.locator(OUTPUT_LOCATOR).first();
    await expect(output).toBeVisible({ timeout: 5000 });
    await expect(output).not.toContainText(/[\u0D80-\u0DFF]/);
  });
});
