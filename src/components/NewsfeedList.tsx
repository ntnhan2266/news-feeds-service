import React from "react";

import * as NewsfeedService from "../services/newsfeed";
import Newsfeed from "../models/Newsfeed";
import NewsfeedItem from "./NewsfeedItem";

export interface NewsfeedListProps {}

export interface NewsfeedListState {
  newsfeeds: Array<Newsfeed>;
  totalResults: number;
  isLoading: boolean;
}

export class NewsfeedList extends React.Component<
  NewsfeedListProps,
  NewsfeedListState
> {
  constructor(props?: NewsfeedListProps, context?: any) {
    super(props, context);

    this.state = {
      newsfeeds: [],
      totalResults: 0,
      isLoading: true
    };
  }

  componentDidMount() {
    this.getNewsfeeds();
  }

  getNewsfeeds = async () => {
    const res = await NewsfeedService.list();
    if (res.data && res.data.status === "ok") {
      this.setState({
        newsfeeds: res.data.articles,
        totalResults: res.data.totalResults,
        isLoading: false
      });
    }
  };

  render() {
    return (
      <section className="newsfeed-list">
        <div className="row">
          <div className="col-lg-12 col-md-12">
            {this.state.newsfeeds.map((item, index) => {
              return <NewsfeedItem data={item} key={index} />;
            })}
          </div>
        </div>
        
      </section>
    );
  }
}

export default NewsfeedList;
