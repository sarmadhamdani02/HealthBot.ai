"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeDoctors = void 0;
var axios_1 = require("axios");
var cheerio = require("cheerio");
// Function to scrape the top 5 doctors from a location
var scrapeDoctors = function (location) { return __awaiter(void 0, void 0, void 0, function () {
    var url, response, html, $_1, doctors_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('Scraping started for location:', location);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                url = "https://oladoc.com/pakistan/".concat(encodeURIComponent(location), "/condition/dengue");
                console.log('Requesting data from URL:', url);
                return [4 /*yield*/, axios_1.default.get(url, {
                        headers: {
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                        },
                    })];
            case 2:
                response = _a.sent();
                html = response.data;
                console.log('HTML received:', html); // Inspect the raw HTML content
                $_1 = cheerio.load(html);
                doctors_1 = [];
                // Select the top 5 doctors based on CSS classes and structure
                // Adjust the selectors as needed based on the actual page structure
                $_1('.doctor-card-class').slice(0, 5).each(function (_index, element) {
                    var name = $_1(element).find('doctor-name').text().trim() || 'N/A';
                    // const address = $(element).find('.doctor-address-class').text().trim() || 'N/A';
                    // const rating = parseFloat($(element).find('.doctor-rating-class').text().trim()) || 0; // Assuming rating is numeric
                    // const distance = $(element).find('.doctor-distance-class').text().trim() || 'N/A';
                    var specialization = $_1(element).find('.doc-degree ').text().trim() || 'N/A';
                    // const available = $(element).find('.doctor-availability-class').text().trim() || 'N/A';
                    // Push each doctor's info into the array
                    doctors_1.push({
                        name: name,
                        // address,
                        // rating,
                        // distance,
                        specialization: specialization,
                        // available,
                    });
                });
                console.log('Formatted doctors list:', doctors_1);
                return [2 /*return*/, doctors_1];
            case 3:
                error_1 = _a.sent();
                console.error('Error during scraping:', error_1.message);
                return [2 /*return*/, []];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.scrapeDoctors = scrapeDoctors;
