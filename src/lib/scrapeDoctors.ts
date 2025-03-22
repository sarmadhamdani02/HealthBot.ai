import axios from 'axios';
import * as cheerio from 'cheerio';

// Function to scrape the top 5 doctors from a location
export const scrapeDoctors = async (location: string): Promise<{ name: string; address: string; rating: number; distance: string; specialization: string; available: string }[]> => {
    console.log('Scraping started for location:', location);

    try {
        // URL for the given location, condition 'dengue' in this case
        const url = `https://oladoc.com/pakistan/${encodeURIComponent(location)}/condition/dengue`;
        console.log('Requesting data from URL:', url);

        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            },
        });

        const html = response.data;
        console.log('HTML received:', html); // Inspect the raw HTML content

        const $ = cheerio.load(html);
        const doctors: { name: string; address: string; rating: number; distance: string; specialization: string; available: string }[] = [];

        // Select the top 5 doctors based on CSS classes and structure
        // Adjust the selectors as needed based on the actual page structure
        $('.doctor-card-class').slice(0, 5).each((_index, element) => {
            const name = $(element).find('doctor-name').text().trim() || 'N/A';
            const address = $(element).find('.doctor-address-class').text().trim() || 'N/A';
            const rating = parseFloat($(element).find('.doctor-rating-class').text().trim()) || 0; // Assuming rating is numeric
            const distance = $(element).find('.doctor-distance-class').text().trim() || 'N/A';
            const specialization = $(element).find('.text-truncate ').text().trim() || 'N/A';
            const available = $(element).find('.doctor-availability-class').text().trim() || 'N/A';

            // Push each doctor's info into the array
            doctors.push({
                name,
                address,
                rating,
                distance,
                specialization,
                available,
            });
        });

        console.log('Formatted doctors list:', doctors);
        return doctors;

    } catch (error) {
        console.error('Error during scraping:', error.message);
        return [];
    }
};
