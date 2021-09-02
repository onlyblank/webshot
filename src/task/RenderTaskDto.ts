import { IsString, IsOptional } from 'class-validator';

export class RenderTaskDto {
  @IsString()
  public question: string;

  @IsOptional()
  @IsString()
  public code: string | null;

  @IsString()
  public annotation: string;
}
