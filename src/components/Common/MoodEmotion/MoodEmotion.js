import happyImg from '../../../assets/images/Emoji/XanhLa.png';
import smileImg from '../../../assets/images/Emoji/XanhNhat.png';
import neutralImg from '../../../assets/images/Emoji/Vang.png';
import sadImg from '../../../assets/images/Emoji/Cam.png';
import angryImg from '../../../assets/images/Emoji/Do.png';


const moodMap = [
  { value: 5, img: happyImg, color: '#4AAF57' },
    { value: 4, img: smileImg, color: '#8CC255' },
    { value: 3, img: neutralImg, color: '#FFC12D' },
    { value: 2, img: sadImg, color: '#FF981E' },
    { value: 1, img: angryImg, color: '#F54334' },
];

let saved = localStorage.getItem("moodEmotion");
let MoodEmotion;

if (saved) {
  try {
    MoodEmotion = JSON.parse(saved);
  } catch (error) {
    MoodEmotion = moodMap;
  }
} else {
  localStorage.setItem("moodEmotion", JSON.stringify(moodMap));
  MoodEmotion = moodMap;
}

export default MoodEmotion; 
