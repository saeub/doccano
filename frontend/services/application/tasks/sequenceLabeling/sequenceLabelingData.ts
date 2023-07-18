import { Span } from '@/domain/models/tasks/span'

export class SpanDTO {
  id: number
  label: number
  user: number
  parallelText: number
  startOffset: number
  endOffset: number

  constructor(item: Span) {
    this.id = item.id
    this.label = item.label
    this.user = item.user
    this.parallelText = item.parallelText
    this.startOffset = item.startOffset
    this.endOffset = item.endOffset
  }
}
