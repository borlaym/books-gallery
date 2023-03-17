import React, { useCallback, useState } from 'react';
import Tile from './components/Tile';
import data from './data.json'
import { Book } from './types';
import styled from '@emotion/styled'
import logo from './logo.png'

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: center;
`

const Search = styled.input`
  width: 300px;
  padding: 5px;
  display: block;
  margin: 30px auto;
  font-size: 20px;
  outline: none;
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

const Logo = styled.img`
  max-height: 200px;
  max-width: 90%;
  margin: 10px auto;
  display: block;
`

const Description = styled.p`
  text-align: center;
  max-width: 400px;
  margin: 10px auto;
`

const SectionHeader = styled.h3`
  text-align: center;
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

    const sections = dataToShow.reduce<{
      [key: string]: Book[]
    }>((acc, item: Book) => {
      if (item.system === "D&D 5e") {
        return {
          ...acc,
          dnd5e: [...acc.dnd5e, item]
        }
      }
      if (item.system === "Call of Cthulhu") {
        return {
          ...acc,
          coc: [...acc.coc, item]
        }
      }
      if (item.system === "Kult") {
        return {
          ...acc,
          kult: [...acc.kult, item]
        }
      }
      if (item.system === "OSR") {
        return {
          ...acc,
          osr: [...acc.osr, item]
        }
      }
      if (item.system === "Old School Essentials") {
        return {
          ...acc,
          ose: [...acc.ose, item]
        }
      }
      if (item.system === "Régebbi D&D") {
        return {
          ...acc,
          olderDnD: [...acc.olderDnD, item]
        }
      }
      return {
        ...acc,
        other: [...acc.other, item]
      }
    }, {
      dnd5e: [],
      coc: [],
      ose: [],
      osr: [],
      kult: [],
      olderDnD: [],
      other: []
    })

  const titleMapping: { [key: string]: string } = {
    dnd5e: "D&D 5e",
    coc: "Call of Cthulhu",
    ose: "Old School Essentials",
    osr: "Old School RPG",
    kult: "Kult",
    olderDnD: "Régebbi D&D",
    other: "Egyéb"
  }

  return (
    <div>
      <Logo src={logo} />
      <Description>Itt megtalálod klubunk könyv gyűjteményét! A lista folyamatosan bővül, a friss érkezésekért kövesd <a href="https://www.facebook.com/vas.es.varazs">facebook oldalunkat</a>!</Description>
      <Search type="search" value={query} onChange={handleInputChange} placeholder="Keresés..." />

        {Object.keys(sections).map((sectionKey: string) => (
          sections[sectionKey].length > 0 ?
          <>
            <SectionHeader>{titleMapping[sectionKey]}</SectionHeader>
            <Container>
              {sections[sectionKey].map((item: Book) => (
                <Tile
                  mini={item}
                  key={item.fileName}
                  onClick={handleTileClick}
                />
              ))}
            </Container>

          </> : null
        ))}
      {fullImage && (
        <FullImage onClick={handleCancel}>
          <img src={`https://res.cloudinary.com/adventcalendar/image/upload/books/${fullImage.fileName}`} alt={fullImage.fileName} />
        </FullImage>
      )}
    </div>

  );
}

export default App;
