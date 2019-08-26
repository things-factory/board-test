import { MigrationInterface, QueryRunner } from 'typeorm'
import { getRepository } from 'typeorm'
import { Domain } from '@things-factory/shell'
import { Group } from '@things-factory/board-service'

const SEED_GROUP = []

export class ManyGroups1561627935961 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(Group)
    const domainRepository = getRepository(Domain)
    const domain = await domainRepository.findOne({ name: 'SYSTEM' })

    try {
      SEED_GROUP.forEach(async group => {
        await repository.save({
          ...group,
          domain
        })
      })
    } catch (e) {
      console.error(e)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(Group)

    SEED_GROUP.reverse().forEach(async group => {
      let record = await repository.findOne({ name: group.name })
      await repository.remove(record)
    })
  }
}
