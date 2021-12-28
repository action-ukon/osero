import type { NextPage } from 'next'
import { useMemo, useState } from 'react'
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
const YellowStone = styled.div`
  width: 100%;
  height: 100%;
  border: solid;
  border-color: yellow;
  background-color: yellow;
`
const putCount = 0
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
  type Cell = { x: number; y: number }
  let pathCountBla = 0
  let pathCountWhi = 0
  const puttableCells: Cell[] = useMemo(() => {
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
    // 配列を全て網羅
    const candidates: Cell[] = []
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        // 注目箇所から八方に
        for (let k = 0; k < directions.length; k++) {
          const turnables: Cell[] = []
          for (let n = 1; n < 8; n++) {
            const becY = n * directions[k][0] + j
            const becX = n * directions[k][1] + i
            // 場外封鎖
            if (becY < 0 || becY > 7 || becX < 0 || becX > 7) {
              break
            }
            // 周りの石ないと封鎖
            if (
              board[becY][becX] === 3 ||
              board[becY][becX] === 0 ||
              (n < 2 && board[becY][becX] === turn)
            ) {
              break
            }
            if (board[becY][becX] !== turn) {
              const becXY = { x: i, y: j }
              turnables.push(becXY)
              // 色変えられるとこあれば
            } else if (
              board[becY][becX] === turn &&
              turnables.length > 0 &&
              (board[j][i] === 0 || board[j][i] === 3)
            ) {
              candidates.push(...turnables)
              break
            }
          }
        }
      }
    }
    return candidates //配列返す
  }, [turn, board])
  //色変えない時パス
  //todoルール正直わからんかった
  if (puttableCells.length < 0) {
    if (turn === 1) {
      pathCountBla += 1
      setTurn(3 - turn)
      alert('黒のパス' + pathCountBla + '回目')
    } else if (turn === 2) {
      pathCountWhi += 1
      setTurn(3 - turn)
      alert('白のパス' + pathCountWhi + '回目')
    }
  }
  // 黄色の3を振る
  for (let t = 0; puttableCells.length - t > 0; t++) {
    const candidatesX = puttableCells[t].x
    const candidatesY = puttableCells[t].y
    board[candidatesY][candidatesX] = 3
  }
  const onClick = (x: number, y: number, color: number) => {
    const newBoard = JSON.parse(JSON.stringify(board))
    if (color !== 0 && color !== 3) return
    newBoard[y][x] = turn

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
        if (
          becX < 0 ||
          8 <= becX ||
          becY < 0 ||
          8 <= becY ||
          board[becY][becX] === 0 ||
          board[becY][becX] === 3
        ) {
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
        if (board[turnableY][turnableX] !== 0 && board[turnableY][turnableX] !== 3) {
          newBoard[turnableY][turnableX] = turn
          // 黄色をリセット
          for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
              if (newBoard[j][i] === 3) {
                newBoard[j][i] = 0
              }
            }
          }
          setBoard(newBoard)
        }
      }
      setTurn(3 - turn)
    }
    console.log('putCount', putCount)
  }

  return (
    <Container>
      <Board>
        {board.map((row, y) =>
          row.map((color, x) => (
            <Cell key={`${y}-${x}`} onClick={() => onClick(x, y, color)}>
              {color === 1 && <BlackStone />}
              {color === 2 && <WhiteStone />}
              {color === 3 && <YellowStone />}
            </Cell>
          ))
        )}
      </Board>
    </Container>
  )
}
export default Home
