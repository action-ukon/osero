import type { NextPage } from 'next'
import { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  min-height: 100vh;
  padding: 0 0.5rem;
  background-color: green;
`
const Board = styled.div`
  width: 480px;
  height: 480px;
  background-color: white;
`
const Cell = styled.div`
  width: 60px;
  height: 60px;
  border: solid;
  border-color: black;
  float: left;
  border-width: 1px;
  position: relative;
`
const BlackStone = styled.div`
  width: 80%;
  height: 80%;
  border: solid;
  border-color: black;
  background-color: black;
  border-radius: 60px;
  position: absolute;
  top: 10%;
  left: 10%;
`

const WhiteStone = styled.div`
  width: 80%;
  height: 80%;
  border: solid;
  border-color: black;
  background-color: white;
  border-radius: 60px;
  position: absolute;
  top: 10%;
  left: 10%;
`

const Home: NextPage = () => {
  //prettier-ignore
  const [board, setBoard] = useState ([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ])
  // 1:黒 2:白
  const [turn, setTurn] = useState(1)

  const onClick = (x: number, y: number, color: number) => {
    if (color !== 0) return
    const newBoard = JSON.parse(JSON.stringify(board))
    newBoard[y][x] = turn
    // setTurn(3 - turn)

    //8方向色変化ムーブ////////////////
    type Cell = { x: number; y: number }
    const turnables: Cell[] = []
    const directions = [
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
      [-1, -1],
      [-1, 0],
      [-1, 1], // 時計回り0時の方向スタート
    ]
    // ベクトル決め
    for (let i = 0; i < directions.length; i++) {
      const candidates: Cell[] = []
      for (let n = 1; n < 8; n++) {
        // const targetCell = { x, y }
        const becX = n * directions[i][0] + x
        const becY = n * directions[i][1] + y
        if (becX <= 0 || 8 <= becX || becY <= 0 || 8 <= becY || board[becY][becX] === 0) {
          //外れ値
          break
        } else if (newBoard[y][x] !== board[becY][becX]) {
          //違う色
          const becXY = { x: becX, y: becY }
          candidates.push(becXY)
        } else if (newBoard[y][x] === board[becY][becX]) {
          //同じ色
          turnables.push(...candidates)
          break
        }
      }
    }
    if (turnables.length !== 0) {
      // 色変え
      for (let t = 0; turnables.length - t > 0; t++) {
        const turnableX = turnables[t].x
        const turnableY = turnables[t].y
        if (board[turnableY][turnableX] !== 0) {
          newBoard[turnableY][turnableX] = turn
          setBoard(newBoard)
        }
      }
      setTurn(3 - turn)
    }
  }
  return (
    <Container>
      <Board>
        {board.map((row, y) =>
          row.map((color, x) => (
            <Cell key={`${y}-${x}`} onClick={() => onClick(x, y, color)}>
              {color === 1 && <BlackStone />}
              {color === 2 && <WhiteStone />}
            </Cell>
          ))
        )}
      </Board>
    </Container>
  )
}

export default Home
