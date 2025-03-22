const { scrapeDoctors } = require('./lib/scrapeDoctors');

const testScraping = async () => {
    console.log('Started..');  // Check if the data is being returned as expected

    const location = 'attock';  // Replace with your desired location
    const doctors = await scrapeDoctors(location);
    console.log('Doctors:', doctors);  // Check if the data is being returned as expected
};

testScraping();
