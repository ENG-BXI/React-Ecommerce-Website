import Skeleton from 'react-loading-skeleton';
import HomeCardProduct from '../../Components/Website/HomeCardProduct';

export default function TopRatedProduct({topRatedProducts}) {
  return (
    <div className='mx-4'>
      <h3 className='mt-4 mb-3'>Top Rated Product</h3>
      <div className='d-flex flex-wrap gap-2'>
        {topRatedProducts.length > 0 ? (
          topRatedProducts.map((product, index) => <HomeCardProduct key={index} product={product} />)
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
}
