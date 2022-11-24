/* 
Quick Tip 

- Use the below function in the EmojiGame Component to shuffle the emojisList every time when an emoji is clicked.

const shuffledEmojisList = () => {
  const {emojisList} = this.props
  return emojisList.sort(() => Math.random() - 0.5)
}

*/

// Write your code here.
import {Component} from 'react'

import './index.css'

import NavBar from '../NavBar'

import EmojiCard from '../EmojiCard'

import WinOrLoseCard from '../WinOrLoseCard'

class EmojiGame extends Component {
  state = {isProgress: true, topScore: 0, clickedEmojiList: []}

  finishGameAndPresentTopScore = newScore => {
    const {topScore} = this.state
    let newTopScore = topScore

    if (newScore > topScore) {
      newTopScore = newScore
    }
    this.setState({topScore: newTopScore, isProgress: false, score: newScore})
  }

  onClickEmoji = id => {
    const {emojisList} = this.props
    const {clickedEmojiList} = this.state
    const emojiIsClicked = clickedEmojiList.includes(id)
    const clickedEmojiLength = clickedEmojiList.length

    if (emojiIsClicked) {
      this.finishGameAndPresentTopScore(clickedEmojiLength)

      this.setState({score: 0})
    } else {
      if (clickedEmojiLength === emojisList.length - 1) {
        this.finishGameAndPresentTopScore(emojisList.length)
      }
      this.setState(previousState => ({
        clickedEmojiList: [...previousState.clickedEmojiList, id],
      }))
    }
    console.log(id)
  }

  getShuffledList = () => {
    const {emojisList} = this.props
    return emojisList.sort(() => Math.random() - 0.5)
  }

  renderEmojiList = () => {
    const shuffledList = this.getShuffledList()
    return (
      <ul className="emojisList-container">
        {shuffledList.map(each => (
          <EmojiCard
            key={each.id}
            emojiDetails={each}
            onClickEmoji={this.onClickEmoji}
          />
        ))}
      </ul>
    )
  }

  resetGame = () => {
    this.setState({clickedEmojiList: [], isProgress: true})
  }

  renderScoreCard = () => {
    const {emojisList} = this.props
    const {clickedEmojiList} = this.state
    const isWon = clickedEmojiList.length === emojisList.length

    return (
      <WinOrLoseCard
        isWon={isWon}
        score={clickedEmojiList.length}
        onClickPlayAgain={this.resetGame}
      />
    )
  }

  render() {
    const {isProgress, clickedEmojiList, topScore} = this.state
    return (
      <div className="main-container">
        <div className="content-container">
          <NavBar
            score={clickedEmojiList.length}
            topScore={topScore}
            progressing={isProgress}
          />
          <div className="emoji-box">
            {isProgress ? this.renderEmojiList() : this.renderScoreCard()}
          </div>
        </div>
      </div>
    )
  }
}

export default EmojiGame
