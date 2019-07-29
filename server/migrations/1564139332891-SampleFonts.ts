import { MigrationInterface, QueryRunner } from 'typeorm'
import { getRepository } from 'typeorm'
import { Domain } from '@things-factory/shell'
import { Font } from '@things-factory/font-base'

const FONTS = [
  {
    id: '5fdac0a1-e264-4c68-a133-df119a13f948',
    name: 'Nanum Gothic',
    provider: 'google',
    uri: 'https://fonts.googleapis.com/css?family=Nanum+Gothic&display=swap',
    active: true
  },
  {
    id: '5c8c413e-c964-499d-92c1-e6c13677a4d8',
    name: 'Noto Sans KR',
    provider: 'google',
    uri: 'https://fonts.google.com/specimen/Noto+Sans+KR',
    active: true
  },
  {
    id: '1eda5e13-347f-4d6a-91d4-f483f855d8ef',
    name: 'Nanum Myeongjo',
    provider: 'google',
    uri: 'https://fonts.google.com/specimen/Nanum+Myeongjo',
    active: true
  },
  {
    id: 'a262ac64-77f0-4e1e-a150-d8421584b804',
    name: 'Nanum Gothic Coding',
    provider: 'google',
    uri: 'https://fonts.google.com/specimen/Nanum+Gothic+Coding',
    active: true
  },
  {
    id: '8eb5a086-5efc-4fcc-ad14-c6cda353689c',
    name: 'Darker Grotesque',
    provider: 'google',
    uri: 'https://fonts.google.com/specimen/Darker+Grotesque',
    active: true
  },
  {
    id: '3905968d-28fe-496f-8834-4c2ca3cc947d',
    name: 'Shadows Into Light',
    provider: 'google',
    uri: 'https://fonts.google.com/specimen/Shadows+Into+Light',
    active: true
  },
  {
    id: 'd1759d48-8c5b-4567-8a4e-bcfa6e0d7bb6',
    name: 'Ubuntu Condensed',
    provider: 'google',
    uri: 'https://fonts.google.com/specimen/Ubuntu+Condensed',
    active: true
  },
  {
    id: '21848dcd-dcc5-4614-be4c-cf79e1a693c2',
    name: 'Gugi',
    provider: 'google',
    uri: 'https://fonts.google.com/specimen/Gugi',
    active: true
  },
  {
    id: 'd385d921-8d95-468e-a66a-99d3674e1bc8',
    name: 'Dokdo',
    provider: 'google',
    uri: 'https://fonts.google.com/specimen/Dokdo',
    active: true
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
