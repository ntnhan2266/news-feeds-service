import React from "react";
import Moment from "moment";

import Newsfeed from "../models/Newsfeed";

export interface NewsfeedItemProps {
  data: Newsfeed;
}

export interface NewsfeedItemState {}

export class NewsfeedItem extends React.Component<
  NewsfeedItemProps,
  NewsfeedItemState
> {
  constructor(props?: NewsfeedItemProps, context?: any) {
    super(props, context);
  }

  refactorContent(content: string): string {
    if (content) {
      const index = content.indexOf("[+");
      // Remove useless characters like [+99 characters]
      return index > 0 ? content.substring(0, index) : content;
    }
    return "";
  }

  render() {
    const { data } = this.props;
    return (
      <div className="newsfeed-item">
        <div className="row">
          <div className="col-lg-4">
            <a href="#"><div className="newsfeed-thumb" style={{backgroundImage: `url(${data.urlToImage})`}} /></a>
          </div>
          <div className="col-lg-8">
            <a href="#" className="newsfeed-title">{data.title}</a>
            <div className="newsfeed-meta">
              <a href='#' title={data.source} className="newsfeed-source">{data.source}</a>
              <a href='#' title={data.author} className="newsfeed-author">{data.author}</a>
              <span title={Moment(data.publisedAt).format("d MMM YYYY HH:mm")} className="newsfeed-time">
                {Moment(data.publisedAt).format("d MMM YYYY HH:mm")}
              </span>
            </div>
            <p
              className="newsfeed-content"
              dangerouslySetInnerHTML={{
                __html: this.refactorContent(data.content)
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default NewsfeedItem;
