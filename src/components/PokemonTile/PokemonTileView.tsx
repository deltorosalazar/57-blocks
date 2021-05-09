import { FC } from 'react'
import Link from 'next/link'
import PokemonTileProps from './PokemonTileProps'
import { Star } from 'components/Icons'
import styles from './styles.module.scss'
import cx from 'classnames'

export const PokemonTileView: FC<PokemonTileProps> = (props) => {
  const {
    handleIsFavorite,
    id,
    isFavorite,
    name,
    pictureURL,
    type
  } = props

  return (
    <Link
      href={{
        pathname: '/pokemons/[id]',
        query: { id },
      }}
    >
      <a>
        <div className={styles.pokemonTile}>
          <div
            className={cx(styles.favoriteWrapper, {
              [styles.favorite]: isFavorite
            })}
            onClick={(e) => {
              e.preventDefault()
              handleIsFavorite(id)
            }}
          >
            <Star
              className={styles.icon}
              size={'1.5em'}
            />
          </div>
          <div className={styles.tileWrapper}>
            <div className={styles.pictureWrapper}>
              <img src={pictureURL} alt={`${name}`} />
            </div>

            <div className={styles.infoWrapper}>
              <h2 className={styles.id}># {id}</h2>
              <h1 className={styles.name}>{name}</h1>
              <div className={cx(styles.typeWrapper, `${styles[type]}`)}>
                <h3 className={styles.type}>{type}</h3>
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}
