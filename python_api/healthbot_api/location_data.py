import os
import requests
from dotenv import load_dotenv
from pprint import pprint

load_dotenv()

def get_weather():
    try:
        response = requests.get(
            "http://api.openweathermap.org/data/2.5/weather",
            params={
                "lat": 33.7667,
                "lon": 72.3667,
                "appid": os.getenv("OPENWEATHER_API_KEY"),
                "units": "metric"
            }
        )
        print("Status Code:", response.status_code)
        print("Response Text:", response.text)
        data = response.json()
        return {
            "temp": data["main"]["temp"],
            "humidity": data["main"]["humidity"],
            "conditions": data["weather"][0]["description"],
            "air_quality": "Moderate"
        }
    except Exception as e:
        print(f"Weather API Error: {str(e)}")
        return None

def get_news():
    """Get health/environment news for Pakistan region"""
    try:
        response = requests.get(
            "https://newsapi.org/v2/everything",
            params={
                "q": "health OR environment OR pollution",
                "language": "en",
                "pageSize": 3,
                "apiKey": os.getenv("NEWSAPI_KEY"),
                "sortBy": "publishedAt",
                "searchIn": "title,description"
            }
        )
        return [{"title": article["title"], "url": article["url"]} for article in response.json()["articles"]]
    except Exception as e:
        print(f"News API Error: {str(e)}")
        return None

if __name__ == "__main__":
    print("Testing Attock Weather Data...")
    weather_data = get_weather()
    print("\nWeather Data:")
    pprint(weather_data)
    
    print("\nTesting Attock News Data...")
    news_data = get_news()
    print("\nNews Data:")
    pprint(news_data)
    
    print("\nSample Combined Context:")
    if weather_data:
        print(f"\nCurrent Weather in Attock:")
        print(f"- Temperature: {weather_data['temp']}°C")
        print(f"- Humidity: {weather_data['humidity']}%")
        print(f"- Conditions: {weather_data['conditions']}")
        print(f"- Air Quality: {weather_data['air_quality']}")
    
    if news_data:
        print("\nRecent Health/Environment News:")
        for i, article in enumerate(news_data[:3], 1):
            print(f"{i}. {article['title']}")
            print(f"   {article['url']}")