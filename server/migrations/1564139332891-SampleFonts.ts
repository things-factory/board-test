import { MigrationInterface, QueryRunner } from 'typeorm'
import { getRepository } from 'typeorm'
import { Domain } from '@things-factory/shell'
import { Font } from '@things-factory/font-base'

const FONTS = [
  {
    name: 'Nanum Gothic',
    provider: 'google',
    uri: 'https://fonts.googleapis.com/css?family=Nanum+Gothic&display=swap',
    active: 1
  },
  {
    name: 'Noto Sans KR',
    provider: 'google',
    uri: 'https://fonts.google.com/specimen/Noto+Sans+KR',
    active: 1
  },
  {
    name: 'Nanum Myeongjo',
    provider: 'google',
    uri: 'https://fonts.google.com/specimen/Nanum+Myeongjo',
    active: 1
  },
  {
    name: 'Nanum Gothic Coding',
    provider: 'google',
    uri: 'https://fonts.google.com/specimen/Nanum+Gothic+Coding',
    active: 1
  },
  {
    name: 'Darker Grotesque',
    provider: 'google',
    uri: 'https://fonts.google.com/specimen/Darker+Grotesque',
    active: 1
  },
  {
    name: 'Shadows Into Light',
    provider: 'google',
    uri: 'https://fonts.google.com/specimen/Shadows+Into+Light',
    active: 1
  },
  {
    name: 'Ubuntu Condensed',
    provider: 'google',
    uri: 'https://fonts.google.com/specimen/Ubuntu+Condensed',
    active: 1
  },
  {
    name: 'Gugi',
    provider: 'google',
    uri: 'https://fonts.google.com/specimen/Gugi',
    active: 1
  },
  {
    name: 'Dokdo',
    provider: 'google',
    uri: 'https://fonts.google.com/specimen/Dokdo',
    active: 1
  }
]

export class SampleFonts1564139332891 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(Font)
    const domainRepository = getRepository(Domain)
    const domain = await domainRepository.findOne({ name: 'SYSTEM' })

    try {
      FONTS.forEach(async font => {
        Object.defineProperty(font, 'domain', { value: domain })
      })
      await repository.save(FONTS)
    } catch (e) {
      console.error(e)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(Font)

    FONTS.reverse().forEach(async font => {
      let record = await repository.findOne({ name: font.name })

      // TODO remove cascade
      await repository.remove(record)
    })
  }
}
