import axios from 'axios';
import * as cheerio from 'cheerio';

interface Doctor {
    name: string;
    specialty: string;
    phone: string;
}

export const scrapeDoctors = async (location: string): Promise<Doctor[]> => {
    const url = `https://oladoc.com/pakistan/${location}/condition/dengue`; // Replace with the actual URL
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    
    const doctors: Doctor[] = [];
    $('.doctor-listing').each((i, element) => {  // Replace with actual class name
        const name = $(element).find('.doctor-name').text().trim();  // Replace with actual class name
        const specialty = $(element).find('.doctor-specialty').text().trim();  // Replace with actual class name
        const phone = $(element).find('.doctor-phone').text().trim();  // Replace with actual class name

        doctors.push({ name, specialty, phone });
    });

    return doctors;
};
