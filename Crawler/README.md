# Usagag Video Crawler & Seeder

A Python tool to crawl videos from **usagag.com**, store them in an Excel file, and seed them into a backend API.

## Features
- Crawl videos from **usagag.com**
  - Extract title, slug, thumbnail, page link, and video link
  - Auto-pagination until no more results are available
- Export data into an Excel file (`usagag_videos.xlsx`)
- Seed crawled data into an API (Cloudflare Worker API)
  - Skip duplicates automatically
  - Maintain session/cookies with `cloudscraper`

## Installation
### Prerequisites
- Python 3.8+
- pip

### Setup

Change D1_URL in .env to your Cloudflare D1 URL
```bash
pip install requirements.txt
```

1. Crawl videos into Excel
```bash
python crawler.py
```

2. Seed videos into the API
```bash
python insert.py
```


