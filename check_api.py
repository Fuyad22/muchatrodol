
import urllib.request
import json
import time

API_BASE = 'http://localhost:8000/api'
endpoints = ['team', 'events', 'news', 'slider-content', 'gallery', 'faqs']

print(f"Checking API at {API_BASE}...")
print("Waiting 5 seconds to ensure server is ready...")
time.sleep(5)

for ep in endpoints:
    url = f"{API_BASE}/{ep}"
    try:
        req = urllib.request.Request(url)
        # Add basic headers likely used by browser
        req.add_header('User-Agent', 'Python-Test-Script')
        
        with urllib.request.urlopen(req) as response:
            code = response.getcode()
            data = response.read()
            json_data = json.loads(data)
            
            status = "✅ OK" if code == 200 and json_data.get('success') else "❌ FAIL"
            count_info = ""
            if json_data.get('success'):
                # Try to find the list keys
                keys = [k for k in json_data.keys() if k != 'success']
                for k in keys:
                    if isinstance(json_data[k], list):
                        count_info = f"Count: {len(json_data[k])}"
                        break
            
            print(f"{ep.ljust(15)} : {code} | {status} | {count_info}")
            
    except urllib.error.URLError as e:
        print(f"{ep.ljust(15)} : ERROR {e}")
    except Exception as e:
        print(f"{ep.ljust(15)} : EXCEPTION {e}")

