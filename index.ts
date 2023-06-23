import * as express from 'express';
import { Express, Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import router from './api';

dotenv.config();

// app(애플리케이션)은 express의 인스턴스
const app: Express = express();
const port = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// DB 연결
mongoose.connect(MONGO_URI!)  // non-null assertion (!)
  .catch(err => console.error(err))
  .then(() => console.log("Database connected"))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

app.use(morgan('dev'));

// 정적 파일 위치 설정
app.use(express.static('public'));

// form으로 전달된 바디메시지를 처리하는 바디파서 설정
app.use(bodyParser.urlencoded({ extended: false }));
// json 받기
app.use(bodyParser.json())

// 라우팅 모듈 연결
app.use(router);

// 여기까지 내려왔다는 것은 위에서 처리가 되지 않은 것임
app.use((req, res, next) => {
  res.status(404).send("없는 페이지입니다.");
})

// 5. 오류 처리 미들웨어
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send(err.message);
})
