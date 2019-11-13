import { MigrationInterface, QueryRunner, getRepository } from 'typeorm'
import { Domain } from '@things-factory/shell'
import { User } from '@things-factory/auth-base'

const SEED_DOMAINS = [
  {
    name: 'DEMO',
    subdomain: 'demo',
    systemFlag: false
  }
]

export class SeedDemoDomain1558006504001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const domainRepository = getRepository(Domain)
    const userRepository = getRepository(User)

    try {
      var domains = await Promise.all(
        SEED_DOMAINS.map(
          async domain =>
            await domainRepository.save({
              ...domain
            })
        )
      )

      var user: User = await userRepository.findOne({ where: { email: 'admin@hatiolab.com' }, relations: ['domains'] })
      user.domains = user.domains.concat(domains)
      userRepository.save(user)
    } catch (e) {
      console.error(e)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(Domain)

    SEED_DOMAINS.reverse().forEach(async domain => {
      let recode = await repository.findOne({ name: domain.name })
      await repository.remove(recode)
    })
  }
}
