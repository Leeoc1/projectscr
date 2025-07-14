import pandas as pd
import re
import numpy as np

# # cp949로 저장 (덮어쓰기)

df = pd.read_csv('front/cinema_data.csv', encoding='utf-8')
# try:
#     df = pd.read_csv('front/cinema_data.csv', encoding='cp949')
# except UnicodeDecodeError:
#     df = pd.read_csv('front/cinema_data.csv', encoding='cp949')

# df.to_csv('front/cinema_data.csv', index=False, encoding='utf-8')

# ---------------------------------------------
# 전처리1 : 영업상태명 컬럼에 취소, 폐업, 휴업이 포함된 row 삭제


# # '영업상태명' 컬럼에 '취소', '폐업', '휴업'이 포함된 row 삭제
# mask = df['영업상태명'].str.contains('취소|폐업|휴업', na=False)
# df = df[~mask]

# 전처리2 : 필요한 컬럼만 남기기
# columns_to_keep = ['소재지전화', '소재지전체주소', '도로명전체주소', '사업장명']
# df = df[columns_to_keep]

# 전처리3 : 컬럼명을 영어로 변경
# rename_dict = {
#     '소재지전화': 'phone',
#     '소재지전체주소': 'address',
#     '도로명전체주소': 'road_address',
#     '사업장명': 'name'
# }
# df = df.rename(columns=rename_dict)

# # 전처리4 : name 컬럼에 메가박스, CGV, 롯데시네마가 포함된 row만 남기기
# mask = df['name'].str.contains('메가박스|CGV|롯데시네마', na=False)
# df = df[mask]

# 전처리5 : name에서 지점명과 관명을 분리하여 name, screen 컬럼으로 나누기
# def extract_name_screen(val):
#     val = str(val)
#     # 1. '점' 또는 '지점' 이후에 관 정보가 나오는 경우 (띄어쓰기/괄호/붙어있음)
#     m = re.match(r'(.+?(점|지점))\s*([^\(\s]+관(\([^)]+\))?)', val)
#     if m:
#         return m.group(1).strip(), m.group(3).strip()
#     # 2. '점' 또는 '지점' 이후에 영어/특수관명 (띄어쓰기/붙어있음)
#     m = re.match(r'(.+?(점|지점))\s*([A-Za-z0-9\s]+관)', val)
#     if m:
#         return m.group(1).strip(), m.group(3).strip()
#     # 3. 관 정보가 괄호 안에만 있는 경우 (ex: CGV연남 3관(Suite Cinema))
#     m = re.match(r'(.+?(점|지점))\s*(.+관\(.*\))', val)
#     if m:
#         return m.group(1).strip(), m.group(3).strip()
#     # 4. 관 정보가 지점명 뒤에 바로 붙어있는 경우 (ex: CGV연남3관, CGV광명역1관)
#     m = re.match(r'(.+?)([0-9A-Za-z가-힣]+관(\([^)]+\))?)$', val)
#     if m:
#         # 붙어있는 경우: 앞부분이 name, 뒷부분이 screen
#         return m.group(1).strip(), m.group(2).strip()
#     # 5. 괄호 안에 관 정보만 있는 경우 (ex: CGV 창원상남(1관), 롯데시네마사천 (제7관))
#     m = re.match(r'(.+?)\s*\(([^)]+관)\)', val)
#     if m:
#         return m.group(1).strip(), m.group(2).strip()
#     # 6. 띄어쓰기로만 구분된 경우 (마지막 단어가 '관'으로 끝나면)
#     m = re.match(r'(.+?)\s+([^\s]+관)$', val)
#     if m:
#         return m.group(1).strip(), m.group(2).strip()
#     # 7. 관 정보가 없는 경우
#     return val.strip(), np.nan

# df[['name', 'screen']] = df['name'].apply(lambda x: pd.Series(extract_name_screen(x)))

# 값이 없는 부분을 null(np.nan)로 채우기
# (공백 문자열, None, NaN 등 모두 np.nan으로 통일)
# df = df.replace(['', ' ', None], np.nan)

# # screen 컬럼에 결측치가 있는 row 삭제
# df = df.dropna(subset=['screen'])
# df = df.dropna(subset=['name'])
# df = df.dropna(subset=['address'])
# df = df.dropna(subset=['road_address'])

# # address에서 시/도(풀네임 포함)를 약칭으로 변환해 region 컬럼 생성

# def extract_region(address):
#     address = str(address)
#     region_map = {
#         '서울': '서울', '서울특별시': '서울',
#         '경기': '경기', '경기도': '경기',
#         '인천': '인천', '인천광역시': '인천',
#         '부산': '부산', '부산광역시': '부산',
#         '대구': '대구', '대구광역시': '대구',
#         '대전': '대전', '대전광역시': '대전',
#         '광주': '광주', '광주광역시': '광주',
#         '울산': '울산', '울산광역시': '울산',
#         '세종': '세종', '세종특별자치시': '세종',
#         '강원': '강원', '강원도': '강원',
#         '충북': '충북', '충청북도': '충북',
#         '충남': '충남', '충청남도': '충남',
#         '전북': '전북', '전라북도': '전북',
#         '전남': '전남', '전라남도': '전남',
#         '경북': '경북', '경상북도': '경북',
#         '경남': '경남', '경상남도': '경남',
#         '제주': '제주', '제주특별자치도': '제주'
#     }
#     for full, short in region_map.items():
#         if address.startswith(full):
#             return short
#     return np.nan

# df['region'] = df['address'].apply(extract_region)

# screen 컬럼에서 특수관 키워드를 추출해 screen_type 컬럼 생성

# def extract_screen_type(screen):
#     if pd.isna(screen):
#         return np.nan
#     screen_types = [
#         '4DX', 'IMAX', 'Dolby Cinema', 'Dolby Atmos', '키즈관', 'Suite', 'Starium', 'Super',
#         '골드클래스', '프리미엄', '컴포트', '씨네드쉐프', 'CINE', 'SCREENX', 'DVA', 'LUX', 'KIDS'
#     ]
#     screen_str = str(screen)
#     for stype in screen_types:
#         if stype.lower() in screen_str.lower():
#             return stype
#     return '2D'

# df['screen_type'] = df['screen'].apply(extract_screen_type)

# screen 컬럼에서 '제'라는 단어 제거
if 'screen' in df.columns:
    df['screen'] = df['screen'].str.replace('제', '', regex=False)

# screen 컬럼에서 괄호와 괄호 안의 내용 모두 제거
if 'screen' in df.columns:
    df['screen'] = df['screen'].str.replace(r'\(.*?\)', '', regex=True).str.strip()


def remove_all_parentheses(text):
    if pd.isna(text):
        return text
    # 반각/전각 괄호 모두 반복적으로 제거
    while re.search(r'[\(（][^\)\）]*[\)）]', text):
        text = re.sub(r'[\(（][^\)\）]*[\)）]', '', text)
    return text.strip()

if 'screen' in df.columns:
    df['screen'] = df['screen'].apply(remove_all_parentheses)


# UTF-8로 덮어써서 저장
df.to_csv('front/cinema_data.csv', index=False, encoding='utf-8')

# # screen 컬럼의 결측치 개수 출력
# print('screen 결측치 개수:', df['screen'].isna().sum())
# print('name 결측치 개수:', df['name'].isna().sum())
# print('address 결측치 개수:', df['address'].isna().sum())
# print('road_address 결측치 개수:', df['road_address'].isna().sum())
# print('region 결측치 개수:', df['region'].isna().sum())






