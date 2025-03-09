export default function CategoryCard({image, title, index}) {
  return (
    <div style={{height: '100px', minWidth: '100px'}} className='card d-flex flex-column row-gap-2 align-items-center  p-2'>
      <div style={{width: '80px', height: '40px'}}>
        <img style={{width: '100%', height: '40px'}} src={image} alt='CategoryImage' />
      </div>
      <p className='text-nowrap'>{title}</p>
    </div>
  );
}
