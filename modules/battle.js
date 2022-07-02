const Brave = require('./brave')

module.exports = class Battle {
  showdown (monster, preemptiveFlag = 0) {
    return new Promise((resolve) => {
      setTimeout(async () => {
        await brave.showRemainingHp()
        for (let i = 0; ; i++) {
          // 通常は勇者の攻撃から戦闘が始まる
          if (i % 2 === preemptiveFlag) {
            await monster.attack(monster)
            if (monster.isDead(monster)) {
              await this.#win(monster)
              break
            }
          } else {
            await this.#monsterAttack(monster)
            await brave.showRemainingHp()
            if (brave.isDead()) {
              await brave.death()
              break
            }
          }
        }
        resolve()
      }, 2000)
    })
  }

  // #braveAttack (monster) {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       console.log('\n\n⚔ ⚔ ⚔ ⚔ ⚔ 勇者の攻撃 ⚔ ⚔ ⚔ ⚔ ⚔')
  //       const givenScore = brave.calcAttackScore()
  //       console.log(this.level)
  //       console.log(this.offensivePower)
  //       if (givenScore === 0) {
  //         console.log('miss!')
  //       } else {
  //         console.log(`${monster.name}に ${givenScore} ポイントのダメージを与えた`)
  //       }
  //       monster.hp -= givenScore
  //       resolve()
  //     }, 2000)
  //   })
  // }

  #monsterAttack (monster) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`\n\n⬟ ⬟ ⬟ ⬟ ⬟ ${monster.name}の攻撃 ⬟ ⬟ ⬟ ⬟ ⬟`)
        const receivedScore = monster.calcAttackScore()
        // モンスターは成長しない
        if (receivedScore === 0) {
          console.log('miss!')
        } else {
          console.log(`勇者は ${receivedScore} ポイントのダメージを受けた`)
        }
        brave.hp -= receivedScore
        resolve()
      }, 2000)
    })
  }

  #win (monster) {
    console.log(`${monster.name}を倒した\n\n`)
    if (monster.name !== "魔王") {
      brave.levelup()
    }

  }
}
const brave = new Brave()
