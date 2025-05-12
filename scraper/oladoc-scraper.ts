// import puppeteer from 'puppeteer';
const puppeteer = require('puppeteer');

interface Doctor {
  name: string;
  speciality: string;
  experience: string;
  image: string;
  profileLink: string;
}

 class OladocScraper {
  
  constructor(private city: string) {}

  async scrape(): Promise<Doctor[]> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://oladoc.com/pakistan/${this.city.toLowerCase()}/general-physician`, {
      waitUntil: 'networkidle2',
    });

    const doctors = await page.evaluate(() => {
      const doctorElements = document.querySelectorAll('.row.doctor-picture-frame');
      return Array.from(doctorElements).map((doctor) => {
        const name = doctor.querySelector('.doctor-name')?.textContent?.trim() || '';
        const speciality = doctor.querySelector('.od-text-dark-muted')?.textContent?.trim() || '';
        const experience = doctor.querySelector('.text-truncate')?.textContent?.trim() || '';
        const image = doctor.querySelector('.avatar img')?.getAttribute('src') || '';
        const profileLink =
          doctor.querySelector('.doctor-name')?.getAttribute('href') || '';

        return {
          name,
          speciality,
          experience,
          image,
          profileLink,
        };
      });
    });

    await browser.close();
    console.log(doctors); // Logs the scraped doctors
    return doctors;
  }
}

(async () => {
  const scraper = new OladocScraper("lahore");
  await scraper.scrape();
})();
