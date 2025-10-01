import pandas as pd
import cloudscraper
import time

API_URL = "https://usagag.quang159258.workers.dev/videos"

# Tạo scraper (giữ cookies/session)
scraper = cloudscraper.create_scraper()

# Đọc file Excel
df = pd.read_excel("usagag_videos.xlsx")

for idx, row in df.iterrows():
    record = {
        "Title": row["Title"],
        "Slug": row["Slug"],
        "Thumbnail": row["Thumbnail"],
        "Page Link": row["Page Link"],
        "Video Link": row["Video Link"]
    }

    try:
        res = scraper.post(API_URL, json=record, timeout=20)
        if res.status_code in (200, 201):
            print(f"[{idx+1}] ✅ Seeded: {record['Slug']}")
        elif res.status_code == 409:
            print(f"[{idx+1}] ⚠️ Bỏ qua (đã tồn tại): {record['Slug']}")
        else:
            print(f"[{idx+1}] ❌ Lỗi {res.status_code}: {res.text}")
    except Exception as e:
        print(f"[{idx+1}] ❌ Lỗi khi gọi API: {e}")

    time.sleep(1)
