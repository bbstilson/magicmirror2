import Widget from '../../models/Widget.js';
import { pluck } from '../../utils/utils.js';

import './Compliments.css';

import React, { Component } from 'react';

const compliments = [
  "You could open that jar of mayonnaise using only 3 fingers.",
  "Strangers all wanna sit next to you on the bus.",
  "Coworkers fantasizes about getting stuck in the elevator with you.",
  "If Einstein could meet you, he'd be \"mildly to moderately\" intimidated.",
  "At least two friends are going to name their child and/or goldfish after you.",
  "socks + sandals + you = I'm into it.",
  "You are freakishly good at thumb wars.",
  "A 3rd tier cable network would totally create a television show about you.",
  "The FBI tapped your phone just to hear the sound of your voice.",
  "You remind everyone of kiwis- delicious and surprisingly fuzzy.",
  "You never forget to fill the ice-cube tray.",
  "People enjoy you accidentally touching their butt while putting on your seat-belt.",
  "I’d give you the last piece of my gum even if I’d just ate garlic.",
  "There was a high school rumor that you are a distant relative of Abraham Lincoln.",
  "You could make up a weird religion or diet and everyone would follow it.",
  "Your siblings are pissed that your photo is the star of your parent's mantle.",
  "Everyone at sleepovers thought you were the bravest during thunderstorms.",
  "A doctor once saw your butt through the hospital gown. They approve!",
  "Someone almost got a tattoo of your name once, but their mom talked them out of it.",
  "You are your parent's greatest accomplishment, unless they invented the \"spork\".",
  "Some dudes hope you start a band so they can start a cover band of that band.",
  "Your principal would call you to the office just to look cool.",
  "Your allergies are some of the least embarrassing allergies.",
  "Your handshake conveys intelligence, confidence and minor claminess.",
  "Cops admire your ability to stay a perfect 3-5 miles above the speed limit.",
  "You rarely have to go to the bathroom when you fly in the window seat.",
  "Your roommate wants a lock of your hair but is afraid to ask.",
  "Cockroaches, mice and other pests avoid your place out of respect.",
  "Callers are intimidated by how funny your voicemail greeting is.",
  "Kids think you are the “cool old person”.",
  "People always think your jeggings are regular jeans.",
  "80% of motorcycle gangs think you’d be a delightful sidecar.",
  "Everyone at the laundromat thinks you have the cutest underwear.",
  "People behind you at movies think you are the perfect height.",
  "Your parents argue over which one of them you look like.",
  "Sushi chefs are wowed by your chopstick dexterity.",
  "You want the best for everyone...except Gary.",
  "Hello, beauty!",
  "You look sexy!",
  "Looking good today!",
  "Wow, you look hot!",
  "You look nice!",
  "Hi, sexy!"
];

export const ComplimentsWidget = new Widget(
  "Compliments",
  "Displays a random compliment 😊",
  { width: 1.1, height: 15, square: false }
);

const FIVE_MINUTES = (1000 * 60 * 5);

type Props = {};
type State = {|
  compliment: string
|};

export default class Compliments extends Component<Props, State> {
  complimentInterval: IntervalID;

  state = {
    compliment: pluck(compliments)
  };

  componentDidMount() {
    // Set up the timer.
    this.complimentInterval = setInterval(() => {
      this.setState({
        compliment: pluck(compliments)
      });
    }, FIVE_MINUTES);
  }

  componentWillUnmount() {
    clearInterval(this.complimentInterval);
  }

  render() {
    return (
      <div className="compliments__container">
        <p className="compliments__text">{this.state.compliment}</p>
      </div>
    );
  }
}
