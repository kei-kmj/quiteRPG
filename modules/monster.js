module.exports = class Monster {
  constructor (name, hp, offensivePower) {
    this.name = name
    this.hp = hp
    this.offensivePower = offensivePower
  }

  appear () {
    console.log(`\n\n${this.name}が現れた！`)
  }

  attack (monster, damageScore) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('\n\n⚔ ⚔ ⚔ ⚔ ⚔ 勇者の攻撃 ⚔ ⚔ ⚔ ⚔ ⚔')

        if (damageScore === 0) {
          console.log('miss!')
        } else {
          console.log(`${monster.name}に ${damageScore} ポイントのダメージを与えた`)
        }
        monster.hp -= damageScore
        resolve()
      }, 2000)
    })
  }

  calcAttackScore () {
    // offensivePowerに近い乱数の出現頻度を指数関数的に高くする
    return Math.floor((1 - Math.random() * Math.random()) * this.offensivePower)

  }

  isDead () {
    return this.hp <= 0
  }
}