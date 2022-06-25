const Brave = require('./brave')
const Monster = require('./monster')

module.exports = class Battle {
  showdown (monster, preemptiveFlag = 0) {
    return new Promise((resolve) => {
      setTimeout(async () => {
        await brave.showRemainingHp()
        for (let i = 0; ; i++) {
          // 通常は勇者の攻撃から戦闘が始まる
          if (i % 2 === preemptiveFlag) {
            await this.#braveAttack(monster)
            if (monster.hp <= 0) {
              await this.#win(monster)
              break
            }
          } else {
            await this.#monsterAttack(monster)
            await brave.showRemainingHp()
            if (brave.hp <= 0) {
              await brave.death()
              break
            }
          }
        }
        resolve()
      }, 2000)
    })
  }

  #braveAttack (monster) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('\n\n⚔ ⚔ ⚔ ⚔ ⚔ 勇者の攻撃 ⚔ ⚔ ⚔ ⚔ ⚔')
        const givenScore = this.#calcAttackScore().call(brave)
        if (givenScore === 0) {
          console.log('miss!')
        } else {
          console.log(`${monster.name}に ${givenScore} のダメージを与えた`)
        }
        monster.hp -= givenScore
        resolve()
      }, 2000)
    })
  }

  #calcAttackScore () {
    return function () {
      // offensivePowerに近い乱数の出現頻度を指数関数的に高くする
      return Math.floor((1 - Math.random() * Math.random()) * this.offensivePower)
    };
  }

  #monsterAttack (monster) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`\n\n⬟ ⬟ ⬟ ⬟ ⬟ ${monster.name}の攻撃 ⬟ ⬟ ⬟ ⬟ ⬟`)
        const receivedScore = this.#calcAttackScore().call(monster)
        // モンスターは成長しない
        if (receivedScore === 0) {
          console.log('miss!')
        } else {
          console.log(`勇者は ${receivedScore} のダメージを受けた`)
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