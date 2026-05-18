import re

with open('script.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Find window.translations
match = re.search(r'window\.translations\s*=\s*\{([\s\S]+?)\};\s*\n', content)
if match:
    trans_obj = match.group(1)
    # Find all keys
    keys = re.findall(r'^\s*([a-zA-Z-]+|\"[a-zA-Z-]+\")\s*:\s*\{', trans_obj, re.MULTILINE)
    print("Found keys in translations object:", keys)
else:
    print("Could not find window.translations")
