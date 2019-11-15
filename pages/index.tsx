import * as React from 'react';
import Head from 'next/head';

import Layout from '../src/components/layouts/Layout';
import NewsfeedList from '../src/components/NewsfeedList';
import AddButton from '../src/components/AddButton';

class IndexPage extends React.Component {
    static async getInitialProps() {
        return { namespacesRequired: ['common'] };
    }
    
    render() {
        return (
            <div className="page-content">
                <Head>
                    <title>Home page</title>
                </Head>
                <Layout>
                  <NewsfeedList />
                  <AddButton />
                </Layout>
            </div>
        );
    }
}

export default IndexPage;
