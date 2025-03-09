import React from 'react';
import HomeCardProduct from '../../Components/Website/HomeCardProduct';
import Skeleton from 'react-loading-skeleton';

const HomeLastProduct = ({ products}) => {
  return (
    <div className='mx-4'>
      <h3 className='mt-4 mb-3'>Last Product</h3>
      <div className='d-flex flex-wrap gap-2'>
        {products.length > 0 ? (
          products.map((product, index) => <HomeCardProduct key={index} product={product} />)
        ) : (
          <>
            <Skeleton height={'200px'} width={'230px'} />
            <Skeleton height={'200px'} width={'230px'} />
            <Skeleton height={'200px'} width={'230px'} />
            <Skeleton height={'200px'} width={'230px'} />
            <Skeleton height={'200px'} width={'230px'} />
          </>
        )}
      </div>
    </div>
  );
};

export default HomeLastProduct;
