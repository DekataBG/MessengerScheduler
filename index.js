const puppeteer = require('puppeteer');
const fs = require('fs');
const currentDirectory = __dirname;

(async () => {
    const message = (await readFileAsync(currentDirectory + '/data/message.txt')).trimEnd();
    const user = (await readFileAsync(currentDirectory + '/data/user.txt')).trimEnd();
    const [email, password] = (await readFileAsync(currentDirectory + '/data/credentials.txt')).trimEnd().split(' ');

    browser = await launchBrowser();

    const page = await browser.newPage();

    await page.goto('https://www.facebook.com/messages');

    await acceptCookies(page);

    await login(page, email, password);

    await openChatRoom(page, user);

    await sendMessage(page, message);

    await browser.close();

    await deleteData();
})();

async function readFileAsync(filePath) {
    try {
      const data = await fs.promises.readFile(filePath, 'utf8');
      return data;
    } catch (error) {
      console.error('Error reading file:', error);
      throw error;
    }
  }

// Launch Puppeteer and create a new browser instance
async function launchBrowser() {
    const browser = await puppeteer.launch({ defaultViewport: {
      width: 1700,
      height: 900
    },
    headless: 'new' });

    return browser;
}

async function acceptCookies(page) { 
    const acceptCookiesButtonselector = '[data-testid=cookie-policy-manage-dialog-accept-button]';

    // Wait for the cookie acceptance button to appear
    await page.waitForSelector(acceptCookiesButtonselector);

    // Click the cookie acceptance button
    await page.click(acceptCookiesButtonselector);  
}

// Fill in the login form with your Facebook credentials
async function login(page, email, password) {
    await page.type('#email', email);
    await page.type('#pass', password);

    // Submit the login form
    await page.click('[name=login]');

    // Wait for the page to load after login
    await page.waitForNavigation();   
}

async function openChatRoom(page, name) {
    const searchBarSelector = '[aria-label="Search Messenger"]';

    await page.waitForSelector(searchBarSelector);
    await page.type(searchBarSelector, name);

    // Wait for the span with specific text to appear - the name of the person
    const spanSelector = `//div/a/div/div[2]/div/div/span/span/span[text()="${name}"]`;
    await page.waitForXPath(spanSelector);

    // Get the element handle for the span
    const [spanHandle] = await page.$x(spanSelector);

    // Click on the span element
    await spanHandle.click();
}

async function sendMessage(page, message) {
    // Wait for the span with specific text to appear - search bar
    const divSelector = `//div[text()="Aa"]`;
    await page.waitForXPath(divSelector);

    // Get the element handle for the span
    const [divHandle] = await page.$x(divSelector);
    await divHandle.click();

    await divHandle.type(message);
    await page.waitForTimeout(1000);

    await page.keyboard.press('Enter');
    await page.waitForTimeout(1000);
}

async function deleteData() {
    await(fs.writeFileSync(currentDirectory + '/data/message.txt', ''));
    await(fs.writeFileSync(currentDirectory + '/data/user.txt', ''));
    await(fs.writeFileSync(currentDirectory + '/data/credentials.txt', ''));
}