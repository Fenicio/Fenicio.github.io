import React, { useState } from 'react';
import { Box, Button, SimpleGrid, Text, VStack, HStack, useColorModeValue } from '@chakra-ui/react';

const BOARD_SIZE = 8;
const NUM_BOMBS = 5;

// Cell types
type Cell = {
  isBomb: boolean;
  revealed: boolean;
  adjacent: number;
  flagged: boolean;
};

type Board = Cell[][];

function generateBoard(bombs: number): Board {
  // Create empty board
  let board: Board = Array.from({ length: BOARD_SIZE }, () =>
    Array.from({ length: BOARD_SIZE }, () => ({ isBomb: false, revealed: false, adjacent: 0, flagged: false, bombCount: bombs }))
  );
  // Place bombs
  let bombsPlaced = 0;
  while (bombsPlaced < bombs) {
    const r = Math.floor(Math.random() * BOARD_SIZE);
    const c = Math.floor(Math.random() * BOARD_SIZE);
    if (!board[r][c].isBomb) {
      board[r][c].isBomb = true;
      bombsPlaced++;
    }
  }
  // Calculate adjacent bomb counts
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      if (board[r][c].isBomb) continue;
      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = r + dr, nc = c + dc;
          if (nr >= 0 && nr < BOARD_SIZE && nc >= 0 && nc < BOARD_SIZE && board[nr][nc].isBomb) {
            count++;
          }
        }
      }
      board[r][c].adjacent = count;
    }
  }
  return board;
}

function revealCell(board: Board, r: number, c: number): Board {
  if (board[r][c].revealed || board[r][c].flagged) return board;
  const newBoard = board.map(row => row.map(cell => ({ ...cell })));
  const stack = [[r, c]];
  while (stack.length) {
    const [cr, cc] = stack.pop()!;
    if (newBoard[cr][cc].revealed || newBoard[cr][cc].flagged) continue;
    newBoard[cr][cc].revealed = true;
    if (newBoard[cr][cc].adjacent === 0 && !newBoard[cr][cc].isBomb) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = cr + dr, nc = cc + dc;
          if (
            nr >= 0 && nr < BOARD_SIZE &&
            nc >= 0 && nc < BOARD_SIZE &&
            !(dr === 0 && dc === 0) &&
            !newBoard[nr][nc].revealed &&
            !newBoard[nr][nc].isBomb
          ) {
            stack.push([nr, nc]);
          }
        }
      }
    }
  }
  return newBoard;
}

function revealAllBombs(board: Board): Board {
  return board.map(row =>
    row.map(cell =>
      cell.isBomb ? { ...cell, revealed: true } : cell
    )
  );
}

export default function DistratoMatic() {
  const [bombs, setBombs] = useState(5);
  const [board, setBoard] = useState<Board>(() => generateBoard(bombs));
  const [gameOver, setGameOver] = useState(false);
  
  const [won, setWon] = useState(false);

  const handleCellClick = (r: number, c: number) => {
    if (gameOver || board[r][c].revealed) return;
    if (board[r][c].isBomb) {
      setBoard(revealAllBombs(board));
      setGameOver(true);
      setWon(false);
    } else {
      const newBoard = revealCell(board, r, c);
      setBoard(newBoard);
      // Check win condition: all non-bomb cells revealed
      const allSafeRevealed = newBoard.flat().filter(cell => !cell.isBomb).every(cell => cell.revealed);
      if (allSafeRevealed) {
        setGameOver(true);
        setWon(true);
      }
    }
  };

  const handleRestart = () => {
    if (won) {
      setBombs(bombs + 1);
    } else {
      setBombs(bombs - 1);
    }
    setBoard(generateBoard(bombs));
    setGameOver(false);
    setWon(false);
  };

  const cellBg = useColorModeValue('gray.100', 'gray.700');
  const revealedBg = useColorModeValue('white', 'gray.600');
  const bombColor = useColorModeValue('red.500', 'red.300');

  return (
    <VStack spacing={4} align="center">
      <Text fontSize="xl" fontWeight="bold">Minesweeper</Text>
      <Text fontSize="md">But it gets harder on a victory</Text>
      <SimpleGrid columns={BOARD_SIZE} spacing={1}>
        {board.map((row, r) =>
          row.map((cell, c) => (
            <Button
              key={`${r}-${c}`}
              h={8} w={8}
              p={0}
              fontSize="md"
              bg={cell.revealed ? revealedBg : cellBg}
              color={cell.isBomb && cell.revealed ? bombColor : undefined}
              borderRadius="sm"
              borderWidth={cell.revealed ? '1px' : '2px'}
              borderColor={cell.revealed ? 'gray.300' : 'gray.400'}
              onClick={() => handleCellClick(r, c)}
              disabled={cell.revealed || gameOver}
              _hover={{ bg: cell.revealed ? revealedBg : 'gray.200' }}
            >
              {cell.revealed
                ? cell.isBomb
                  ? '💣'
                  : cell.adjacent > 0
                  ? cell.adjacent
                  : ''
                : ''}
            </Button>
          ))
        )}
      </SimpleGrid>
      <HStack>
        <Button onClick={handleRestart} colorScheme="teal" size="sm">Restart</Button>
        {gameOver && (
          <Text fontWeight="bold" color={won ? 'green.500' : 'red.500'}>
            {won ? 'You Win!' : 'Game Over!'}
          </Text>
        )}
      </HStack>
      <Text fontSize="sm" color="gray.500">Find all safe cells. {bombs} bombs. No flags. Just fun.</Text>
    </VStack>
  );
}