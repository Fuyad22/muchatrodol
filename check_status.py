import urllib.request
import urllib.error

urls = [
    'https://muchatrodol.vercel.app/admin/login/',
    'https://muchatrodol.vercel.app/api/stats'
]

for url in urls:
    try:
        print(f"Fetching {url}...")
        code = urllib.request.urlopen(url).getcode()
        print(f"{url} -> {code}")
    except urllib.error.HTTPError as e:
        print(f"{url} -> {e.code}")
    except Exception as e:
        print(f"{url} -> Error: {e}")
