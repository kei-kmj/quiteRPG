const {Toggle} = require('enquirer')

// 勇者のhpとmaxPowerの上昇にレバレッジを効かせ,
// 魔王に勝てる確率50%程度、ゴーレムに勝つ確率95%程度に設定
const LEVERAGE = 2

function calcAttackScore () {
  // offensivePowerに近い乱数の出現頻度を指数関数的に高くする
  return Math.floor((1 - Math.random() * Math.random()) * this.offensivePower)
}

class Brave {
  constructor () {
    this.name = '勇者'
    this.hp = 6
    this.level = 1
    this.offensivePower = 3
  }

  attack () {
    return calcAttackScore.call(this)
  }

  levelup () {
    this.level += 1
    // 勇者のhpを回復させる
    this.hp = 5
    this.hp *= this.level ** LEVERAGE
    this.offensivePower += this.level ** LEVERAGE
  }
}

class Monster {
  constructor (name, hp, offensivePower) {
    this.name = name
    this.hp = hp
    this.offensivePower = offensivePower
  }

  appear () {
    console.log(`\n\n${this.name}が現れた！`)
  }

  attack () {
    // モンスターは成長しない
    return calcAttackScore.call(this)
  }
}

const brave = new Brave()
const slime = new Monster('スライム', 5, 2)
const golem = new Monster('ゴーレム', 20, 6)
const devil = new Monster('魔王', 50, 13)

console.log('村人：「魔物が村を襲ってきて困っています。」')
const helpOrAbandon = new Toggle({
  message: '勇者様お願いです。魔物を倒して下さい！',
  enabled: '助ける',
  disabled: '見捨てて立ち去る'
})
helpOrAbandon.run()
  .then(async answer => {
    if (answer === true) {
      slime.appear()
      await battle(slime)
      if (slime.hp <= 0) {
        golem.appear()
        await battle(golem)
        if (golem.hp <= 0) {
          devil.appear()
          await battle(devil)
        }
      }
    } else {
      devil.appear()
      // 「見捨てて立ち去る」を選ぶと魔王の攻撃から戦闘開始する
      battle(devil, 1)
    }
  })
  .catch(console.error)

function appear (monster) {
  console.log(`\n\n${monster.name}が現れた！`)
}

function battle (monster, preemptiveFlag = 0) {
  function monsterAttack () {
    return new Promise((resolve) => {
      setTimeout(() => {
        const receivedScore = monster.attack()
        console.log(`\n\n⬟ ⬟ ⬟ ⬟ ⬟ ${monster.name}の攻撃 ⬟ ⬟ ⬟ ⬟ ⬟`)
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

  function braveAttack () {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('\n\n⚔ ⚔ ⚔ ⚔ ⚔ 勇者の攻撃 ⚔ ⚔ ⚔ ⚔ ⚔')
        const givenScore = brave.attack()
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

  return new Promise((resolve) => {
    setTimeout(async () => {
      for (let i = 0; ; i++) {
        // 通常は勇者の攻撃から戦闘が始まる
        if (i % 2 === preemptiveFlag) {
          await braveAttack()
          await showRemainingHp()
          if (monster.hp <= 0) {
            await postWinProcess()
            break
          }
        } else {
          await monsterAttack()
          await showRemainingHp()
          if (brave.hp <= 0) {
            await postDefeatProcess()
            break
          }
        }
      }

      function showRemainingHp () {
        console.log(`\n勇者のhp[${Math.max(0, brave.hp)}]：${monster.name}のhp[${Math.max(0, monster.hp)}]\n`)
      }

      function postWinProcess () {
        console.log(`${monster.name}を倒した\n\n`)
        if (devil.hp <= 0) {
          console.log('村に平和が戻った')
        } else {
          console.log('勇者のレベルが1上がった')
          brave.levelup()
        }
      }

      function postDefeatProcess () {
        console.log('\n\n\n...勇者は死んでしまった')
      }

      resolve()
    }, 2000)
  })
}