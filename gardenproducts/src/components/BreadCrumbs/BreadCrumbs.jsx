import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import './BreadCrumbs.scss'

const BreadCrumbs = () => {
  const location = useLocation()

  let currentLink = ''
  const crumbs = location.pathname
    .split('/')
    .filter((crumb) => crumb !== '')
    .map((crumb) => {
      currentLink += `/${crumb}`

      let displayName
      const isActive = location.pathname === currentLink

      switch (currentLink) {
        case '/categories':
          displayName = 'Categories'
          break
        case '/categories/1':
          displayName = 'Annuals'
          break
        case '/categories/2':
          displayName = 'Nursery'
          break
        case '/categories/3':
          displayName = 'Garden Art'
          break
        case '/categories/4':
          displayName = 'Plant Care'
          break
        case '/categories/5':
          displayName = 'Seasonal'
          break
        case '/products':
          displayName = 'All products'
          break
        case '/products/1':
          displayName = 'Savannah Summer Annual Collection'
          break
        case '/products/2':
          displayName = 'Angelonia angustifolia Archangel™ White'
          break
        case '/products/3':
          displayName = 'Angelonia angustifolia Archangel™ Blue Bicolor'
          break
        case '/products/4':
          displayName = 'Afternoon Tea Annual Collection'
          break
        case '/products/5':
          displayName = 'Angelonia Angelissa™ Rose'
          break
        case '/products/6':
          displayName = 'Lantana camara Landmark™ Rose Sunrise'
          break
        case '/products/7':
          displayName = "Salvia 'Wendy`s Wish'"
          break
        case '/products/8':
          displayName = "Datura metel 'Belle Blanche'"
          break
        case '/products/9':
          displayName = "Amaryllis 'Spartacus' one bulb in nursery pot"
          break
        case '/products/10':
          displayName = "Amaryllis 'Picotee' one bulb in cachepot"
          break
        case '/products/11':
          displayName = "Amaryllis 'Samba' one bulb in ceramic cachepot"
          break
        case '/products/12':
          displayName = "Amaryllis 'Yellow Star' one bulb in woven basket"
          break
        case '/products/13':
          displayName = "Amaryllis 'King Star' one bulb in linen bag"
          break
        case '/products/14':
          displayName = "Amaryllis 'Lion King' one bulb in resin cachepot"
          break
        case '/products/15':
          displayName = "Amaryllis 'Rilona' two nursery pots in woven basket"
          break
        case '/products/16':
          displayName = 'Enchanted Garden Mushroom Trio'
          break
        case '/products/17':
          displayName = 'Cast Stone Acorn Trio'
          break
        case '/products/18':
          displayName = 'Entwined Vine Stone Pumpkin'
          break
        case '/products/19':
          displayName = 'Alpine Birdhouse'
          break
        case '/products/20':
          displayName = 'Artful Apples Quartet'
          break
        case '/products/21':
          displayName = 'Autumn Acorn Quartet'
          break
        case '/products/22':
          displayName = 'Blissful Harvest Potpourri'
          break
        case '/products/23':
          displayName = 'Espoma Organic Potting Mix23'
          break
        case '/products/24':
          displayName = 'Espoma Organic Orchid Mix'
          break
        case '/products/25':
          displayName = 'Espoma Organic Perlite'
          break
        case '/products/26':
          displayName = 'Fox Farm Happy Frog Potting Soil'
          break
        case '/products/27':
          displayName = 'Ocean Forest Potting Soil'
          break
        case '/products/28':
          displayName = 'Hoffman`s Horticultural Charcoal'
          break
        case '/products/29':
          displayName = 'Bonide Diatomaceous Earth'
          break
        case '/products/30':
          displayName = 'Father Christmas with Sack Plant Pot'
          break
        case '/products/31':
          displayName = 'Christmas Pick Up Truck Plant Pot 22cm - Red'
          break
        case '/products/32':
          displayName = 'Ceramic Gold Linen Finish Plant Pot'
          break
        case '/products/33':
          displayName = 'Red & White Ceramic Christmas Pots (Set of 6) 15cm'
          break
        case '/products/34':
          displayName = 'Christmas Double Pine Cone Wreath White-TippedGrey Wreath with Half Pinus Nigra'
          break
        case '/products/35':
          displayName = 'Christmas Wreath Flower Pot Picks - 3 Mixed Designs'
          break
        case '/sales':
          displayName = 'All sales'
          break
        case '/favorites':
          displayName = 'Liked products'
          break
        default:
          displayName = crumb 
      }

      return (
        <div className="breadcrumbs__item" key={crumb}>
          <Link to={currentLink} className={isActive ? 'active' : ''}>
            {displayName}
          </Link>
        </div>
      )
    })

  return (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to="/">Main page</Link>
        </li>
        {crumbs}
      </ul>
    </nav>
  )
}

export default BreadCrumbs
