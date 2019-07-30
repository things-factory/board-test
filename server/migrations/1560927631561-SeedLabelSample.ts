import { MigrationInterface, QueryRunner } from 'typeorm'
import { getRepository } from 'typeorm'
import { Domain } from '@things-factory/shell'
import { Board, Group } from '@things-factory/board-base'

const SEED_BOARD = {}
/*
{
  id: '11f767e8-4d72-4bcd-a1b1-cd75f882c7fc',
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
  thumbnail:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAEsCAYAAADtt+XCAAAAAXNSR0IArs4c6QAAEo9JREFUeJzt3Ol2G+d9x/HfMxuGAAmAILWbNkQvclSlVVRnsZMXyuu+0SXwEnQJvASd0xvQJeh1e3rKF4nbJK7LSHaiWrEpx5IoiRsIEjtmpi9IQtxASn8pxzHP93MOJHKe2TCS8NXMAHRZlmUCAOAVed/3DgAAfpgICADAhIAAAEwICADAhIAAAEwICADAhIAAAEwICADAhIAAAEwICADAhIAAAEwICADAhIAAAEwICADA5I0H5NatW5Kkhw8fyjknSYPf93+923Hz7F/X7nnm5+d1584dzc7OamZmZjB+1OO4eY4a3z1WrVblnNPNmzflnNPc3JxqtdrQ53Lc98Oe72HjtVpNzjndvn370HkA4G+JMxAAgAkBAQCYEBAAgAkBAQCYEBAAgAkBAQCYEBAAgAkBAQCYEBAAgAkBAQCYEBAAgAkBAQCYEBAAgAkBAQCYEBAAgAkBAQCYEBAAgAkBAQCYEBAAgAkBAQCYuCzLsu97JwAAPzycgQAATAgIAMCEgAAATAgIAMCEgAAATAgIAMCEgAAATAgIAMCEgAAATAgIAMDkjQfEOTf4emZmRs65wbTdX1+/fv3A2I5yuXxgmXK5fGAdO99fvXr1wNjO1/v3Yfdys7OzQ9e5fz2HPYdhywxbx2Fjc3NzB8Z23L59+8htH/acjtqec07VavXAMkets1qt7ll+97w3btwYuu2bN28eWAbAycIZCADAhIAAAEwICADAhIAAAEwICADAhIAAAEwICADAhIAAAEwICADAhIAAAEwICADAhIAAAEwICADAhIAAAEwICADAhIAAAEwICADAhIAAAEwICADAhIAAAEwICADAhIAAAEwICADAhIAAAEwICADAhIAAAEwICADAhIAAAExclmXZ970TAIAfHs5AAAAmBAQAYEJAAAAmBAQAYEJAAAAmBAQAYEJAAAAmBAQAYEJAAAAmBAQAYEJAAAAmBAQAYPLGA+KcO/R759zgMT8/P/h62DzHrWv3/OVyWTdv3jx0Hccte9z3x63jsN93z7/zuHPnzp7n/SrP+bDx69ev68aNG8c+52HHedh+v+rxOWq/Z2dnj93+ccd59/jMzIyq1epLH6ejti1Jc3Nzmpube+XnBmALZyAAABMCAgAwISAAABMCAgAwISAAABMCAgAwISAAABMCAgAwISAAABMCAgAwISAAABMCAgAwISAAABMCAgAwISAAABMCAgAwISAAABMCAgAwISAAABMCAgAwISAAABMCAgAwISAAABMCAgAwISAAABMCAgAwISAAABMCAgAwISAAABMCAgAwISAAABMCAgAwISAAABMCAgAwISAAABMCAgAwISAAABMCAgAwISAAABOXZVn2fe8EAOCHhzMQAIAJAQEAmBAQAIAJAQEAmBAQAIAJAQEAmBAQAIAJAQEAmBAQAIAJAQEAmLzxgDjnjpzmnBs8Dps2Pz+/Z5ndY/un7d/G7nFJun79+tDtDVv3YfvtnNOdO3eO3Z/jpu2YmZk5sK/7t3fc8dx53Lp166WP13HHcHZ29tjjZTmGh217/z4ctV+3b982P7/9027cuHHo/r3qvr7s35vD1ler1Q7Md/Xq1Zc6bvunVavVQ/989u/L/uUPm/bw4cOh6wEOwxkIAMCEgAAATAgIAMCEgAAATAgIAMCEgAAATAgIAMCEgAAATAgIAMCEgAAATAgIAMCEgAAATAgIAMCEgAAATAgIAMCEgAAATAgIAMCEgAAATAgIAMCEgAAATAgIAMCEgAAATAgIAMCEgAAATAgIAMCEgAAATAgIAMCEgAAATAgIAMCEgAAATAgIAMCEgAAATAgIAMCEgAAATAgIAMCEgAAATAgIAMCEgAAATAgIAMCEgAAATAgIAMCEgAAATAgIAMCEgAAATAgIAMCEgAAATAgIAMCEgAAATAgIAMCEgAAATAgIAMCEgAAATFyWZdn3vRMAgB8ezkAAACYEBABgQkAAACYEBABgQkAAACYEBABgQkAAACYEBABgQkAAACYEBABgQkAAACYEBABg8sYD4pyTc+7Ysfn5+cH3ux+SVKvVho7trGf/OofN9zL78jrrPGreN7m9lx2bn58fuv07d+4M3ZfZ2dmhYzdu3DjyOR13nA6b71XGXnbbw5Z7mbGX/fN7U9s7ahuSdP369aHbm5mZGTp269atoWNzc3NDt/3w4cPX+jfwqsfzVZZ7me0NW//r/Ls6bHuHbePhw4dD1zk3Nzd07NatW8c+h793nIEAAEwICADAhIAAAEwICADAhIAAAEwICADAhIAAAEwICADAhIAAAEwICADAhIAAAEwICADAhIAAAEwICADAhIAAAEwICADAhIAAAEwICADAhIAAAEwICADAhIAAAEwICADAhIAAAEwICADAhIAAAEwICADAhIAAAEwICADAhIAAAEwICADAhIAAAEwICADAhIAAAEwICADAhIAAAEwICADAhIAAAEwICADAhIAAAEwICADAhIAAAEwICADAhIAAAEwICADAhIAAAEwICADAhIAAAEwICADAhIAAAEwICADAhIAAAEwICADAhIAAAEwICADAhIAAAEwICADAhIAAAEwICADAhIAAAEwICADAhIAAAEyC73sHAOBNqd29p9V7X6ixuqp/GS2qnqb6ptvRYr+n1LjOsufr6X/8p9YXFtRpNhQXRlWavqjxf/rHN7rvP0QEBMCJsfanP2l58YkaaaJm2lfJCzQVRtpIE9XTV09IliSaCiOtfPWV1jbr6maZcp2O+p22cpOT8v8GzyHLMjnn3tj60m5Xzvfl/De/twQEwInRXl6RJIXOk+88OUmTvq/3o1jraaLa3XuSpPei3IFl94/V7t5T2uvpfBiq22zIk1POOTlJSbuj7sqqcvte6D3PU5ZlyrJMkrS8vKz79++//P632/rz/fu6WK2qVCodGpIsTbX5l78ompxUVC7LeUffiVj5/WeKz57R6PTFY+d9VQQEwInh+okKXqC8MpX9QE6Sk9M7oae+Mq3+4TNJ0uVcfGDZ/WOrv/9MWZqo6DzlnKfQf/Hi6zunfrst/5CApGk6CMjS0pLu3bsn59xg2n6e5ymT1Ol0lKapnj19qvPnzg1/kmmq2r0vVf7xFYXF4rFR2Pz6Gznf0+jF6pHzWRAQACeG57T1Yi0piiLlL5zXyIULkqTmo8dKWm0lva4K3sHLOb36hiQp73lynq+gOKb47FlN/uSq8pOT6qyuSVkqaSsah15k2heUbq+rzUZje8jJ8zzJOWVpqm63qwcPHsgPAinLdPfuXVUvXtyz/NLSkhYWFtRqtXThrbf09tSUAueUtFpKe709+9Bbr2vz66/VbzYVjY9r7IP35YJAzjkl3a5q839Uv9PRaLWqkXNnD+yrBe/CAnDieL6v0elpTfzi5yr9+IpKP76iiZ//TIWLVXlH3AvItHX/Yey9aU1+8gtVrv1ElY/+WZO/+mTrRfcYTpLv+wqCQEEQ6Nmz5+r3ei/Wn2VSlsn3fdXrdfX7/T3L97pdLS0tqd1u6/nz5/r0009Vq9UkSZ9//rkWFhbU6+1dZkfSbssFgcKxMdX/fF+b3yxI2/d9OouLStNU3dU1LX/6X+qsrAw9I3oVBATAiZIpU1SpaOz9d+WPjGj97heqzf9RfpzT2AfvKyyVlGn4i2dYKqkwfVG9+obaz55pc+Gh/JERjV36QMFY8chls53H9n0Qb9f/8nduju881ut1nT5zRsoypVmm6elphWGoVrutJEn0xZdfanV1VZcuXdK1a9ckSV/+6Uu1Ws1Dtx2MFpR0Omo+WVR3ZUXN775Tth2QcLyi4qVLmvjZT9VZWVHz0eNBXF4Hl7AAnCyZFBTyCkZH1Vle0cZXXylLU+UqFQWjBflxvPUqf9gVnEwKS0X58Yiaf/1OnWfPtfrZZ+qurCoaH1dQyKtXrw+5frUlTVOlSSJJGq9Uti5RaevMxDmnNE3lPE9pkigKw+3tZorjWO12e7Ce+vq6giBQsVjU2NiY4lxO9Y26ku1177d+7wt1Vlc19t57SptNZf0X80Wl4vYxKcgLAmW7zopeBwEBcLI4bd3raHeUm5hQYfqilKbKnZpU2u4o7XaPDkC3Jzmn/NRbaj15oiCfV1AqKu32tv5Hf9ytg12XhoLAH7yTaucdWntn3Tqf8TxPi4uLGhsbG4xNT0/rv3/3Oy0sLKher2t5ZUXvvjutOI61Ian53aPBW3TjM6fV+Pav8kcLCsZGlbTb8kZGBtvb+OqB4nPn1FpcVNLpKHf6tJZ+81u5INSpX378Kkd3DwIC4MTprK6p9fiJ4tOn9nzgr/X4sXrr9eENcFJ3ZVW9tTWNVqsKSyWd+ewPylUqWvnd79VdWztyu9m+y0KjhVGdOX1akpQkiTzPk/M8ZWmqOI7l+77SJJHn+3r0+JE+vPShzp45oziOdfbsWSVJoidPnujRo0f64P33dfnyZcVxrNzpU0o6HbWePpMkBYWCSlf+QRtff6P6g78oPntWXrz1duTc6VPKVSraePBA/c2GTv3yE42cPavGwsJrX8YiIABOFCentNfV+hdfqLu6opG33pIktR490vq7Hyjt9zTsNMJJSrodrf7P51r9/HMVqlX1m00t/+a32vhmYfudT8NPQfZfXpqamtLHH388uCeS7nrBPnPmjEZGRrYueaWprv3kmvL5vH79619rZGREQRDoypUrmn53Wlm6dYkrjmM553Tqk4+VpdngbMePYznPaeTCBTnPkxf4W2c2YahTv/pEXhgpabclZQryebkwVOWnH732O7EICICTJ83UbzS08fWCGt892g5DV93NTUmZsiTZvhW+fUkp02BalqTq1ta1+r/zWv/zfT39t39X/dpHSrrdrctR3su/6EZRtOey1P4xb9dnOIrFoiTtmT+KIkVRdGDZYHT08HWWS0Pn9XJ71xMUCsfs/fFc9ibeywUAfwf+79a/yotCFd9+Wy4M5DxffhQp7XUVFArq1jcU5HLqtZryczn5UaSk21WQz6u9sqIgFytN+vLCSEGcU6/RVFAoqPX8uaKxUWX9RPVvv1W/0VTxRx+q8rOPlKtUJG2dfSwtLWlsbExZlimXyyncuUm+LU3TPdGQpI2NDdVqNY2PV1Qo5LW2tqZisSjP8wb3RiYmJgYhqdfryuVyyuVefJo+yzKtr6+rUCgoDMPBvY+dDzA657S6uqrx8fGtd4e9oU+kcwYC4MRwvqf8W2+p/NE1dVbX5JyTnx9R0u4oKpflLS9vvRNpraYgn5c/EitpdxSWS0q3P0OR9nry43jr3VirawpLRSVZqvj0KcVnzqjTbKq3sSAviuQFLwKRpqn6/b5arZacc1paWlaz2VCapnrnnaqyLFWz2VS73db6+rouXLigYrGo58+fq9lsKk1TbWxE2tjY0NOnz5TPj6hUKmlzc1OdTkfnz59XFEXa3NxUo9FQoTCqWm1NnU5Xlcq4nj59pnPnzqpUKmlxcVHtdltBEMg5T1EUqt1uq9FoyvOc0jST73vqdruqVu2fUOdzIABOjNz4uPx8Xv7omFwQSEEgBeHW12EgBb5cEG5PD6Qw3DpTCcOtHzgYBFuPMJCLohfz+74UhPK27x8431M0UZGfHxlsO8ukcrmspaVlNRoN9ft9xXGsyclJffvtt6rV1pUkieI4Vr+fKAxDRVGkXC4nz/NULBbVarXUarXU7XZVqVTU7fa0udlQr9dTr9cbRKrf76vdbqler6tUKun58yV5nlMURUqSRI1GU3Ecq9vtamKiolarrX6/r83NDRWLRXU6bdXr9dc+3pyBADgxxi7/SN3lZfXW1wfTnBv8svU4cAtj19iuaYMfWLJrcr/RkJJEpcuXVXjnbXnBi5fQIPDlebEuXqwqyzJtbm4qSRKVy2WFYaTR0YI2Njbk+4GmpqaUz+fl3NaL/qlTp5TPF+ScN7gHsnMj/eLFqvr9vh4/fqypqSn1ej1NTk6q2WxqcnJSvu9pcnJCYRgqTVMFQaDx8XE5JxUKBcVxrEqlosXFJ7pw4YI2NjZ1/vx5PX78WBMTE691vLkHAuDEyPp99ep1ZWmmtNeVF4byokhZP5E/EqvfaMiLckraLbkwlB+GSns9eXGsXq0mP46VJYlcEMqPc0qaTXlxrO7Kqvz8yOADeNH4uFwUHflj1wefRt/+/Mf+H6i4s2yapoNPpx82vjMtSVL5vqdaraaxsbHBfYz9+3DYetrttrrdrka3b6jv3DMpl8uvdT+EgAAATLgHAgAwISAAABMCAgAwISAAABMCAgAwISAAABMCAgAwISAAABMCAgAwISAAABMCAgAwISAAABMCAgAwISAAAJP/B9I/CiDyV0Y7AAAAAElFTkSuQmCC',
  published: true,
  fit: 'both'
}
*/

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
