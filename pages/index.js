import React from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import App from '../components/app';
import ProductGrid from '../components/product-grid';
import { Container, Flex, Text } from '../components/base';
import fetchProducts from '../lib/fetch-products';
import initStore from '../lib/store';
import { setProductFeed } from '../actions/product';

const Home = props => (
  <App>
    <Container p0>
      <Flex
        justifyContent="center"
        alignItems="center"
        css={{
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          backgroundImage: 'url("/static/images/hero.jpg")',
          height: 250,
          minHeight: 0,
        }}
      >
        <Text
          gray2
          mb4
          is="h1"
          fontSize={1}
        >
          Awesome Verbiage
        </Text>
      </Flex>
      <Container>
        <ProductGrid products={props.products} />
      </Container>
    </Container>
  </App>
);

Home.getInitialProps = async ({ store, isServer }) => {
  if (isServer) {
    const products = await fetchProducts();
    store.dispatch(setProductFeed(products));
  }

  return { isServer };
};

Home.propTypes = {
  products: PropTypes.array,
};

export default withRedux(initStore, state => ({
  products: state.Product.feed,
}))(Home);
