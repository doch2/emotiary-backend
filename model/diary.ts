import { Schema, model } from 'mongoose';

// 인터페이스 생성
interface IDiary {
  title: string;
  emoji: string;
  message: string;
  created: Date;
}

// 스키마 생성
const movieSchema = new Schema<IDiary>({
  title: {
    type: String,
    required: true
  },
  emoji: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

// 모델
// musics라는 컬렉션이 생성
const Diary = model('diary', movieSchema)

export default Diary;