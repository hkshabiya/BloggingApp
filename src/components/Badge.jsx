import { MDBBadge } from 'mdb-react-ui-kit'
import React from 'react'

export const Badge = ( {children,styleInfo}) => {
    const colorKey={
        Fashion:"primary",
        Travel:"success",
        Fitness:"danger",
        Food:"warning",
        Tech:"info",
        Sports:"dark"
    }
  return (
    <h5 style={styleInfo}>
        <MDBBadge color={colorKey[children]}>{children}</MDBBadge>
    </h5>
  )
}
