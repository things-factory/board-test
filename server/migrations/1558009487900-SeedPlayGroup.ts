import { MigrationInterface, QueryRunner } from 'typeorm'
import { getRepository } from 'typeorm'
import { Domain } from '@things-factory/shell'
import { Board, PlayGroup } from '@things-factory/board-base'

const SEED_PLAY_GROUP = [
  {
    name: 'W/H STATUS',
    description: 'Warehouse status board'
  },
  {
    name: 'M/F STATUS',
    description: 'Manufacturing status board'
  },
  {
    name: 'VISUALIZER',
    description: 'Visualizer'
  }
]

export class SeedPlayGroup1558009487900 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(PlayGroup)
    const domainRepository = getRepository(Domain)
    const domain = await domainRepository.findOne({ name: 'SYSTEM' })

    const boardRepository = getRepository(Board)
    const boards = await boardRepository.find()

    try {
      SEED_PLAY_GROUP.forEach(async group => {
        await repository.save({
          ...group,
          domain,
          boards
        })
      })
    } catch (e) {
      console.error(e)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(PlayGroup)

    SEED_PLAY_GROUP.reverse().forEach(async group => {
      let record = await repository.findOne({ name: group.name })

      // TODO remove cascade
      await repository.remove(record)
    })
  }
}
