import { MigrationInterface, QueryRunner } from 'typeorm'
import { getRepository } from 'typeorm'
import { Domain } from '@things-factory/shell'
import { Group, Board } from '@things-factory/board-base'

const SEED_BOARD = []

export class Board1558006512362 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(Board)
    const domainRepository = getRepository(Domain)
    const domain = await domainRepository.findOne({ name: 'SYSTEM' })

    const groupRepository = getRepository(Group)
    const group = await groupRepository.findOne({ name: 'SAMPLE' })

    try {
      SEED_BOARD.forEach(async board => {
        await repository.save({
          ...board,
          domain,
          group
        })
      })
    } catch (e) {
      console.error(e)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(Board)

    SEED_BOARD.reverse().forEach(async board => {
      let record = await repository.findOne({ name: board.name })
      await repository.remove(record)
    })
  }
}
