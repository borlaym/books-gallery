import React, { useCallback, useState } from 'react';
import Tile from './components/Tile';
import data from './data.json'
import { Book } from './types';
import styled from '@emotion/styled'

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: center;
`

const Search = styled.input`
  width: 300px;
  padding: 10px;
  display: block;
  margin: 30px auto;
  border-radius: 10px;
  font-size: 20px;
`

const FullImage = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);

  img {
    display: block;
    width: auto;
    height: auto;
    max-width: 90%;
    max-height: 90%;
    cursor: pointer;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.2);
  }
`

function App() {
  const [query, setQuery] = useState("")
  const [fullImage, setFullImage] = useState<Book | null>(null)

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }, [])

  const handleTileClick = useCallback((fileName: string) => {
    const mini = data.find(mini => mini.fileName === fileName)
    if (mini) {
      setFullImage(mini)
    }
  }, [])

  const handleCancel = useCallback(() => {
    setFullImage(null)
  }, [])

  const dataToShow = data
    .sort((a, b) => {
      if (a.name === b.name) {
        return a.fileName > b.fileName ? 1 : -1
      }
      return a.name > b.name ? 1 : -1
    })
    .filter(a => a.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <div>
      <Search type="search" value={query} onChange={handleInputChange} placeholder="Search..." />
      <Container>
        {dataToShow.map((mini: Book) => (
          <Tile
            mini={mini}
            key={mini.fileName}
            onClick={handleTileClick}
          />
        ))}
      </Container>
      {fullImage && (
        <FullImage onClick={handleCancel}>
          <img src={`https://res.cloudinary.com/adventcalendar/image/upload/books/${fullImage.fileName}`} alt={fullImage.fileName} />
        </FullImage>
      )}
    </div>

  );
}

export default App;
