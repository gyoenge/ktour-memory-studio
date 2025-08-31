# 민화 이미지 크롤링 실행 가이드 (MacOS)

이 프로젝트는 Google 이미지 검색 결과에서 **민화 관련 이미지**를 자동으로 다운로드하는 스크립트입니다.
MacOS 환경에서 실행하기 위해 필요한 설정 및 실행 방법을 설명합니다.

---

## 1. Python 환경 준비

* Python 3.9 이상 권장 (3.11, 3.12도 OK)
* 필요한 라이브러리 설치:

  ```bash
  python3 -m pip install selenium beautifulsoup4 requests
  ```

## 2. Chrome 및 ChromeDriver 설치

### ① Chrome 설치

* 최신 Google Chrome 브라우저가 설치되어 있어야 합니다.
* 크롬 버전 확인: 주소창에 입력 → `chrome://settings/help`

### ② ChromeDriver 설치

* ChromeDriver는 **크롬 브라우저 버전과 일치**해야 합니다.

* Homebrew 설치 권장:

  ```bash
  brew install chromedriver
  ```

* 설치 후 경로 확인:

  ```bash
  which chromedriver
  ```

  예시: `/opt/homebrew/bin/chromedriver`

* **Mac 보안 설정**:

  * 처음 실행 시 *“보안 때문에 열 수 없음”* 메시지가 나올 수 있습니다.
  * `시스템 설정 → 개인정보 보호 및 보안 → 보안 → 열기 허용` 클릭 후 재실행.


## 3. 코드 설정 수정

스크립트 내부에 ChromeDriver 경로를 지정해야 합니다.

예: Homebrew 설치 시

```python
CHROMEDRIVER_PATH = "/opt/homebrew/bin/chromedriver"
```


## 4. 실행 방법

1. 코드 파일 저장 (예: `crawling_minhwa.py`)
2. 실행:

   ```bash
   python3 crawling_minhwa.py
   ```
3. 이미지 저장 경로:

   ```
   ./minhwa/민화나비
   ./minhwa/민화꽃
   ./minhwa/화조도
   ...
   ```


## 5. 주요 옵션

* `IMAGES_PER_QUERY`
  각 주제별 다운로드할 최대 이미지 개수 (예: 200)
* `SCROLL_ROUNDS`
  스크롤 반복 횟수 (많을수록 더 많은 이미지 로드)
* `HEADLESS`
  `True` → 브라우저 창 없이 백그라운드 실행
  `False` → 실제 크롬 창이 뜨면서 진행 (처음엔 False 권장)


## 6. 유의 사항

* 구글 검색 결과는 UI 변경이 잦으므로, 크롤링이 안 될 경우 셀렉터를 업데이트해야 할 수 있습니다.
* 이미지 크롤링은 연구 및 개인 학습 등 **비상업적 용도**로만 사용하세요.
* 대량 요청 시 구글에서 차단될 수 있으므로 `time.sleep` 등으로 속도를 조절하세요.
* 실행 후 Chrome이 열리면, 주기적으로 '이미지 더보기' 버튼을 클릭해줘야할 수 있습니다. 
* 크롤링된 이미지에 노이즈가 있을 수 있습니다. 원하는 이미지들을 필터링하여 사용하세요.

## 7. 예시 결과

다음과 같이 "화조도"에 대한 사진을 크롤링하여 다운로드 할 수 있습니다. 

<img width="494" height="446" alt="image" src="https://github.com/user-attachments/assets/9e337e26-a980-41ab-9bc7-5a89c3f77222" />


