import urllib.request
import urllib.error
import re

try:
    print("Fetching URL...")
    urllib.request.urlopen('https://muchatrodol.vercel.app/api/gallery')
    print("Success (Unexpected)")
except urllib.error.HTTPError as e:
    print(f"Got HTTPError: {e.code}")
    content = e.read().decode('utf-8')
    
    # Try to find the exception value
    # Django debug page usually has <pre class="exception_value">Error Message</pre>
    match = re.search(r'<pre class="exception_value">(.*?)</pre>', content, re.DOTALL)
    if match:
        print("EXCEPTION_VALUE:", match.group(1).strip())
    else:
        # Fallback: print title or first h1
        match_title = re.search(r'<title>(.*?)</title>', content)
        if match_title:
            print("PAGE_TITLE:", match_title.group(1))
        
        # Look for "Exception" text
        if "Exception" in content:
            print("Found 'Exception' in content. showing context:")
            start = content.find("Exception")
            print(content[start:start+200])
