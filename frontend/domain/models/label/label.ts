export class LabelItem {
  constructor(
    readonly id: number,
    readonly text: string,
    readonly prefixKey: string | null,
    readonly suffixKey: string | null,
    readonly backgroundColor: string,
    readonly textColor: string,
    readonly min: number,
    readonly max: number,
    readonly step: number,
    readonly ticks: string
  ) {}

  static create(
    text: string,
    prefixKey: string | null,
    suffixKey: string | null,
    backgroundColor: string,
    textColor: string,
    min: number,
    max: number,
    step: number,
    ticks: string
  ): LabelItem {
    return new LabelItem(
      0,
      text,
      prefixKey,
      suffixKey,
      backgroundColor,
      textColor,
      min,
      max,
      step,
      ticks
    )
  }
}
