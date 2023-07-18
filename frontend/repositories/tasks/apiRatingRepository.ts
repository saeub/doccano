import { AnnotationRepository } from '@/domain/models/tasks/annotationRepository'
import { Rating } from '@/domain/models/tasks/rating'

export class APIRatingRepository extends AnnotationRepository<Rating> {
  labelName = 'ratings'

  toModel(item: { [key: string]: any }): Rating {
    return new Rating(item.id, item.type, item.score)
  }

  toPayload(item: Rating): { [key: string]: any } {
    return {
      id: item.id,
      type: item.type,
      score: item.score
    }
  }
}
