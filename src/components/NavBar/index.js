// Write your code here.
import './index.css'

const NavBar = props => {
  const {score, topScore, progressing} = props

  return (
    <div className="head-box">
      <div className="head-sub-box">
        <div className="img-box">
          <img
            className="logo"
            src="https://assets.ccbp.in/frontend/react-js/game-logo-img.png"
            alt="emoji logo"
          />
          <h1 className="logo-title">Emoji Game</h1>
        </div>
        {progressing && (
          <div className="score-box">
            <p className="score">Score: {score}</p>
            <p className="score">Top Score: {topScore}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default NavBar
