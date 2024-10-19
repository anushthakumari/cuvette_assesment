const cheerio = require("cheerio");
const axios = require("axios");

const parsePrice = (str) => {
	const regex = /([^\d.,]+)?\s*(\d+(?:,\d{3})*(?:\.\d+)?)$/;

	const match = str.match(regex);

	if (match) {
		const currency = match[1] ? match[1].trim() : "";
		const amount = parseFloat(match[2].replace(/,/g, ""));

		return {
			currency: currency,
			amount: amount,
		};
	} else {
		return 0;
	}
};

const getHTML = async (url) => {
	try {
		const config = {
			headers: {
				"User-Agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
			},
		};

		const { data: html } = await axios.get(url, config);
		return cheerio.load(html);
	} catch (error) {
		console.log(error.response.status);
		throw error;
	}
};

const parseEbayProductPage = async (url) => {
	const clean_url = url.split("?")[0];

	const $_parsed_html = await getHTML(clean_url);

	const priceStr = $_parsed_html(".x-price-primary")
		.find(".ux-textspans")
		.text();

	const name = $_parsed_html(".x-item-title__mainTitle")
		.find(".ux-textspans")
		.text()
		.trim();

	const imageSrc = $_parsed_html(".ux-image-carousel-item img").attr("src");

	const priceData = parsePrice(priceStr);

	return {
		imageSrc,
		productName: name,
		scrapeUrl: clean_url,
		currentPrice: priceData.amount,
		currencySymbol: priceData.currency,
		productSource: "ebay",
	};
};

const fethFromUrl = async (url, expected_price) => {
	const source = url.includes("amazon")
		? "amazon"
		: url.includes("ebay")
		? "ebay"
		: "";

	if (source === "amazon") {
		const clean_url = url.split("ref=")[0];

		const $_parsed_html = await getHTML(clean_url);

		const priceStr = $_parsed_html(".a-offscreen").text();

		const name = $_parsed_html("#productTitle").text().trim();
		const imageSrc = $_parsed_html("#landingImage").attr("src");

		const priceData = parsePrice(priceStr);

		return {
			imageSrc,
			scrapeUrl: clean_url,
			productName: name,
			currentPrice: priceData.amount,
			currencySymbol: priceData.currency,
			productSource: source,
		};
	}

	if (source === "ebay") {
		return await parseEbayProductPage(url);
	}
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const generateOTP = () => {
	let otp = "";
	for (let i = 0; i < 6; i++) {
		otp += Math.floor(Math.random() * 10).toString();
	}
	return otp;
};

module.exports = {
	fethFromUrl,
	delay,
	generateOTP,
};
