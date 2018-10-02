import Widget from '../../models/Widget.js';

import { EndPoint } from '../../constants/Api.js';

import './NewsFeed.css';

import axios from 'axios';
import Loading from 'react-simple-loading';
import moment from 'moment';
import React, { Component } from 'react';

export const NewsFeedWidget = new Widget(
  "News Feed",
  "Displays news headlines based on an RSS feed.",
  { height: 8, width: 1, square: false }
);

const ONE_HOUR = (60 * 60 * 1000);
const DEFAULT_STATE = {
  loading: true,
  title: '',
  description: '',
  author: '',
  publishedAt: ''
};

type Props = {|
  source: string
|};
type State = {|
  loading: boolean,
  title: string,
  description: string,
  author: string,
  publishedAt: string
|};

export default class NewsFeed extends Component<Props, State> {
  newsInterval: IntervalID;

  static defaultProps = {
    source: 'bbc-news'
  }

  state = DEFAULT_STATE

  fetchArticle = () => {
    this.setState(DEFAULT_STATE);

    axios.get(`${EndPoint.NEWS}/?source=${this.props.source}`)
      .then(({ data }) => {
        const { title, description, author, publishedAt } = data;

        this.setState({
          title,
          description,
          author,
          publishedAt,
          loading: false
        });
      })
      .catch(err => {
        this.setState({
          ...DEFAULT_STATE,
          loading: false
        });
      });
  }

  componentDidMount() {
    this.newsInterval = setInterval(this.fetchArticle, ONE_HOUR);

    this.fetchArticle();
  }

  componentWillUnmount() {
    clearInterval(this.newsInterval);
  }

  render() {
    const { loading, title, description, author, publishedAt } = this.state;

    if (loading) {
      return <Loading color="#fff" stroke="2px" />;
    }

    const nowUTC = moment.utc();
    const modifiedPublishedAt = publishedAt.replace(/[TZ]/g, ' ');
    const since = nowUTC.subtract(modifiedPublishedAt);

    return (
      <div className="news-feed flex--column--center">
        <p className="news-feed__author">{author}, {since.minutes()} minutes ago:</p>
        <p className="news-feed__title">{title}</p>
        <p className="news-feed__description">{description}</p>
      </div>
    );
  }
}