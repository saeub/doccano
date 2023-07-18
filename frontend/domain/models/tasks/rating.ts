export class Rating {
  constructor(
    readonly id: number,
    readonly type: number,
    private _score: number
  ) {}

  get score(): number {
    return this._score
  }

  changeScore(score: number) {
    this._score = score
  }
}
