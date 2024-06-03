export const positiveAdjectives = [
  '슬기로운',
  '밝은',
  '행복한',
  '명랑한',
  '활기찬',
  '유쾌한',
  '감사한',
  '창의적인',
  '낙천적인',
  '따뜻한',
  '멋진',
  '화려한',
  '빛나는',
  '우아한',
  '강렬한',
  '활발한',
  '친절한',
  '긍정적인',
  '매력적인',
  '신비로운',
  '정열적인',
  '아름다운',
  '쾌활한',
  '훈훈한',
  '신나는',
  '귀여운',
  '매혹적인',
  '진실한',
  '우수한',
  '고상한',
  '자유로운',
  '낭만적인',
  '끈질긴',
  '영리한',
  '단호한',
  '성실한',
  '남다른',
  '맑은',
  '꼼꼼한',
  '유능한',
  '관대한',
  '도전적인',
  '자신감 있는',
  '확신에 찬',
  '상냥한',
  '유연한',
  '자주하는',
  '뛰어난',
  '평온한',
  '풍부한',
  '건강한',
  '진취적인',
  '소중한',
  '배려 깊은',
  '심금을 울리는',
  '열정적인',
  '무한한',
  '자비로운',
  '자기 주장이 강한',
  '정직한',
  '인기 있는',
  '다정한',
  '침착한',
  '불굴의',
  '책임감 있는',
  '놀라운',
  '아낌없는',
  '부드러운',
  '섬세한',
  '행복감을 주는',
  '재치 있는',
  '끝없는',
  '품위 있는',
  '용기 있는',
  '도움이 되는',
  '착한',
  '재능 있는',
  '담담한',
  '성공적인',
  '기쁜',
  '영원한',
  '친환경적인',
  '신비로운',
  '귀중한',
  '사려 깊은',
  '반가운',
  '흥미로운',
  '섹시한',
  '혁신적인',
  '활기찬',
]

export const animals = [
  '사자',
  '호랑이',
  '사슴',
  '코끼리',
  '돌고래',
  '펭귄',
  '고양이',
  '강아지',
  '오리',
  '너구리',
  '판다',
  '원숭이',
  '여우',
  '기린',
  '파충류',
  '말',
  '햄스터',
  '토끼',
  '다람쥐',
  '도마뱀',
  '바다코끼리',
  '오소리',
  '오리너구리',
  '앵무새',
  '고슴도치',
  '하마',
  '코뿔소',
  '사막여우',
  '악어',
  '부엉이',
  '하이에나',
  '캥거루',
  '바다거북',
  '카멜레온',
  '바다표범',
  '백조',
  '악어',
  '산양',
  '표범',
  '랫서팬더',
  '알파카',
  '토끼쥐',
  '산토끼',
  '펜귀너구리',
  '개미핥기',
  '새우',
  '오징어',
  '독수리',
  '미어캣',
  '바다표범',
  '바다사자',
  '코알라',
  '갈매기',
  '바다거북',
  '늑대',
  '고양이',
  '어치',
  '강아지',
  '유니콘',
]

export const randomNicknameGenerator = () => {
  const randomPositiveAdjective =
    positiveAdjectives[Math.floor(Math.random() * positiveAdjectives.length)]
  const randomAnimal = animals[Math.floor(Math.random() * animals.length)]
  return `${randomPositiveAdjective} ${randomAnimal}`
}
