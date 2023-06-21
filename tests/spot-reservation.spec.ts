import { test, expect, type Page } from '@playwright/test';

require('dotenv').config()

test('Reserve a spot', async ({ page }) => {
  await page.goto('https://studiojogapark.pl/strefaklienta/index.php?s=logowanie');

  const login = process.env.LOGIN as string;
  const password = process.env.PASSWORD as string;

  const loginField = await page.getByPlaceholder('E-mail');
  const passwordField = await page.getByPlaceholder('Hasło');
  const submitButton = await page.getByText(/Zaloguj się/);

  await loginField.fill(login);
  await passwordField.fill(password);
  await submitButton.click();

  // await page.goto('https://studiojogapark.pl/strefaklienta/index.php?s=sala_3&date=&instructor=533758&type=HATHA_JOGA_0');
  // const spotField = page.getByRole('cell', {name: /HATHA JOGA 0 20:00 - 21:15/}).first();

  await page.goto('https://studiojogapark.pl/strefaklienta/index.php?s=sala_1');
  const spotField = await page.getByRole('cell', {name: /HATHA JOGA I 10:00 - 11:15/}).first();
  await spotField.click();

  const multisportRadioButton = await page.getByText('MULTISPORT');
  const acceptRegulations = await page.getByLabel(/Akceptuj/);
  const reserveButton = await page.getByText(/Zarezerwuj/);

  await multisportRadioButton.check();
  await acceptRegulations.check({ force: true });
  await reserveButton.click({ force: true });

  await page.waitForResponse;
  await page.goto('https://studiojogapark.pl/strefaklienta/index.php?s=moje_konto_zajecia');

  const reservation = await page.getByText(/HATHA JOGA 0 » MULTISPORT/).first();
  
  await expect(reservation).toBeVisible();


});
