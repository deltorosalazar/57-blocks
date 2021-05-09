import { FC, ReactNode } from 'react'
import { Card } from '@components'
import styles from './styles.module.scss'
import cx from 'classnames'

type PokemonDetailsProps = ReactNode & {
  id: string,
  data: {
    name: string,
    height: string
    id: string,
    types: Array<{
      type: {
        name: string
      }
    }>,
    weight: string
  }
}

export const PokemonDetails: FC<PokemonDetailsProps> = (props) => {
  const { data, id } = props

  return (
    <div className={styles.pokemonDetails}>
      <div className={styles.imageWrapper}>
        <img
          alt={data.name}
          src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`}
        />
      </div>
      <Card className={styles.detailsWrapper}>
        <h2>#{data.id}</h2>
        <h2>{data.name.toUpperCase()}</h2>
        <h2>Height: <span>{data.height}</span></h2>
        <h2>Weight: <span>{data.weight}</span></h2>
        <div className={styles.typesWrapper}>
          {data.types.length > 0 && data.types.map((type, index) => {
            return (
              <div className={cx(styles.typeWrapper, `${styles[type.type.name]}`)}>
                <h2 className={styles.type} key={index}>{type.type.name}</h2>
              </div>
            )

          })}
        </div>
      </Card>
    </div>
  )
}
