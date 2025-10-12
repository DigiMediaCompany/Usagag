import pandas as pd
import requests
from io import BytesIO
import time
import config
 

def build_public_url(filename):
    """Tạo public URL từ filename Worker trả về"""
    return f"{config.R2_URL}/files/{filename}"

def upload_files_bulk(file_list):
    """
    Upload bulk lên Worker /files/bulk
    file_list: list of dicts {'file_content': bytes, 'filename': str}
    Trả về list dict: {'success': True/False, 'public_url': str, 'originalName': str, ...}
    """
    files_payload = []
    for f in file_list:
        filename = f.get('filename')
        content = f.get('file_content')
        if not filename or content is None:
            raise ValueError("Each item must have 'filename' and 'file_content'")

        bio = BytesIO(content)
        bio.seek(0)
        files_payload.append(('files', (filename, bio)))

    url = f"{config.R2_URL}/files/bulk"
    res = requests.post(url, files=files_payload)
    try:
        res.raise_for_status()
    except requests.HTTPError as e:
        print("Upload failed:", res.status_code, res.text)
        raise

    data = res.json()
    results = []

    for r in data.get('results', []):
        if r.get('success'):
            results.append({
                'success': True,
                'originalName': r.get('originalName'),
                'public_url': build_public_url(r.get('filename'))
            })
        else:
            results.append({
                'success': False,
                'originalName': r.get('originalName') or r.get('filename'),
                'message': r.get('message', 'Unknown error')
            })

    return results

df = pd.read_excel("usagag_videos.xlsx")
usagag_videos = df.to_dict(orient='records')

files_to_upload = []
for idx, video in enumerate(usagag_videos):
    try:
        resp = requests.get(video['thumbnail'], timeout=20)
        resp.raise_for_status()
        filename = f"thumbnail_{video['slug']}.jpg"
        files_to_upload.append({
            'file_content': resp.content,
            'filename': filename,
            'index': idx 
        })
    except Exception as e:
        print(f"[{idx+1}] Failed to fetch thumbnail {video['slug']}: {e}")

for batch_start in range(0, len(files_to_upload), config.BATCH_SIZE):
    batch_end = min(batch_start + config.BATCH_SIZE, len(files_to_upload))
    batch = files_to_upload[batch_start:batch_end]

    try:
        upload_list = [{'file_content': f['file_content'], 'filename': f['filename']} for f in batch]
        upload_results = upload_files_bulk(upload_list)

        for i, r in enumerate(upload_results):
            idx = batch[i]['index']
            if r['success']:
                usagag_videos[idx]['thumbnail'] = r['public_url']
            else:
                print(f"[{idx+1}] Upload failed: {r.get('message')}")

        time.sleep(config.DELAY_BETWEEN_BATCH)

    except Exception as e:
        print(f"Bulk upload batch failed: {e}")

try:
    res = requests.post(
        f"{config.API_URL}/usagag-videos/bulk",
        json=usagag_videos,   
        timeout=120         
    )

    if res.status_code in (200, 201):
        print(f"✅ Uploaded all {len(usagag_videos)} videos via bulk API")
        print("Response:", res.text)
    else:
        print(f"❌ Error {res.status_code}: {res.text}")

except Exception as e:
    print(f"⚠️ Exception when posting bulk API: {e}")

