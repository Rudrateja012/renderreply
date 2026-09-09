with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

assert 'id="chk-acc-posts" class="acc-checkbox-styled" checked' in html, "chk-acc-posts not checked in HTML"
assert '<option value="POST" selected>POST</option>' in html, "POST not selected in HTML"

with open('app.js', 'r', encoding='utf-8') as f:
    js = f.read()

assert 'isImage = file.type.startsWith(\'image\') || /\\.(jpg|jpeg|png|webp|gif|bmp|tiff|svg)$/i.test(nameLower)' in js
assert 'isImageExt = /\\.(jpg|jpeg|png|webp|gif|bmp|tiff|svg)$/i.test(nameLower)' in js

print("ALL HTML AND JS VERIFICATIONS PASSED SUCCESSFULLY!")
