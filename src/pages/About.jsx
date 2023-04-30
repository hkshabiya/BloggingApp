import { MDBContainer, MDBTypography } from 'mdb-react-ui-kit'
import React from 'react'

export const About = () => {
  return (
    <div style={{marginTop:"100px"}}>
    <MDBContainer>
      <MDBTypography note noteColor='primary'>
        It is a Blogging website where you will find blog Post
        related to Different category like Travel, Food, Sports, 
        Fitness,Tech and Fashion. 
      </MDBTypography>
    </MDBContainer>
    </div>
  )
}
