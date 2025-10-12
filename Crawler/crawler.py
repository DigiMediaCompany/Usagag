import cloudscraper
from bs4 import BeautifulSoup
import pandas as pd
import time
import re
import unicodedata
import config


scraper = cloudscraper.create_scraper()

def slugify(value):
    value = str(value)
    value = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode("utf-8")
    value = value.lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    value = value.strip("-")
    return value

data_list = []
page = 2  

while True:
    url = config.BASE_URL.format(page)
    print(f"Đang lấy page {page} -> {url}")

    r = scraper.get(url, timeout=30)
    if not r.text.strip():
        print("Hết")
        break

    soup = BeautifulSoup(r.text, "html.parser")
    items = soup.select("ul > li")

    if not items:
        print("Không còn item")
        break

    for item in items:
        try:
            thumb_a = item.select_one(".entry-thumbnail a")
            href = thumb_a["href"] if thumb_a else ""
            picture = thumb_a.select_one("picture source") if thumb_a else None
            img_url = ""
            if picture:
                img_url = picture.get("data-srcset") or picture.get("srcset") or ""
                if img_url:
                    img_url = img_url.split(",")[0].strip().split(" ")[0]

            link_el = item.select_one(".entry-header h3 a")
            title = link_el.get_text(strip=True) if link_el else ""

            video_url = ""
            if href:
                try:
                    detail = scraper.get(href, timeout=30)
                    d_soup = BeautifulSoup(detail.text, "html.parser")
                    video_el = d_soup.select_one("#videoplayer video source")
                    if video_el:
                        video_url = video_el.get("src", "")
                except Exception as e:
                    print("Lỗi khi lấy video:", e)

            slug = slugify(title)

            data_list.append({
                "title": title,
                "slug": slug,
                "thumbnail": img_url,
                "video": video_url
            })
            print(f"[OK] {title} -> slug: {slug}")

        except Exception as e:
            print("Lỗi:", e)

    page += 1
    time.sleep(2)  

df = pd.DataFrame(data_list)
df.to_excel(config.excel_name, index=False)

