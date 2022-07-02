module.exports = class Brave {
  constructor () {
    this.name = '勇者'
    this.hp = 5
    this.level = 1
    this.offensivePower = 3
  }

  showRemainingHp () {
    console.log(`\n勇者のHP[${Math.max(0, this.hp)}]\n`)
  }

  calcAttackScore () {
    // offensivePowerに近い乱数の出現頻度を指数関数的に高くする
    return Math.floor((1 - Math.random() * Math.random()) * this.offensivePower)
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
    return new Brave()
  }

  isDead () {
    return this.hp <= 0
  }

  death () {
    console.log('\n\n\n...勇者は死んでしまった')
  }
}
