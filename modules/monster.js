module.exports = class Monster {
  constructor (name, hp, offensivePower) {
    this.name = name
    this.hp = hp
    this.offensivePower = offensivePower
  }

  appear () {
    console.log(`\n\n${this.name}が現れた！`)
  }

}