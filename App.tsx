import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

function App() {
  const [board, setBoard] = useState(
    Array(3)
      .fill(0)
      .map(() => Array(3).fill(null)),
  );
  const [currentPlayer, setCurrentPlayer] = useState('X');

  const handlePress = (row: number, col: React.Key | null | undefined) => {
    // @ts-ignore
    if (!board[row][col]) {
      const newBoard = [...board];
      // @ts-ignore
      newBoard[row][col] = currentPlayer;
      setBoard(newBoard);
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const checkForWin = () => {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] &&
        board[i][0] === board[i][1] &&
        board[i][0] === board[i][2]
      ) {
        return board[i][0];
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        board[0][i] &&
        board[0][i] === board[1][i] &&
        board[0][i] === board[2][i]
      ) {
        return board[0][i];
      }
    }

    // Check diagonals
    if (
      board[0][0] &&
      board[0][0] === board[1][1] &&
      board[0][0] === board[2][2]
    ) {
      return board[0][0];
    }
    if (
      board[0][2] &&
      board[0][2] === board[1][1] &&
      board[0][2] === board[2][0]
    ) {
      return board[0][2];
    }

    return null;
  };

  const checkForTie = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (!board[i][j]) {
          return false;
        }
      }
    }
    return true;
  };

  const winner = checkForWin();
  const isTie = checkForTie();

  const resetGame = () => {
    setBoard(
      Array(3)
        .fill(0)
        .map(() => Array(3).fill(null)),
    );
    setCurrentPlayer('X');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.winnerText}>
        {winner
          ? `Player ${winner} wins!`
          : isTie
          ? 'It is a tie!'
          : `Player ${currentPlayer}'s turn`}
      </Text>
      {board.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell: any, colIndex: React.Key | null | undefined) => (
            <TouchableOpacity
              key={colIndex}
              style={styles.cell}
              onPress={() => handlePress(rowIndex, colIndex)}>
              <Text style={styles.cellText}>{cell || ''}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
      {(winner || isTie) && (
        <View>
          <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
            <Text style={styles.resetButtonText}>New Game</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ADD8E6',
  },
  cellText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  resetButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#4682B4',
    borderRadius: 5,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
  },
  winnerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  turnText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default App;
