import React, { useCallback } from 'react'
import { Mini } from '../types'
import styled from '@emotion/styled'

type Props = {
  mini: Mini;
  onClick: (fileName: string) => void;
}

const TileContainer = styled.div`
  width: 200px;
  height: 200px;
  margin: 10px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  position: relative;
  cursor: pointer;

  @media (max-width: 430px) {
    width: 140px;
    height: 140px;

    img {
      width: 140px;
      height: 140px;
    }
  }
`

const Name = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0px;
  left: 0px;
  text-align: center;
  font-weight: bold;
  padding-bottom: 4px;
  color: rgba(0, 0, 0, 0.7);

  @media (max-width: 430px) {
    font-size: 0.8em;
    padding-bottom: 2px;
  }
`

const Count = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  font-weight: bold;
  padding: 10px;
  color: rgba(0, 0, 0, 0.7);
`

export default function Tile(props: Props) {
  const imgUrl = `https://res.cloudinary.com/adventcalendar/image/upload/w_200/miniatures/${props.mini.fileName}`
  const handleClick = useCallback(() => props.onClick(props.mini.fileName), [])
  return (
    <TileContainer onClick={handleClick}>
      <img src={imgUrl} loading="lazy" alt={props.mini.name}/>
      <Name>{props.mini.name}</Name>
      {props.mini.count > 1 && (
        <Count>{props.mini.count}x</Count>
      )}
    </TileContainer>
  )
}