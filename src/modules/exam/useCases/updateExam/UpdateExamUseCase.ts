import { injectable, inject } from "tsyringe";

import { Exam } from "@modules/exam/infra/typeorm/entities/Exam";
import { IExamsRepository } from "@modules/exam/repositories/IExamsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  report_status?: string;
  payment_status?: string;
  value?: string;
  conclusion_date?: Date;
  report?: string;
  radiologist_id?: string;
  id: string;
}

@injectable()
class UpdateExamUseCase {
  constructor(
    @inject("ExamsRepository")
    private examsRepository: IExamsRepository
  ) {}

  async execute({
    report_status,
    payment_status,
    value,
    conclusion_date,
    report,
    radiologist_id,
    id,
  }: IRequest): Promise<Exam> {
    const exam = await this.examsRepository.findById(id);

    if (!exam) {
      throw new AppError("Exam not found");
    }

    Object.assign(exam, {
      report_status,
      payment_status,
      value,
      conclusion_date,
      report,
      radiologist_id,
    });

    const updatedExam = await this.examsRepository.create(exam);

    return updatedExam;
  }
}

export { UpdateExamUseCase };
