import { MigrationInterface, QueryRunner } from 'typeorm'
import { getRepository } from 'typeorm'
import { Domain } from '@things-factory/shell'
import { Board, Group } from '@things-factory/board-base'

const SEED_BOARD = {
  name: 'LABEL',
  description: 'sample label 01',
  width: 800,
  height: 600,
  model: JSON.stringify({
    width: 800,
    height: 600,
    components: [
      {
        type: 'barcode',
        symbol: 'code39',
        text: '1234567890',
        left: 40,
        top: 30,
        width: 188,
        height: 41,
        rotation: 0
      },
      {
        type: 'barcode',
        symbol: 'code39',
        text: '1234567890',
        left: 40,
        top: 93,
        width: 268,
        height: 59,
        rotation: 0
      },
      {
        type: 'barcode',
        symbol: 'code39',
        text: '1234567890',
        left: 40,
        top: 177,
        width: 364,
        height: 80,
        rotation: 0
      },
      {
        type: 'barcode',
        symbol: 'code39',
        text: '1234567890',
        left: 40,
        top: 280,
        width: 484,
        height: 106,
        rotation: 0
      },
      {
        type: 'barcode',
        symbol: 'code39',
        text: '1234567890',
        left: 40,
        top: 412,
        width: 670,
        height: 147,
        rotation: 0
      }
    ]
  }),
  thumbnail: `data:image/png;base64,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`,
  published: true,
  fit: 'both'
}

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
