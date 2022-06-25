const Monster = require('./modules/monster')
const Battle = require('./modules/battle')
const {Toggle} = require('enquirer')

class Story {

  progress () {
    console.log('村人：「魔物が村を襲ってきて困っています。」')
    const helpOrAbandon = new Toggle({
      message: '勇者様お願いです。魔物を倒して下さい！',
      enabled: '助ける',
      disabled: '見捨てて立ち去る'
    })
    helpOrAbandon.run()
      .then(async answer => {
        const battle = new Battle()
        if (answer === true) {
          slime.appear()

          await battle.showdown(slime)
          if (slime.hp <= 0) {
            golem.appear()
            await battle.showdown(golem)
            if (golem.hp <= 0) {
              devil.appear()
              await battle.showdown(devil)
            }
          }
        } else {
          devil.appear()
          // 「見捨てて立ち去る」を選ぶと魔王の攻撃から戦闘開始する
          battle.showdown(devil, 1)
        }
      })
      .catch(console.error)
  }
}

//const brave = new Brave()

const story = new Story()
const slime = new Monster('スライム', 5, 2)
const golem = new Monster('ゴーレム', 20, 6)
const devil = new Monster('魔王', 50, 13)

story.progress()

