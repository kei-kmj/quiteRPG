module.exports = class Brave {
  constructor () {
    this.name = '勇者'
    this.hp = 6
    this.level = 1
    this.offensivePower = 3
  }

  showRemainingHp () {
    console.log(`\n勇者のhp[${Math.max(0, this.hp)}]\n`)
  }

  levelup () {
    this.level += 1
    // 勇者のhpを回復させる
    this.hp = 5
    // 勇者のhpとmaxPowerの上昇にレバレッジを効かせ,
    // 魔王に勝てる確率50%程度、ゴーレムに勝つ確率95%程度に設定
    const LEVERAGE = 2
    this.hp *= this.level ** LEVERAGE
    this.offensivePower += this.level ** LEVERAGE
    console.log('勇者のレベルが1上がった')
  }

  death () {
    console.log('\n\n\n...勇者は死んでしまった')
  }
}
