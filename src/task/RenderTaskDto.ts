import { IsString, ValidateIf } from 'class-validator';

export class RenderTaskDto {
  @IsString()
  public question: string;

  @ValidateIf((obj, value) => value !== null)
  @IsString()
  public code: string | null;

  @IsString()
  public annotation: string;
}
