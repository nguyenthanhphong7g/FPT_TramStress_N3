import lake from '../../../../assets/images/Relax/lake.png'
import rain from '../../../../assets/images/Relax/rain.png'
import sea from '../../../../assets/images/Relax/sea.png'
import sky from '../../../../assets/images/Relax/sky.png'
import sunset from '../../../../assets/images/Relax/sunset.png'
import yoga from '../../../../assets/images/Relax/yoga.png'

const relaxContent = [
  {
    title: 'Phổ biến',
    slug: 'popular',
    items: [
      {
        type: 'baitap',
        img: yoga,
        text: 'Yoga giảm stress và căng thẳng cho người mới'
      },
      {
        type: 'giaidieu',
        img: rain,
        text: 'Tiếng mưa thư giãn'
      },
      {
        type: 'loihay',
        img: sunset,
        text: 'Không quan trọng việc bạn đi chậm thế nào, miễn là đừng bao giờ dừng lại',
        author: 'Khổng Tử'
      }
    ]
  },
  {
    title: 'Bài tập',
    slug: 'exercise',
    items: Array(4).fill({
      type: 'baitap',
      img: yoga,
      text: 'Yoga giảm stress và căng thẳng cho người mới',
      url: 'https://www.youtube.com/watch?v=TTdHXFafWmQ&t=548s'
    })
  },
  {
    title: 'Giai điệu',
    slug: 'music',
    items: Array(10).fill({
      type: 'giaidieu',
      img: rain,
      text: 'Tiếng mưa thư giãn',
      url: 'https://www.youtube.com/watch?v=Z0VSMvO7DNk&list=PLH2lykxD-tSaLk9QU80vmrriXlYebb8Hx&index=2'
    })
  },
  {
    title: 'Lời hay',
    slug: 'word',
    items: [
      {
        type: 'loihay',
        img: sunset,
        text: 'Không quan trọng việc bạn đi chậm thế nào, miễn là đừng bao giờ dừng lại',
        author: 'Khổng Tử'
      },
      {
        type: 'loihay',
        img: lake,
        text: 'Không quan trọng việc bạn đi chậm thế nào, miễn là đừng bao giờ dừng lại',
        author: 'Khổng Tử'
      },
      {
        type: 'loihay',
        img: sea,
        text: 'Không quan trọng việc bạn đi chậm thế nào, miễn là đừng bao giờ dừng lại',
        author: 'Khổng Tử'
      },
      {
        type: 'loihay',
        img: sky,
        text: 'Không quan trọng việc bạn đi chậm thế nào, miễn là đừng bao giờ dừng lại',
        author: 'Khổng Tử'
      }
    ]
  }
];

export default relaxContent;
