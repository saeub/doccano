import { AnnotationApplicationService } from '../annotationApplicationService'
import { RelationDTO } from './relationData'
import { SpanDTO } from './sequenceLabelingData'
import { APISpanRepository } from '@/repositories/tasks/apiSpanRepository'
import { APIRelationRepository } from '@/repositories/tasks/apiRelationRepository'
import { APIRatingRepository } from '@/repositories/tasks/apiRatingRepository'
import { Span } from '@/domain/models/tasks/span'
import { Relation } from '@/domain/models/tasks/relation'
import { Rating } from '@/domain/models/tasks/rating'

export class SequenceLabelingApplicationService extends AnnotationApplicationService<Span> {
  constructor(
    readonly repository: APISpanRepository,
    readonly relationRepository: APIRelationRepository,
    readonly ratingRepository: APIRatingRepository
  ) {
    super(new APISpanRepository())
  }

  public async list(projectId: string, exampleId: number): Promise<SpanDTO[]> {
    const items = await this.repository.list(projectId, exampleId)
    return items.map((item) => new SpanDTO(item))
  }

  public async create(
    projectId: string,
    exampleId: number,
    labelId: number,
    parallelText: number,
    startOffset: number,
    endOffset: number
  ): Promise<void> {
    const item = new Span(0, labelId, 0, parallelText, startOffset, endOffset)
    try {
      await this.repository.create(projectId, exampleId, item)
    } catch (e: any) {
      console.log(e.response.data.detail)
    }
  }

  public async changeLabel(
    projectId: string,
    exampleId: number,
    annotationId: number,
    labelId: number
  ): Promise<void> {
    try {
      const span = await this.repository.find(projectId, exampleId, annotationId)
      span.changeLabel(labelId)
      await this.repository.update(projectId, exampleId, annotationId, span)
    } catch (e: any) {
      console.log(e.response.data.detail)
    }
  }

  public async listRelations(projectId: string, exampleId: number): Promise<RelationDTO[]> {
    const items = await this.relationRepository.list(projectId, exampleId)
    return items.map((item) => new RelationDTO(item))
  }

  public async createRelation(
    projectId: string,
    exampleId: number,
    fromId: number,
    toId: number,
    typeId: number
  ): Promise<void> {
    const relation = new Relation(0, fromId, toId, typeId)
    await this.relationRepository.create(projectId, exampleId, relation)
  }

  public async deleteRelation(
    projectId: string,
    exampleId: number,
    relationId: number
  ): Promise<void> {
    await this.relationRepository.delete(projectId, exampleId, relationId)
  }

  public async updateRelation(
    projectId: string,
    exampleId: number,
    relationId: number,
    typeId: number
  ): Promise<void> {
    const relation = await this.relationRepository.find(projectId, exampleId, relationId)
    relation.changeType(typeId)
    await this.relationRepository.update(projectId, exampleId, relationId, relation)
  }

  public async listRatings(projectId: string, exampleId: number): Promise<Rating[]> {
    const items = await this.ratingRepository.list(projectId, exampleId)
    return items
  }

  public async createRating(
    projectId: string,
    exampleId: number,
    type: number,
    score: number
  ): Promise<void> {
    const rating = new Rating(0, type, score)
    await this.ratingRepository.create(projectId, exampleId, rating)
  }

  public async deleteRating(
    projectId: string,
    exampleId: number,
    ratingId: number
  ): Promise<void> {
    await this.ratingRepository.delete(projectId, exampleId, ratingId)
  }

  public async updateRating(
    projectId: string,
    exampleId: number,
    ratingId: number,
    score: number
  ): Promise<void> {
    const rating = await this.ratingRepository.find(projectId, exampleId, ratingId)
    rating.changeScore(score)
    await this.ratingRepository.update(projectId, exampleId, ratingId, rating)
  }
}
