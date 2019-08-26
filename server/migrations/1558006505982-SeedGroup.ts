import { MigrationInterface, QueryRunner } from 'typeorm'
import { getRepository } from 'typeorm'
import { Domain } from '@things-factory/shell'
import { Group } from '@things-factory/board-service'

const SEED_GROUP = [
  {
    id: 'fffe0fb6-90ed-4405-ae5a-43e0ee7e12ec',
    name: 'DASHBOARD',
    description: 'Dashboard'
  },
  {
    id: 'dbb0f731-dd06-4e70-8e7d-742adbfac5ee',
    name: 'LABEL',
    description: 'LABEL'
  },
  {
    id: '10667d11-9b95-47c9-bd0f-788cd161c9a5',
    name: 'WAREHOUSE',
    description: 'WAREHOUSE'
  },
  {
    id: 'c385e355-6dfe-4386-a0cc-a7bbaa0e16f7',
    name: 'LOGISTICS',
    description: 'LOGISTICS'
  }
]

export class SeedGroup1558006505982 implements MigrationInterface {
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
