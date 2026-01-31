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
  ['adha vaessa vahinavaa nisaa api gedhara inne.','අද වැස්ස වහිනවා නිසා අපි ගෙදර ඉන්නේ.'],
  ['meeka hariyata vaeda karanavaadha?','මේක හරියට වැඩ කරනවාද?'],
  ['7.30 AM enna','7.30 AM එන්න'],
  ['kg 5 bath ona','kg 5 බත් ඔන'],
  ['mama gedhara inne\noyaa enavadha?','මම ගෙදර ඉන්නේ\නොයා එනවද?'],
  ['dhitvaa suli kunaatuva samaga api gedhara inne.','දිට්වා සුලි කුනාටුව සමග අපි ගෙදර ඉන්නේ.'],
  ['eyaalaa gedhara enavaa','එයාලා ගෙදර එනවා']
];

positiveCases.forEach((testCase, i) => {
  test(`Pos_Fun_${i+1}`, async ({ page }) => {
    const inputText = testCase[0];
    await typeInput(page, inputText);
    await waitForSinhalaOutput(page);
  });
});

const negativeCases = [
  ['Neg_Fun_01', 'm a m a g e d h a r a y a n a v a a', 'මම ගෙදර යනවා'],
  ['Neg_Fun_02', 'oyakohomadhainne', 'ඔයාට කොහොමද?'],
  ['Neg_Fun_03', 'apibathkanawaa', 'අපි බත් කනවා'],
  ['Neg_Fun_04', 'mama gedara yanawa', 'මම ගෙදර යනවා'],
  ['Neg_Fun_05', '@#$%^&*', 'dsoaidnb'],
  ['Neg_Fun_06', 'mama    gedhara    yanavaa', 'මම ගෙදර යනවා'],
  ['Neg_Fun_07', 'MAMA GEDHARA YANAVAA', 'මම ගෙදර යනවා'],
  ['Neg_Fun_08', 'මම ගෙදර යනවා', 'මම ගෙදර යනවා'], 
  ['Neg_Fun_09', 'mama', 'මම'],
  ['Neg_Fun_10', 'we are bath kanava ', 'අපි බත් කනවා']
];

negativeCases.forEach(([id, inputText, wrongExpected]) => {
  test(id, async ({ page }) => {
    await typeInput(page, inputText);

    const output = page.locator(OUTPUT_LOCATOR).first();
    await expect(output).toBeVisible({ timeout: 10000 });

    const text = await output.innerText();

   
    expect(text.trim()).toBe(wrongExpected.trim());
  });
});

// UI smoke test: verify main UI elements are present
test('UI_Check_01', async ({ page }) => {
  await page.goto(URL);
  await page.waitForTimeout(3000);

  // verify language option labels and main buttons are visible
  await expect(page.locator('text=Singlish')).toBeVisible();
  await expect(page.locator('text=Sinhala')).toBeVisible();
  await expect(page.locator('text=Clear')).toBeVisible();
});



