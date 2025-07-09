import React, { useState, useEffect, useRef } from 'react';
import './App.css'; // As requested
import './index.css'; // As requested

// Image imports (ensure these paths are correct in your src/images/ folder)
import logo from './images/logo.png';
import searchIcon from './images/search.jpg'; // Used for search button
import moleImg from './images/mole.jpg';
import hammerImg from './images/hammer.jpg';
import rock from './images/rock.jpg';
import paper from './images/paper.jpg';
import scissors from './images/scissors.jpg';
import tictactoeX from './images/tictactoeX.jpg';
import tictactoeO from './images/tictactoeO.jpg';
import whackamoleLogo from './images/whack-a-mole-logo.jpg';
import rpsLogo from './images/rock-paper-scissor-logo.jpg';
import tictactoeLogo from './images/tictactoe-logo.jpg';
import heroBg from './images/hero-bg.png'; // Used for the main hero background
import login from './images/login.jpg'; // Used for guest avatar
import facebook from './images/facebook.png';
import twitter from './images/twitter.png';
import instagram from './images/instagram.png';
import gamingCharacter from './images/gaming-character.jpg'; // Imported gaming character image
import welcomeImage from './images/welcome.jpg'; // Imported welcome image

const GameHive = () => {
  const [currentGame, setCurrentGame] = useState('home');
  const [showWarning, setShowWarning] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status
  const [showGameAlert, setShowGameAlert] = useState(false);
  const [gameAlertMessage, setGameAlertMessage] = useState('');

  const navigateTo = (game) => {
    // If currently in a game and trying to navigate to another game or home
    if (currentGame !== 'home' && game !== 'home') {
      // If navigating from one game to another, confirm leave first
      setShowWarning(true);
      // You might want to store 'game' here and navigate to it after confirmation
      // For now, 'proceedLeave' always goes to home.
      // A more advanced solution would pass the target 'game' to the modal and
      // update 'proceedLeave' to navigate to that specific game.
    } else if (currentGame !== 'home' && game === 'home') {
      // If navigating from a game directly to home, also confirm
      setShowWarning(true);
    } else {
      // If already on home or navigating to a game from home, no warning needed
      setCurrentGame(game);
    }
  };

  const confirmLeave = () => setShowWarning(true);
  const cancelLeave = () => setShowWarning(false);
  const proceedLeave = () => {
    setCurrentGame('home'); // Always navigate to home after confirming leave
    setShowWarning(false);
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
    setLoginMessage('');
    setUsername('');
    setPassword('');
  };

  const handleCloseLoginModal = () => setShowLoginModal(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Basic client-side validation/mock login
    if (username === 'ayushi' && password === 'password') {
      setIsLoggedIn(true);
      setLoginMessage('Login successful! Welcome to GameHive.');
      setTimeout(() => setShowLoginModal(false), 1500);
    } else {
      setLoginMessage('Invalid username or password. Try "user" / "password".');
    }
  };

  const showCustomGameAlert = (message) => {
    setGameAlertMessage(message);
    setShowGameAlert(true);
  };

  const closeCustomGameAlert = () => {
    setShowGameAlert(false);
    setGameAlertMessage('');
  };

  return (
    <div className="app">
      {/* Hero Background - This will be styled by CSS on the body/html or a wrapper div */}
      {/* The particles and overlay will be handled by CSS */}
      <div className="hero-background">
        <div className="hero-overlay"></div>
        <div className="particles"></div>
      </div>

      {/* Font Awesome for icons */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"></link>

      <div className="container"> {/* Main content wrapper */}
        <header>
          <div className="logo-container">
            <img src={logo} alt="GameHive Logo" className="logo" onClick={() => setCurrentGame('home')} />
            <span className="logo-text">GAMEHIVE</span>
          </div>
          <div className="search-bar">
            <input type="text" placeholder="Search games..." id="search-input" />
            <button id="search-btn"><i className="fas fa-search"></i></button>
          </div>
          <div className="user-section">
            <div className="user-avatar" id="user-avatar" onClick={handleLoginClick}> {/* Click to open login modal */}
              <img src={login} alt="User Avatar" />
            </div>
            <span className="username">Guest</span>
            {/* User dropdown content (can be implemented with state if needed) */}
            {/* For now, clicking avatar opens login modal */}
          </div>
        </header>

        <main>
          {currentGame === 'home' ? (
            <HomePage navigateTo={navigateTo} isLoggedIn={isLoggedIn} />
          ) : currentGame === 'whackamole' ? (
            <WhackAMoleGame backToHome={confirmLeave} showCustomGameAlert={showCustomGameAlert} />
          ) : currentGame === 'rps' ? (
            <RockPaperScissorsGame backToHome={confirmLeave} showCustomGameAlert={showCustomGameAlert} />
          ) : (
            <TicTacToeGame backToHome={confirmLeave} showCustomGameAlert={showCustomGameAlert} />
          )}
        </main>

        <footer>
          <div className="footer-content">
            <div className="social-links">
              <a href="#" className="social-btn twitter" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
              <a href="#" className="social-btn instagram" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
              <a href="#" className="social-btn facebook" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social-btn youtube" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
            </div>
            <div className="footer-links">
              <a href="#">About Us</a>
              <a href="#">Contact</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
            <div className="footer-info">
              <p>&copy; {new Date().getFullYear()} GameHive. All rights reserved.</p>
              <p>Created <i className="fas fa-heart"></i> by Ayushi</p>
            </div>
          </div>
        </footer>
      </div> {/* End .container */}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal">
          <div className="modal-content pop-in">
            <h2>Login to GameHive</h2>
            <form onSubmit={handleLoginSubmit}>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {loginMessage && (
                <p className={`message ${loginMessage.includes('successful') ? 'success' : 'error'}`}>
                  {loginMessage}
                </p>
              )}
              <div className="modal-buttons">
                <button type="submit" className="primary-btn">Login</button>
                <button type="button" onClick={handleCloseLoginModal} className="secondary-btn">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Leave Game Warning Modal */}
      {showWarning && (
        <div className="modal">
          <div className="modal-content pop-in">
            <h2>Leave Game?</h2>
            <p>Your current progress will be lost. Are you sure you want to leave?</p>
            <div className="modal-buttons">
              <button className="secondary-btn" onClick={cancelLeave}>Cancel</button>
              <button className="danger-btn" onClick={proceedLeave}>Leave Game</button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Game Alert Modal */}
      {showGameAlert && (
        <div className="modal">
          <div className="modal-content pop-in">
            <h2>Game Message</h2>
            <p>{gameAlertMessage}</p>
            <div className="modal-buttons">
              <button className="primary-btn" onClick={closeCustomGameAlert}>OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const HomePage = ({ navigateTo, isLoggedIn }) => {
  return (
    <>
      {/* Hero Banner - "Play Awesome Games" */}
      <div className="hero-banner">
        <div className="hero-content">
          <h1>Play Awesome Games Anytime, Anywhere!</h1>
          <p>Join thousands of players in our exciting game collection</p>
          <button className="primary-btn pulse" onClick={() => !isLoggedIn && alert('Please login or sign up to join!')}>Join Now - It's Free!</button>
        </div>
        <div className="hero-image">
          {/* Gaming character image */}
          <img src={gamingCharacter} alt="Gaming character" className="character" />
          <div className="bubbles">
            <div className="bubble" style={{ '--i': 1 }}></div>
            <div className="bubble" style={{ '--i': 2 }}></div>
            <div className="bubble" style={{ '--i': 3 }}></div>
          </div>
        </div>
      </div>

      {/* Welcome Message and Stats */}
      <div className="game-container"> {/* Reusing game-container class for styling */}
        <div className="welcome-message">
          {/* Welcome image */}
          <img src={welcomeImage} alt="Welcome" className="welcome-image" />
          <h2>Welcome to GameHive!</h2>
          <p>Select a game to start playing. Challenge friends and climb the leaderboards!</p>
          <div className="stats">
            <div className="stat-box">
              <i className="fas fa-users"></i>
              <span id="online-count">1,245</span> players online
            </div>
            <div className="stat-box">
              <i className="fas fa-trophy"></i>
              <span id="games-count">3</span> awesome games
            </div>
          </div>
        </div>
      </div>

      {/* Featured Games */}
      <div className="game-section"> {/* Reusing game-section class for styling */}
        <h2 className="section-title"><i className="fas fa-gamepad"></i> Featured Games</h2>
        <div className="game-cards" id="game-cards">
          {/* Game Card for Whack-A-Mole */}
          <div className="game-card" onClick={() => navigateTo('whackamole')}>
            <div className="game-icon">
              <img src={whackamoleLogo} alt="Whack-a-Mole" />
            </div>
            <h4>Whack-a-Mole</h4>
            <p>Test your reflexes and hit the moles!</p>
            <button className="play-btn"><i className="fas fa-play"></i> Play Now</button>
          </div>

          {/* Game Card for Rock Paper Scissors */}
          <div className="game-card" onClick={() => navigateTo('rps')}>
            <div className="game-icon">
              <img src={rpsLogo} alt="Rock Paper Scissors" />
            </div>
            <h4>Rock Paper Scissors</h4>
            <p>Challenge the computer in this classic duel!</p>
            <button className="play-btn"><i className="fas fa-play"></i> Play Now</button>
          </div>

          {/* Game Card for Tic Tac Toe */}
          <div className="game-card" onClick={() => navigateTo('tictactoe')}>
            <div className="game-icon">
              <img src={tictactoeLogo} alt="Tic Tac Toe" />
            </div>
            <h4>Tic Tac Toe</h4>
            <p>A strategic battle of X's and O's!</p>
            <button className="play-btn"><i className="fas fa-play"></i> Play Now</button>
          </div>
        </div>
      </div>
    </>
  );
};

const WhackAMoleGame = ({ backToHome, showCustomGameAlert }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [moles, setMoles] = useState(Array(9).fill(false)); // true if mole is up, false if down
  const [gameActive, setGameActive] = useState(false);
  const [gameMessage, setGameMessage] = useState('Click Start to begin!');
  const [whackedMoleIndex, setWhackedMoleIndex] = useState(null); // Stores index of recently whacked mole for hammer animation

  const moleTimerRef = useRef(null);
  const gameTimerRef = useRef(null);
  const hammerAnimationTimeoutRef = useRef(null); // Ref for hammer animation timeout

  // Audio for whack sound effect
  const whackSoundRef = useRef(null);
  useEffect(() => {
    if (!whackSoundRef.current) {
      whackSoundRef.current = new Audio('/sounds/whack.mp3'); // Ensure whack.mp3 is in your public/sounds/ folder
      whackSoundRef.current.preload = 'auto';
    }
  }, []);

  // Game Timer Effect
  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      gameTimerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(gameTimerRef.current);
  }, [gameActive, timeLeft]);

  // Mole Popping Effect
  useEffect(() => {
    if (gameActive) {
      // Clear any existing mole timer to prevent multiple intervals
      clearInterval(moleTimerRef.current);

      moleTimerRef.current = setInterval(() => {
        // Ensure game is still active before popping a mole
        if (!gameActive) {
          clearInterval(moleTimerRef.current);
          return;
        }

        const emptyMoles = moles.map((isUp, idx) => isUp ? null : idx).filter(idx => idx !== null);
        if (emptyMoles.length === 0) return; // No empty holes to pop a mole

        const randomIndex = emptyMoles[Math.floor(Math.random() * emptyMoles.length)];

        setMoles(prev => {
          const newMoles = [...prev];
          newMoles[randomIndex] = true; // Pop up the mole
          return newMoles;
        });

        // Set a timeout to hide this specific mole after a random duration
        setTimeout(() => {
          setMoles(prev => {
            const newMoles = [...prev];
            if (newMoles[randomIndex]) { // Only hide if it's still up
              newMoles[randomIndex] = false;
            }
            return newMoles;
          });
        }, Math.random() * 800 + 700); // Mole stays up for 0.7 to 1.5 seconds
      }, 1500); // New mole pops up every 1.5 seconds
    } else {
      clearInterval(moleTimerRef.current); // Stop mole popping when game is not active
    }
    return () => clearInterval(moleTimerRef.current);
  }, [gameActive, moles]);

  const startGame = () => {
    // Ensure all timers are cleared before starting a new game
    clearInterval(gameTimerRef.current);
    clearInterval(moleTimerRef.current);
    clearTimeout(hammerAnimationTimeoutRef.current);

    setScore(0);
    setTimeLeft(30);
    setMoles(Array(9).fill(false)); // All moles down
    setGameActive(true);
    setGameMessage('Game started! Whack those moles!');
    setWhackedMoleIndex(null); // Clear any lingering hammer animation

    // Initial mole pop after a short delay
    setTimeout(() => {
      if (gameActive) { // Check if game is still active after delay
        const randomIndex = Math.floor(Math.random() * moles.length);
        setMoles(prev => {
          const newMoles = [...prev];
          newMoles[randomIndex] = true;
          return newMoles;
        });
      }
    }, 500); // First mole pops after 0.5 seconds
  };

  const endGame = () => {
    setGameActive(false);
    clearInterval(moleTimerRef.current);
    clearInterval(gameTimerRef.current);
    clearTimeout(hammerAnimationTimeoutRef.current);
    setMoles(Array(9).fill(false)); // Hide all moles
    setWhackedMoleIndex(null); // Hide hammer
    setGameMessage(`Game over! Final score: ${score}`);
    showCustomGameAlert(`Game over! Your score: ${score}`);
  };

  const whackMole = (index) => {
    if (moles[index] && gameActive) {
      setScore(prev => prev + 1);
      setMoles(prev => {
        const newMoles = [...prev];
        newMoles[index] = false; // Hide the mole immediately
        return newMoles;
      });
      setGameMessage('Nice hit! Keep going!');

      // Trigger hammer animation
      setWhackedMoleIndex(index);
      if (whackSoundRef.current) {
        whackSoundRef.current.currentTime = 0; // Rewind to start
        whackSoundRef.current.play();
      }

      // Clear any existing hammer animation timeout for this spot
      if (hammerAnimationTimeoutRef.current) {
        clearTimeout(hammerAnimationTimeoutRef.current);
      }
      // Hide hammer animation after its duration
      hammerAnimationTimeoutRef.current = setTimeout(() => {
        setWhackedMoleIndex(null);
      }, 500); // Matches hammerSwing animation duration
    }
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      clearInterval(gameTimerRef.current);
      clearInterval(moleTimerRef.current);
      clearTimeout(hammerAnimationTimeoutRef.current);
    };
  }, []);

  return (
    <div className="game-container whackamole-container"> {/* Combined classes */}
      <div className="game-header">
        <h1 className="game-title">Whack-a-Mole</h1>
        <p className="game-message">{gameMessage}</p>
      </div>

      <div className="game-stats">
        <div className="stat-box"> {/* Using stat-box for consistency */}
          <p>Score</p>
          <h3>{score}</h3>
        </div>
        <div className="stat-box"> {/* Using stat-box for consistency */}
          <p>Time Left</p>
          <h3>{timeLeft}s</h3>
        </div>
      </div>

      {/* Moved game-controls outside conditional rendering for consistent button display */}
      <div className="game-controls">
        {!gameActive ? (
          <button className="primary-btn" onClick={startGame}>Start Game</button>
        ) : (
          <button className="danger-btn" onClick={endGame}>Stop Game</button>
        )}
        <button className="secondary-btn" onClick={backToHome}>Back to Home</button>
      </div>

      <div className="mole-grid">
        {moles.map((isUp, index) => (
          <div
            key={index}
            className="mole-hole"
            onClick={() => whackMole(index)}
          >
            {/* Mole image, controlled by 'up' class */}
            <div className={`mole ${isUp ? 'up' : ''}`}>
              <img src={moleImg} alt="Mole" className="mole-img" />
            </div>
            {/* Hammer image, always present but animated when whacked */}
            <img
              src={hammerImg}
              alt="Hammer"
              className={`hammer ${whackedMoleIndex === index ? 'swing' : ''}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const TicTacToeGame = ({ backToHome, showCustomGameAlert }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [playerWins, setPlayerWins] = useState(0);
  const [computerWins, setComputerWins] = useState(0);
  const [ties, setTies] = useState(0);
  const [playerSymbol, setPlayerSymbol] = useState(null); // 'X' or 'O'
  const [gameMessage, setGameMessage] = useState('Choose X or O to start');
  const [gameActive, setGameActive] = useState(false);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true); // True if it's player's turn, false for computer

  // Winner calculation
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]            // diagonals
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  // Computer AI logic
  const makeComputerMove = (currentBoard, compSymbol, humanSymbol) => {
    const emptySpots = currentBoard.map((spot, i) => spot === null ? i : null).filter(i => i !== null);

    if (emptySpots.length === 0) return null;

    // 1. Try to win
    for (let i of emptySpots) {
      const testBoard = [...currentBoard];
      testBoard[i] = compSymbol;
      if (calculateWinner(testBoard) === compSymbol) {
        return i;
      }
    }

    // 2. Block player
    for (let i of emptySpots) {
      const testBoard = [...currentBoard];
      testBoard[i] = humanSymbol;
      if (calculateWinner(testBoard) === humanSymbol) {
        return i;
      }
    }

    // 3. Take center
    if (currentBoard[4] === null) return 4;

    // 4. Take a random corner
    const corners = [0, 2, 6, 8].filter(idx => currentBoard[idx] === null);
    if (corners.length > 0) {
      return corners[Math.floor(Math.random() * corners.length)];
    }

    // 5. Take any available side
    const sides = [1, 3, 5, 7].filter(idx => currentBoard[idx] === null);
    if (sides.length > 0) {
      return sides[Math.floor(Math.random() * sides.length)];
    }

    // Fallback (shouldn't be reached if logic is complete)
    return emptySpots[Math.floor(Math.random() * emptySpots.length)];
  };

  // Handle player move
  const handlePlayerMove = (index) => {
    if (!gameActive || board[index] !== null || !isPlayerTurn) {
      return; // Not active, spot taken, or not player's turn
    }

    const newBoard = [...board];
    newBoard[index] = playerSymbol;
    setBoard(newBoard);
    setIsPlayerTurn(false); // Switch to computer's turn

    const winner = calculateWinner(newBoard);
    if (winner) {
      setGameActive(false);
      if (winner === playerSymbol) {
        setPlayerWins(w => w + 1);
        setGameMessage('You win!');
        showCustomGameAlert('You win!');
      }
      return;
    }

    if (!newBoard.includes(null)) {
      setGameActive(false);
      setTies(t => t + 1);
      setGameMessage("It's a tie!");
      showCustomGameAlert("It's a tie!");
      return;
    }

    // If no winner and not a tie, computer makes a move
    const computerSymbol = playerSymbol === 'X' ? 'O' : 'X';
    setGameMessage(`Computer's turn (${computerSymbol})`);

    setTimeout(() => {
      const computerMoveIndex = makeComputerMove(newBoard, computerSymbol, playerSymbol);
      if (computerMoveIndex !== null) {
        const updatedBoard = [...newBoard];
        updatedBoard[computerMoveIndex] = computerSymbol;
        setBoard(updatedBoard);

        const compWinner = calculateWinner(updatedBoard);
        if (compWinner) {
          setGameActive(false);
          setComputerWins(w => w + 1);
          setGameMessage('Computer wins!');
          showCustomGameAlert('Computer wins!');
        } else if (!updatedBoard.includes(null)) {
          setGameActive(false);
          setTies(t => t + 1);
          setGameMessage("It's a tie!");
          showCustomGameAlert("It's a tie!");
        } else {
          setGameMessage(`Your turn (${playerSymbol})`);
          setIsPlayerTurn(true); // Back to player's turn
        }
      } else {
        // Should ideally not happen if game logic is sound and board is not full
        setGameActive(false);
        setTies(t => t + 1);
        setGameMessage("It's a tie!");
        showCustomGameAlert("It's a tie!");
      }
    }, 500); // Delay for computer's move
  };

  // Start new game (initial symbol selection)
  const startGame = (symbol) => {
    setPlayerSymbol(symbol);
    setBoard(Array(9).fill(null));
    setPlayerWins(0); // Reset scores on new game start
    setComputerWins(0);
    setTies(0);
    setGameActive(true);

    if (symbol === 'O') { // If player chooses O, computer (X) goes first
      setIsPlayerTurn(false);
      setGameMessage("Computer's turn (X)");
      setTimeout(() => {
        const initialComputerMove = makeComputerMove(Array(9).fill(null), 'X', 'O');
        if (initialComputerMove !== null) {
          const initialBoard = Array(9).fill(null);
          initialBoard[initialComputerMove] = 'X';
          setBoard(initialBoard);
          setGameMessage(`Your turn (${symbol})`);
          setIsPlayerTurn(true);
        }
      }, 800);
    } else { // Player chooses X, player goes first
      setIsPlayerTurn(true);
      setGameMessage(`Your turn (${symbol})`);
    }
  };

  // Reset game (keep scores, new round)
  const playAgain = () => {
    setBoard(Array(9).fill(null));
    setGameActive(true);
    // Determine who starts the new round based on who started the previous one
    if (playerSymbol === 'O') { // If player chose O, computer (X) goes first again
      setIsPlayerTurn(false);
      setGameMessage("Computer's turn (X)");
      setTimeout(() => {
        const initialComputerMove = makeComputerMove(Array(9).fill(null), 'X', 'O');
        if (initialComputerMove !== null) {
          const initialBoard = Array(9).fill(null);
          initialBoard[initialComputerMove] = 'X';
          setBoard(initialBoard);
          setGameMessage(`Your turn (${playerSymbol})`);
          setIsPlayerTurn(true);
        }
      }, 800);
    } else { // Player (X) goes first
      setIsPlayerTurn(true);
      setGameMessage(`Your turn (${playerSymbol})`);
    }
  };

  // End game (return to symbol selection)
  const endGame = () => {
    setGameActive(false);
    setPlayerSymbol(null); // Reset symbol choice
    setBoard(Array(9).fill(null));
    setGameMessage('Choose X or O to start');
    setPlayerWins(0);
    setComputerWins(0);
    setTies(0);
    setIsPlayerTurn(true); // Reset turn state
  };


  return (
    <div className="game-container tictactoe-container"> {/* Combined classes */}
      <div className="game-header">
        <h1 className="game-title">Tic Tac Toe</h1>
        <p className="game-message">{gameMessage}</p>
      </div>

      <div className="game-stats">
        <div className="stat-box"> {/* Using stat-box for consistency */}
          <p>You ({playerSymbol ? playerSymbol : '?'})</p>
          <h3>{playerWins}</h3>
        </div>
        <div className="stat-box"> {/* Using stat-box for consistency */}
          <p>Computer ({playerSymbol ? (playerSymbol === 'X' ? 'O' : 'X') : '?'})</p>
          <h3>{computerWins}</h3>
        </div>
        <div className="stat-box"> {/* Using stat-box for consistency */}
          <p>Ties</p>
          <h3>{ties}</h3>
        </div>
      </div>

      {/* Symbol selection or game board */}
      {!gameActive && !playerSymbol ? (
        <div className="symbol-selection">
          <h3>Choose your symbol:</h3>
          <div className="symbol-options">
            <button className="primary-btn" onClick={() => startGame('X')}>
              <img src={tictactoeX} alt="X" /> (X)
            </button>
            <button className="secondary-btn" onClick={() => startGame('O')}>
              <img src={tictactoeO} alt="O" /> (O)
            </button>
          </div>
          {/* Back to Home button for symbol selection screen */}
          <div className="game-controls"> {/* Re-use game-controls for consistent styling */}
            <button className="secondary-btn" onClick={backToHome}>Back to Home</button>
          </div>
        </div>
      ) : (
        <> {/* Fragment to group board and game controls */}
          <div className="tic-tac-toe-board"> {/* Changed class name */}
            {board.map((cell, index) => (
              <div
                key={index}
                className={`tic-tac-toe-cell ${cell ? (cell === 'X' ? 'x' : 'o') : ''}`} /* Added x/o classes */
                onClick={() => handlePlayerMove(index)}
              >
                {/* Removed direct img render here as CSS handles X/O */}
              </div>
            ))}
          </div>

          {/* Game controls for active game or after symbol selection */}
          <div className="game-controls">
            {!gameActive ? ( // Game not active, show Play Again
              <button className="primary-btn" onClick={playAgain}>Play Again</button>
            ) : ( // Game is active, show End Game
              <button className="danger-btn" onClick={endGame}>End Game</button>
            )}
            <button className="secondary-btn" onClick={backToHome}>Back to Home</button>
          </div>
        </>
      )}
    </div>
  );
};

const RockPaperScissorsGame = ({ backToHome, showCustomGameAlert }) => {
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [roundsPlayed, setRoundsPlayed] = useState(0);
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [gameMessage, setGameMessage] = useState('Choose rock, paper, or scissors to start!');
  const [gameActive, setGameActive] = useState(false);

  const choices = ['rock', 'paper', 'scissors'];

  const startGame = () => {
    setPlayerScore(0);
    setComputerScore(0);
    setRoundsPlayed(0);
    setGameActive(true);
    setGameMessage('Game started! Make your choice!');
    setPlayerChoice(null); // Reset choices for new game
    setComputerChoice(null);
  };

  const makeChoice = (choice) => {
    if (!gameActive) {
      showCustomGameAlert('Please start the game first!');
      return;
    }

    setPlayerChoice(choice);
    const computerRandomChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(computerRandomChoice);
    setRoundsPlayed(prev => prev + 1);

    // Determine winner
    let newGameMessage = '';
    if (choice === computerRandomChoice) {
      newGameMessage = "It's a tie!";
    } else if (
      (choice === 'rock' && computerRandomChoice === 'scissors') ||
      (choice === 'paper' && computerRandomChoice === 'rock') ||
      (choice === 'scissors' && computerRandomChoice === 'paper')
    ) {
      setPlayerScore(prev => prev + 1);
      newGameMessage = 'You win this round!';
    } else {
      setComputerScore(prev => prev + 1);
      newGameMessage = 'Computer wins this round!';
    }
    setGameMessage(newGameMessage);
  };

  return (
    <div className="game-container rps-container"> {/* Combined classes */}
      <div className="game-header">
        <h1 className="game-title">Rock Paper Scissors</h1>
        <p className="game-message">{gameMessage}</p>
      </div>

      <div className="game-stats">
        <div className="stat-box"> {/* Using stat-box for consistency */}
          <p>Your Score</p>
          <h3>{playerScore}</h3>
        </div>
        <div className="stat-box"> {/* Using stat-box for consistency */}
          <p>Computer Score</p>
          <h3>{computerScore}</h3>
        </div>
        <div className="stat-box"> {/* Using stat-box for consistency */}
          <p>Rounds Played</p>
          <h3>{roundsPlayed}</h3>
        </div>
      </div>

      {/* RPS Choices - always visible */}
      <div className="rps-choices">
        {choices.map(choice => (
          <div
            key={choice}
            // Use data-choice attribute for CSS background images
            className={`rps-choice`}
            data-choice={choice}
            onClick={() => makeChoice(choice)}
          >
            {/* Images for RPS choices will be handled by CSS background-image */}
            <h3>{choice.charAt(0).toUpperCase() + choice.slice(1)}</h3>
          </div>
        ))}
      </div>

      {playerChoice && computerChoice && (
        <div className="rps-result fade-in">
          <div className="rps-player">
            <h3>Your Choice</h3>
            <div className={`rps-selection`} data-choice={playerChoice}>
              {/* Image handled by CSS */}
            </div>
          </div>
          <div className="vs">VS</div>
          <div className="rps-computer">
            <h3>Computer's Choice</h3>
            <div className={`rps-selection`} data-choice={computerChoice}>
              {/* Image handled by CSS */}
            </div>
          </div>
        </div>
      )}

      {/* Moved game-controls outside conditional rendering for consistent button display */}
      <div className="game-controls">
        {!gameActive ? (
          <button className="primary-btn" onClick={startGame}>Start Game</button>
        ) : (
          <button className="danger-btn" onClick={() => setGameActive(false)}>End Game</button>
        )}
        <button className="secondary-btn" onClick={backToHome}>Back to Home</button>
      </div>
    </div>
  );
};

export default GameHive;
