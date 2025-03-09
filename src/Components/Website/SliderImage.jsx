import {Slide} from 'react-slideshow-image';
import CoverImage_1 from '../../assets/cover-1.svg';
import CoverImage_2 from '../../assets/cover-2.svg';

export default function SliderImage() {
  let coverImageData = [CoverImage_1, CoverImage_2];
  return (
    <Slide infinite autoplay duration={3000} transitionDuration={500} arrows={true} indicators={true}>
      {coverImageData.map((image, index) => {
        return (
          <div key={index} style={{height: '40vw'}} className='w-100'>
            <img style={{width: '100%', objectFit: 'cover'}} src={image} alt='coverImage' />
          </div>
        );
      })}
    </Slide>
  );
}
