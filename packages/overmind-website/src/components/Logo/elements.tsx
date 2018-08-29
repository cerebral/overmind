import styled from '../../styled-components'

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: inherit;
  align-items: center;
  justify-content: center;
  font-family: monospace;
  color: #eaeaea;
`

export const Circle = styled.div`
  position: absolute;
  background-color: #eaeaea;
  border-radius: 50%;
  width: 125px;
  height: 125px;
`

export const InnerCircle = styled.div`
  position: absolute;
  background-color: inherit;
  border-radius: 50%;
  width: 100px;
  height: 100px;
`

export const Block = styled.div`
  position: absolute;
  background-color: inherit;
  height: 25px;
  width: 125px;
`

export const Text = styled.div`
  position: absolute;
  text-transform: uppercase;
  letter-spacing: 10px;
  text-indent: 10px;
`

/*

    #inner-circle {

    }

    #text {

    }

    #block {

    }
*/
