import { MigrationInterface, QueryRunner } from 'typeorm'
import { getRepository } from 'typeorm'
import { Domain } from '@things-factory/shell'
import { Board, Group } from '@things-factory/board-base'

const SEED_BOARD = {}

export class SeedLabelSample1560927631561 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(Board)
    const domainRepository = getRepository(Domain)
    const domain = await domainRepository.findOne({ name: 'SYSTEM' })

    const groupRepository = getRepository(Group)
    const group = await groupRepository.findOne({ name: 'SAMPLE' })

    try {
      await repository.save({
        ...SEED_BOARD,
        domain,
        group
      })
    } catch (e) {
      console.error(e)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
