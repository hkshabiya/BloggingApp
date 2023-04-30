import { MDBCard, MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit'
import React from 'react'

export const Category = ({handlecategory,options}) => {
  return (
    <MDBCard style={{width:"18rem", marginTop:"20px"}}>
        <h4>Categories</h4>
        <MDBListGroup flush>
          { options.map((item,index)=>{
           return <MDBListGroupItem key={index} style={{cursor:'pointer'}} onClick={()=>{handlecategory(item)}}> 
              {item}
            </MDBListGroupItem>
          })}
        </MDBListGroup>
    </MDBCard>
  )
}
