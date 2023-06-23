// diary에 대한 CRUD를 구현하는 기능
import { Request, Response } from 'express';
import Diary from "../../model/diary";

// 목록조회
// http://localhost:3000/diary?limit=3 (GET)
// - 성공: limit 수만큼 diary 객체를 담은 배열을 리턴(200: OK)
// - 실패: limit가 숫자가 아닌 경우 (400: Bad Request)
const list = async (req: Request, res: Response) => {
  req.query.limit = req.query.limit || "10";
  const limit = parseInt(req.query.limit as string, 10);

  if (Number.isNaN(limit)) {
    return res.status(400).json({ message: "limit가 숫자형이 아닙니다." })
  }

  try {
    const result = await Diary.find()
      .sort({ _id: -1 })  // 1: 오름차순, -1: 내림차순
      .limit(limit)

    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "목록조회 시 오류가 발생했습니다." });
  }
}

// 상세조회
// http://localhost:3000/diary/:id
// - 성공: id에 해당하는 diary 객체 리턴 (200: OK)
// - 실패: 해당하는 id가 없는 경우 (404: Not Found)
const detail = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await Diary.findById(id);
    if (!result) {
      return res.status(404).json({ message: "해당하는 데이터가 없습니다." });
    }
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "상세조회 시 오류가 발생했습니다." });
  }
}

// 등록
// http://localhost:3000/diary (POST, form data)
// - 성공: 입력받은 데이터로 diary 객체를 만들어 배열에 추가 (201: Created)
// - 실패: title, singer 값 누락시 (400: Bad Request)
const create = async (req: Request, res: Response) => {
  const { title, emoji, message } = req.body;
  if (!title || !emoji || !message) {
    return res.status(400).send("필수 입력값이 누락되었습니다.");
  }

  try {
    const diary = new Diary({ title, emoji, message });
    const result = await diary.save();
    res.status(201).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "등록 시 오류가 발생했습니다." });
  }
}

// 수정
// http://localhost:3000/diary/1
// - 성공: id에 해당하는 diary 객체를 찾아서 업데이트 후 diary 객체 반환 (200: OK)
// - 실패: 없는 id일 경우 (404: Not Found)
const update = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { title, emoji, message } = req.body;

  try {
    const result = await Diary.findByIdAndUpdate(
      id,
      { title, emoji, message },
      { new: true }
    )
    if (!result) {
      return res.status(404).json({ message: "해당하는 데이터가 없습니다." });
    }
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "수정 시 오류가 발생했습니다." })
  }
}

// 삭제
// http://localhost:3000/diary/1
// - 성공: id에 해당하는 diary 객체를 찾아서 배열에서 삭제 후 배열을 리턴 (200: OK)
// - 실패: 없는 id일 경우 (404: Not Found)
const remove = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await Diary.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "해당하는 데이터가 없습니다." });
    }
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "삭제 시 오류가 발생했습니다." })
  }
}

export { list, detail, create, update, remove };
