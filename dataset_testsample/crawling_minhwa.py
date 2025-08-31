from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from urllib.parse import urlparse, parse_qs, urljoin
import requests, time, os, uuid

# --- 설정값 ---
CHROMEDRIVER_PATH = "/opt/homebrew/bin/chromedriver"  
IMG_ROOT_FOLDER   = "minhwa/"    
IMAGES_PER_QUERY  = 200
SCROLL_ROUNDS     = 14
HEADLESS          = False
# mode = "original" (원본 위주, /imgres → imgurl 파싱)
# mode = "thumbnail" (썸네일 위주, encrypted-tbn0 저장)
MODE = "thumbnail"

# --- 타겟 목록: (저장폴더명, URL) ---
TARGETS = [
    ("민화나비", "https://www.google.com/search?sca_esv=5e51b69b39b86b67&q=%EB%AF%BC%ED%99%94+%EB%82%98%EB%B9%84&udm=2"),
    ("민화꽃",  "https://www.google.com/search?sca_esv=5e51b69b39b86b67&q=%EB%AF%BC%ED%99%94+%EA%BD%83&udm=2"),
    ("화조도",  "https://www.google.com/search?sca_esv=5e51b69b39b86b67&q=%ED%99%94%EC%A1%B0%EB%8F%84+%EB%AF%BC%ED%99%94&udm=2"),
    ("소나무민화","https://www.google.com/search?sca_esv=5e51b69b39b86b67&q=%EC%86%8C%EB%82%98%EB%AC%B4+%EB%AF%BC%ED%99%94&udm=2"),
    ("용민화",  "https://www.google.com/search?sca_esv=5e51b69b39b86b67&q=%EC%9A%A9+%EB%AF%BC%ED%99%94&udm=2"),
    ("민화물고기","https://www.google.com/search?sca_esv=5e51b69b39b86b67&q=%EB%AF%BC%ED%99%94+%EB%AC%BC%EA%B3%A0%EA%B8%B0&udm=2"),
    ("호랑이민화","https://www.google.com/search?sca_esv=5e51b69b39b86b67&q=%ED%98%B8%EB%9E%91%EC%9D%B4+%EB%AF%BC%ED%99%94&udm=2"),
    ("매화민화","https://www.google.com/search?sca_esv=5e51b69b39b86b67&q=%EB%A7%A4%ED%99%94+%EB%AF%BC%ED%99%94&udm=2"),
    ("잉어민화","https://www.google.com/search?sca_esv=5e51b69b39b86b67&q=%EC%9E%89%EC%96%B4+%EB%AF%BC%ED%99%94&udm=2"),
    ("까치민화","https://www.google.com/search?sca_esv=5e51b69b39b86b67&q=%EA%B9%8C%EC%B9%98+%EB%AF%BC%ED%99%94&udm=2"),
    ("학민화",  "https://www.google.com/search?sca_esv=5e51b69b39b86b67&q=%EB%AF%BC%ED%99%94+%ED%95%99&udm=2"),
]

HEADERS = {
    "User-Agent": "Mozilla/5.0",
    "Referer": "https://www.google.com/",
    "Accept": "*/*",
    "Accept-Language": "ko-KR,ko;q=0.9,en;q=0.8",
}

# ---------- 헬퍼 ----------
def ensure_dir(path): os.makedirs(path, exist_ok=True)

def guess_ext(url, resp):
    base = url.split("?")[0].lower()
    ctype = resp.headers.get("Content-Type","").lower()
    if base.endswith(".png") or "image/png" in ctype: return ".png"
    if base.endswith(".webp") or "image/webp" in ctype: return ".webp"
    if base.endswith(".gif") or "image/gif" in ctype:  return ".gif"
    return ".jpg"

# def save_image(url, directory):
#     try:
#         r = requests.get(url, headers=HEADERS, timeout=25)
#         r.raise_for_status()
#         ext = guess_ext(url, r)
#         fname = f"{uuid.uuid4()}{ext}"
#         with open(os.path.join(directory, fname), "wb") as f:
#             f.write(r.content)
#         return True
#     except Exception as e:
#         print(f"   ✗ fail: {e} ({url[:90]}...)")
#         return False

def save_image(url, directory):
    try:
        # 확장자 / URL 기반 필터링: png, webp, gif는 건너뛰기
        low = url.lower()
        if any(ext in low for ext in [".png", ".webp", ".gif"]):
            return False
        if "encrypted-tbn0.gstatic.com" not in url:  # 구글 썸네일 도메인만
            return False

        r = requests.get(url, headers=HEADERS, timeout=25)
        r.raise_for_status()

        # Content-Type 확인
        ctype = r.headers.get("Content-Type", "").lower()
        if "png" in ctype or "webp" in ctype or "gif" in ctype:
            return False  # 서버 응답이 png/webp면 스킵

        # 강제로 jpg로 저장
        fname = f"{uuid.uuid4()}.jpg"
        with open(os.path.join(directory, fname), "wb") as f:
            f.write(r.content)
        return True
    except Exception as e:
        print(f"   ✗ fail: {e} ({url[:90]}...)")
        return False


def extract_imgurl(href):
    """ /imgres?...&imgurl=... 링크에서 imgurl만 파싱 """
    if not href: 
        return None
    abs_href = urljoin("https://www.google.com", href)
    if "/imgres" not in abs_href:
        return None
    qs = parse_qs(urlparse(abs_href).query)
    return qs.get("imgurl", [None])[0]

def _get_thumb_url(elem):
    # 썸네일 URL이 들어갈 수 있는 속성들을 순서대로 시도
    for attr in ("src", "data-src", "data-lzy_src", "data-iurl"):
        v = elem.get_attribute(attr)
        if v and v.startswith("http"):
            return v
    return None

def _progressive_scroll(driver, rounds=20, pause=0.8):
    last_seen = 0
    for i in range(rounds):
        driver.execute_script("window.scrollBy(0, window.innerHeight*0.9);")
        time.sleep(pause)
        thumbs_now = len(driver.find_elements(
            By.CSS_SELECTOR, 'img.YQ4gaf, img[id^="dimg_"], img[jsname="Q4LuWd"], img.rg_i'
        ))
        # 더 로드됐는지 체크하고, 가끔 위로도 올려 lazyload 트리거
        if thumbs_now == last_seen:
            driver.execute_script("window.scrollBy(0, -200);")
            time.sleep(0.3)
        last_seen = thumbs_now

# ---------- 크롤러 ----------
def download_images(folder_name, search_url, num_images, mode="thumbnail"):
    directory = os.path.join(IMG_ROOT_FOLDER, folder_name)
    ensure_dir(directory)

    options = webdriver.ChromeOptions()
    if HEADLESS: options.add_argument("--headless=new")
    options.add_argument("--disable-gpu")
    options.add_argument("--window-size=1600,1400")
    options.add_argument("--lang=ko-KR")
    driver = webdriver.Chrome(service=Service(CHROMEDRIVER_PATH), options=options)

    driver.get(search_url)
    time.sleep(2)

    # 스크롤로 결과 충분히 로드
    for _ in range(SCROLL_ROUNDS):
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(1.0)

    saved, seen = 0, set()

    if mode == "original":
        # /imgres anchor → imgurl
        anchors = driver.find_elements(By.CSS_SELECTOR, 'div.isv-r a[href*="/imgres"]')
        print(f"[{folder_name}] /imgres anchors found: {len(anchors)}")
        for a in anchors:
            if saved >= num_images: break
            href = a.get_attribute("href")
            imgurl = extract_imgurl(href)
            if not imgurl or imgurl in seen: continue
            if save_image(imgurl, directory):
                seen.add(imgurl)
                saved += 1
                if saved % 10 == 0: print(f"   + {saved}/{num_images}")

    elif mode == "thumbnail":
        # 썸네일 <img>
        # (TARGETS URL에 tbm=isch 추가 권장)
        try:
            WebDriverWait(driver, 10).until(
                EC.presence_of_all_elements_located(
                    (By.CSS_SELECTOR, 'img.YQ4gaf, img[id^="dimg_"], img[jsname="Q4LuWd"], img.rg_i')
                )
            )
        except Exception:
            pass
        # 점진 스크롤로 lazy-load 강제
        _progressive_scroll(driver, rounds=24, pause=0.7)
        # udm=2 구조 우선, 그 외 백업 셀렉터도 포함
        thumb_selectors = [
            'img.YQ4gaf',                 # udm=2 핵심
            'img[id^="dimg_"]',           # id가 dimg__... 인 케이스
            'div.isv-r img[jsname="Q4LuWd"]',
            'img.rg_i'
        ]
        thumbs = []
        for sel in thumb_selectors:
            found = driver.find_elements(By.CSS_SELECTOR, sel)
            if found:
                thumbs.extend(found)

        # 중복 제거(같은 요소가 여러 셀렉터에 잡힐 수 있음)
        thumbs = list(dict.fromkeys(thumbs))
        print(f"[{folder_name}] thumbnails found: {len(thumbs)}")

        for t in thumbs:
            if saved >= num_images: break
            url = _get_thumb_url(t)
            if not url or url in seen: 
                continue
            if save_image(url, directory):
                seen.add(url)
                saved += 1
                if saved % 10 == 0:
                    print(f"   + {saved}/{num_images}")

    else:
        print("Invalid mode:", mode)

    print(f"✅ [{folder_name}] saved {saved} images ({mode}) → {directory}")
    driver.quit()

# ---------- 실행 ----------
if __name__ == "__main__":
    for folder, url in TARGETS:
        print(f"\n=== Downloading ({MODE} mode): {folder} ===")
        download_images(folder, url, IMAGES_PER_QUERY, mode=MODE)