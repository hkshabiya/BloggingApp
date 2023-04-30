import { MDBCard, MDBListGroup } from 'mdb-react-ui-kit'
import React from 'react'

export const Category = ({handlecategory,options}) => {
  return (
    <MDBCard style={{width:"18rem", marginTop:"20rem"}}>
        <h4>Categories</h4>
        <MDBListGroup></MDBListGroup>
    </MDBCard>
  )
}
