import re

with open('script.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Let's try replacing for English
lang = 'en'
pattern = r'("?' + lang + r'"?\s*:\s*\{[\s\S]*?about_me_para1:\s*)"([^"]*)"([\s\S]*?about_me_para2:\s*)"([^"]*)(\")'
def repl(m):
    return m.group(1) + "REPLACED_1" + '"' + m.group(3) + '"REPLACED_2' + m.group(5)

new_content = re.sub(pattern, repl, content, count=1)
if new_content != content:
    print("Match found and replaced!")
else:
    print("No match found.")
