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
var _this = this;
// import puppeteer from 'puppeteer';
var puppeteer = require('puppeteer');
var OladocScraper = /** @class */ (function () {
    function OladocScraper(city) {
        this.city = city;
    }
    OladocScraper.prototype.scrape = function () {
        return __awaiter(this, void 0, void 0, function () {
            var browser, page, doctors;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, puppeteer.launch()];
                    case 1:
                        browser = _a.sent();
                        return [4 /*yield*/, browser.newPage()];
                    case 2:
                        page = _a.sent();
                        return [4 /*yield*/, page.goto("https://oladoc.com/pakistan/".concat(this.city.toLowerCase(), "/general-physician"), {
                                waitUntil: 'networkidle2',
                            })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, page.evaluate(function () {
                                var doctorElements = document.querySelectorAll('.row.doctor-picture-frame');
                                return Array.from(doctorElements).map(function (doctor) {
                                    var _a, _b, _c, _d, _e, _f, _g, _h;
                                    var name = ((_b = (_a = doctor.querySelector('.doctor-name')) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim()) || '';
                                    var speciality = ((_d = (_c = doctor.querySelector('.od-text-dark-muted')) === null || _c === void 0 ? void 0 : _c.textContent) === null || _d === void 0 ? void 0 : _d.trim()) || '';
                                    var experience = ((_f = (_e = doctor.querySelector('.text-truncate')) === null || _e === void 0 ? void 0 : _e.textContent) === null || _f === void 0 ? void 0 : _f.trim()) || '';
                                    var image = ((_g = doctor.querySelector('.avatar img')) === null || _g === void 0 ? void 0 : _g.getAttribute('src')) || '';
                                    var profileLink = ((_h = doctor.querySelector('.doctor-name')) === null || _h === void 0 ? void 0 : _h.getAttribute('href')) || '';
                                    return {
                                        name: name,
                                        speciality: speciality,
                                        experience: experience,
                                        image: image,
                                        profileLink: profileLink,
                                    };
                                });
                            })];
                    case 4:
                        doctors = _a.sent();
                        return [4 /*yield*/, browser.close()];
                    case 5:
                        _a.sent();
                        console.log(doctors); // Logs the scraped doctors
                        return [2 /*return*/, doctors];
                }
            });
        });
    };
    return OladocScraper;
}());
(function () { return __awaiter(_this, void 0, void 0, function () {
    var scraper;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                scraper = new OladocScraper("lahore");
                return [4 /*yield*/, scraper.scrape()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
