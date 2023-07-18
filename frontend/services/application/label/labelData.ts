import { LabelItem } from '~/domain/models/label/label'

export class LabelDTO {
  id: number
  text: string
  prefixKey: string | null
  suffixKey: string | null
  backgroundColor: string
  textColor: string
  min: number
  max: number
  step: number
  ticks: string

  constructor(item: LabelItem) {
    this.id = item.id
    this.text = item.text
    this.prefixKey = item.prefixKey
    this.suffixKey = item.suffixKey
    this.backgroundColor = item.backgroundColor
    this.textColor = item.textColor
    this.min = item.min
    this.max = item.max
    this.step = item.step
    this.ticks = item.ticks
  }
}
