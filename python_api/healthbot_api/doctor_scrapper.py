# install playwright if you haven't already: pip install playwright
# and install browsers once: playwright install

import asyncio
from playwright.async_api import async_playwright

class Doctor:
    def __init__(self, name, speciality, experience, image, profile_link):
        self.name = name
        self.speciality = speciality
        self.experience = experience
        self.image = image
        self.profile_link = profile_link

    def to_dict(self):
        return {
            "name": self.name,
            "speciality": self.speciality,
            "experience": self.experience,
            "image": self.image,
            "profileLink": self.profile_link
        }

class OladocScraper:
    def __init__(self, city, doctor):
        self.city = city.lower()
        self.doctor = doctor.lower().replace(" ", "-")

    async def scrape(self):
        doctors = []
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page()
            await page.goto(f"https://oladoc.com/pakistan/{self.city}/{self.doctor}", wait_until='networkidle')

            doctor_elements = await page.query_selector_all('.row.doctor-picture-frame')
            for doctor in doctor_elements:
                name_element = await doctor.query_selector('.doctor-name')
                speciality_element = await doctor.query_selector('.od-text-dark-muted')
                experience_element = await doctor.query_selector('.text-truncate')
                image_element = await doctor.query_selector('.avatar img')

                name = (await name_element.text_content()) if name_element else ''
                speciality = (await speciality_element.text_content()) if speciality_element else ''
                experience = (await experience_element.text_content()) if experience_element else ''
                image = (await image_element.get_attribute('src')) if image_element else ''
                profile_link = (await name_element.get_attribute('href')) if name_element else ''

                doctors.append(
                    Doctor(
                        name=name.strip(),
                        speciality=speciality.strip(),
                        experience=experience.strip(),
                        image=image,
                        profile_link=profile_link
                    )
                )

            await browser.close()
            return [doc.to_dict() for doc in doctors]

# Usage
async def main():
    scraper = OladocScraper("lahore", "General Physician")
    doctors = await scraper.scrape()
    for doc in doctors:
        print(doc)

if __name__ == "__main__":
    asyncio.run(main())
