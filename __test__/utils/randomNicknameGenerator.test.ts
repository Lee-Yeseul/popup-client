import {
  randomNicknameGenerator,
  positiveAdjectives,
  animals,
} from '@/app/src/util/randomNicknameGenerator'

describe('randomNicknameGenerator', () => {
  it('nickname이 형용사와 명사로 구분되어 만들어지는가', () => {
    const nickname = randomNicknameGenerator()

    const [adjective, animal] = nickname.split(' ')

    expect(positiveAdjectives).toContain(adjective)
    expect(animals).toContain(animal)
  })

  it('닉네임 생성시 다른 이름으로 생성되는가', () => {
    const nickname1 = randomNicknameGenerator()
    const nickname2 = randomNicknameGenerator()

    expect(nickname1).not.toBe(nickname2)
  })
})
