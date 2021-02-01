import React, { Component } from 'react';
import { Footer, Header, PageContent, SidebarNav } from '../content';
import nav from '../_nav';
import routes from '../views';
import axios from 'axios';
import Dashboard from '../views/pages/Dashboard';
import { Pagination, PaginationItem, PaginationLink, Row } from 'reactstrap';
import Page from '../content/components/Page/Page';

const POST_SERVICE_URL = 'https://jsonplaceholder.typicode.com/posts';
const POST_PER_PAGE = 10;
export default class MainLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarCollapsed: false,
      posts: [],
      currentPage: props.page ? 1 : this.props.match.params.page,
      totalPages: 1,
    };
  }

  componentDidMount() {
    axios.get(POST_SERVICE_URL).then(res => {
      const posts = res.data;
      const totalPages = Math.ceil(posts.length / POST_PER_PAGE);
      this.setState({ posts, totalPages });
    });
  }

  toggleSideCollapse = () => {
    this.setState(prevState => ({
      sidebarCollapsed: !prevState.sidebarCollapsed,
    }));
  };

  getPostsForPage = page => {
    console.log(
      (page - 1) * POST_PER_PAGE,
      Math.min((page * POST_PER_PAGE, this.state.posts.length))
    );
    return this.state.posts.slice(
      (page - 1) * POST_PER_PAGE,
      page * POST_PER_PAGE
    );
  };

  pagination = total => {
    let pages = [];
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
    return pages;
  };

  render() {
    const { sidebarCollapsed } = this.state;
    const sidebarCollapsedClass = sidebarCollapsed ? 'side-menu-collapsed' : '';
    return (
      <div className={`app ${sidebarCollapsedClass}`}>
        <div className="app-body">
          <SidebarNav
            nav={nav}
            logoText="LSTAR"
            isSidebarCollapsed={sidebarCollapsed}
            toggleSidebar={this.toggleSideCollapse}
            {...this.props}
          />
          <Page>
            <Header
              toggleSidebar={this.toggleSideCollapse}
              isSidebarCollapsed={sidebarCollapsed}
              routes={routes}
              {...this.props}
            />
            <PageContent>
              <Row>
                {this.getPostsForPage(this.state.currentPage).map(post => (
                  <Dashboard post={post} key={post.id} />
                ))}
              </Row>
              <Pagination>
                {this.pagination(this.state.totalPages).map((value, index) => {
                  return (
                    <PaginationItem key={index}>
                      <PaginationLink href={`/posts/${value}`}>
                        {value}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
              </Pagination>
            </PageContent>
          </Page>
        </div>
        <Footer>
          <span>Copyright © 2021. All rights reserved.</span>
        </Footer>
      </div>
    );
  }
}
