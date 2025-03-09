import Skeleton from 'react-loading-skeleton';
import CategoryCard from '../../Components/Website/CardCategory';

export default function HomeCategory({category}) {
  return (
    <div className='mx-4'>
      <h3 className='mb-3'>Browser Category</h3>
      <div className='d-flex flex-nowrap column-gap-2 overflow-x-scroll'>
        {category.length > 0 ? (
          category.map((item, index) => <CategoryCard key={index} image={item.image} title={item.title.slice(-10)} />)
        ) : (
          <>
            <Skeleton height={'100px'} width={'100px'} />
            <Skeleton height={'100px'} width={'100px'} />
            <Skeleton height={'100px'} width={'100px'} />
            <Skeleton height={'100px'} width={'100px'} />
            <Skeleton height={'100px'} width={'100px'} />
            <Skeleton height={'100px'} width={'100px'} />
            <Skeleton height={'100px'} width={'100px'} />
            <Skeleton height={'100px'} width={'100px'} />
            <Skeleton height={'100px'} width={'100px'} />
            <Skeleton height={'100px'} width={'100px'} />
            <Skeleton height={'100px'} width={'100px'} />
          </>
        )}
      </div>
    </div>
  );
}
