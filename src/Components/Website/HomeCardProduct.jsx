export default function HomeCardProduct({product}) {
  let StarForProduct = [];
  for (let index = 1; index < 6; index++) {
    if (index <= product.rating) StarForProduct.push(<i className='ri-star-fill'></i>);
    else StarForProduct.push(<i key={index} className='ri-star-line'></i>);
  }

  return (
    <div style={{width: '230px'}} className='card p-3 shadow'>
      <img width={'100%'} height={'100px'} src={product.images[0].image} alt='hello' />
      <h5 title={product.title} className='mt-4 text-nowrap overflow-hidden ' style={{lineHeight: '18px'}}>
        {product.title}
      </h5>
      <div className='d-flex text-warning'>{StarForProduct}</div>
      <p title={product.description} className='my-2'>
        {product.description.slice(0, 20)}...
      </p>
      <div className='d-flex align-items-baseline justify-content-between'>
        <div className='d-flex align-items-end column-gap-2'>
          <h5 style={{color: 'var(--main-color)'}}>${product.discount}</h5>
          <h5 className='text-danger text-decoration-line-through fs-6'>${product.price}</h5>
        </div>
        {/* {discount} */}
        <button style={{backgroundColor: 'var(--main-color)'}} className='btn btn-sm text-white text-nowrap'>
          Add <i className='ri-shopping-bag-line'></i>
        </button>
      </div>
    </div>
  );
}
