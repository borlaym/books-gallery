import React, { useCallback } from 'react'
import { Book } from '../types'
import styled from '@emotion/styled'

type Props = {
  mini: Book;
  onClick: (fileName: string) => void;
}

const TileContainer = styled.div`
  width: 200px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;

  @media (max-width: 430px) {
    width: 180px;
    margin: 10px 0;
  }
`

const ImageContainer = styled.div`
  width: 200px;
  height: 200px;


  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: center;

  @media (max-width: 430px) {
    width: 140px;
    height: 140px;

    img {
      height: 140px;
      width: auto;
    }
  }

  img {
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  }
`

const Name = styled.div`
  width: 100%;
  text-align: center;
  padding-bottom: 4px;
  color: rgba(0, 0, 0, 0.7);
  margin-top: 10px;

  @media (max-width: 430px) {
    font-size: 0.8em;
    padding-bottom: 2px;
  }
`

export default function Tile(props: Props) {
  const imgUrl = `https://res.cloudinary.com/adventcalendar/image/upload/w_200,h_200,c_limit/books/${props.mini.fileName}`
  const handleClick = useCallback(() => props.onClick(props.mini.fileName), [])
  return (
    <TileContainer onClick={handleClick}>
      <ImageContainer>
        <img src={imgUrl} loading="lazy" alt={props.mini.name}/>
      </ImageContainer>
      <Name>{props.mini.name}</Name>
    </TileContainer>

  )
}