import React from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

import * as NewsfeedService from "../services/newsfeed";
import Newsfeed from "../models/Newsfeed";
import NewsfeedItem from "./NewsfeedItem";
import LoadingSpinner from "./LoadingSpinner";

export interface NewsfeedListProps {}

export interface NewsfeedListState {
  newsfeeds: Array<Newsfeed>;
  sources: Array<any>,
  isLoading: boolean;
  sortBy: string;
  order: string;
  filterBy: string;
  filter: string;
  newSource: string;
  source: string;
}

export class NewsfeedList extends React.Component<
  NewsfeedListProps,
  NewsfeedListState
> {
  constructor(props?: NewsfeedListProps, context?: any) {
    super(props, context);

    this.state = {
      newsfeeds: [],
      sources: [],
      isLoading: false,
      sortBy: "publishedAt",
      order: "asc",
      filterBy: "",
      filter: "",
      newSource: "",
      source: ""
    };
  }

  componentDidMount() {
    this.getNewsfeeds();
    this.getSources();
  }

  getSources = async () => {
    const res = await NewsfeedService.getSources();
    if (res.data) {
      this.setState({
        sources: res.data.sources,
      });
    }
  }

  getNewsfeeds = async () => {
    this.setState({ isLoading: true });
    const { sortBy, filter, filterBy, order } = this.state;
    const res = await NewsfeedService.list({ sortBy, order, filter, filterBy });
    if (res.data) {
      this.setState({
        newsfeeds: res.data.articles,
        isLoading: false
      });
    }
  };

  onSubmit = e => {
    e.preventDefault();
    this.getNewsfeeds();
  };

  handleChange = event => {
    let data = this.state;
    data[event.target.name] = event.target.value;
    this.setState(data);
  };

  handleAddSource = async () => {
    const res = await NewsfeedService.addSource(this.state.newSource);
    if (res.data && res.data.completed) {
      alert('Added source successfully');
      this.setState(
        {
          sortBy: "publishedAt",
          order: "asc",
          filterBy: "",
          filter: "",
          source: "",
          newSource: ""
        },
        () => {
          this.getNewsfeeds();
          this.getSources();
        }
      );
    } else {
      alert('Something went wrong, please try with another URL');
    }
  };

  handleDeleteSource = async () => {
    const res = await NewsfeedService.deleteSource(this.state.source);
    if (res.data && res.data.completed) {
      alert('Deleted source successfully');
      this.setState(
        {
          sortBy: "publishedAt",
          order: "asc",
          filterBy: "",
          filter: "",
          source: "",
          newSource: ""
        },
        () => {
          this.getNewsfeeds();
          this.getSources();
        }
      );
    } else {
      alert('Something went wrong, please try again');
    }
  };

  render() {
    return (
      <section className="newsfeed-list">
        <div className="filters">
          <form noValidate autoComplete="off" onSubmit={e => this.onSubmit(e)}>
            <div className="row" style={{ marginBottom: 30 }}>
              <div className="col-lg-3 col-md-6">
                <FormControl variant="outlined" className="form-control" margin='normal'>
                  <InputLabel>Filter by</InputLabel>
                  <Select
                    name="filterBy"
                    value={this.state.filterBy}
                    onChange={this.handleChange}
                  >
                    <MenuItem value="author">Author</MenuItem>
                    <MenuItem value="source">Source</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col-lg-3 col-md-6">
                <TextField
                margin='normal'
                  name="filter"
                  onChange={this.handleChange}
                  label="Filter"
                  variant="outlined"
                  className="form-control"
                  value={this.state.filter}
                />
              </div>
              <div className="col-lg-3 col-md-6">
                <FormControl variant="outlined" className="form-control" margin='normal'>
                  <InputLabel>Sort by</InputLabel>
                  <Select
                    name="sortBy"
                    value={this.state.sortBy}
                    onChange={this.handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="author">Author</MenuItem>
                    <MenuItem value="title">Title</MenuItem>
                    <MenuItem value="publishedAt">Publised At</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col-lg-3 col-md-6">
                <FormControl variant="outlined" className="form-control" margin='normal'>
                  <InputLabel>Order</InputLabel>
                  <Select
                    name="order"
                    value={this.state.order}
                    onChange={this.handleChange}
                  >
                    <MenuItem value="asc">Ascending</MenuItem>
                    <MenuItem value="desc">Descending</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="row" style={{ marginBottom: 30 }}>
              <div className="col-lg-2 col-md-3">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ height: "46px", width: "100%" }}
                >
                  OK
                </Button>
              </div>
            </div>
            <div className="row" style={{ marginBottom: 30 }}>
              <div className="col-lg-4 col-md-6">
                <TextField
                margin='normal'
                  name="newSource"
                  onChange={this.handleChange}
                  label="Source URL"
                  variant="outlined"
                  className="form-control"
                  value={this.state.newSource}
                />
              </div>
              <div className="col-lg-2 col-md-3">
                <Button
                  onClick={this.handleAddSource}
                  disabled={!this.state.newSource}
                  type="button"
                  variant="contained"
                  color="default"
                  style={{ height: "46px", width: "100%", marginTop: 16 }}
                >
                  Add
                </Button>
              </div>
            </div>
            <div className="row" style={{ marginBottom: 30 }}>
            <div className="col-lg-4 col-md-6">
                <FormControl variant="outlined" className="form-control" margin='normal'>
                  <InputLabel>Sources</InputLabel>
                  <Select
                    name="source"
                    value={this.state.source}
                    onChange={this.handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {
                      this.state.sources.map((source, index) => {
                        return (
                        <MenuItem value={source.sourceUrl} key={index}>{source.sourceUrl}</MenuItem>
                        )
                      })
                    }
                  </Select>
                </FormControl>
              </div>
              <div className="col-lg-2 col-md-3">
                <Button
                  onClick={this.handleDeleteSource}
                  disabled={!this.state.source}
                  type="button"
                  variant="contained"
                  color="secondary"
                  style={{ height: "46px", width: "100%", marginTop: 16 }}
                >
                  Delete source
                </Button>
              </div>
            </div>
          </form>
        </div>

        <div className="row">
          <div className="col-lg-12 col-md-12">
            {!this.state.isLoading && (
              <>
                {this.state.newsfeeds.length > 0 &&
                  this.state.newsfeeds.map((item, index) => {
                    return <NewsfeedItem data={item} key={index} />;
                  })}
                {this.state.newsfeeds.length == 0 && <p>No data</p>}
              </>
            )}
            {this.state.isLoading && (
              <>
                <LoadingSpinner />
              </>
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default NewsfeedList;
