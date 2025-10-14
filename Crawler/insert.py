import pandas as pd
import cloudscraper
import time
import config
from dotenv import load_dotenv
import os

load_dotenv()


scraper = cloudscraper.create_scraper()

df = pd.read_excel(config.excel_name)

for idx, row in df.iterrows():
    record = {
        "title": row["title"],
        "slug": row["slug"],
        "thumbnail": row["thumbnail"],
        "video": row["videolink"]
    }

    try:
        # Add batch insert
        res = scraper.post(os.getenv("API_URL"), json=record, timeout=20)
        if res.status_code in (200, 201):
            print(f"[{idx+1}] Seeded: {record['slug']}")
        elif res.status_code == 409:
            print(f"[{idx+1}] Continue: {record['slug']}")
        else:
            print(f"[{idx+1}] Error {res.status_code}: {res.text}")
    except Exception as e:
        print(f"[{idx+1}] Error when post API: {e}")

    time.sleep(1)
