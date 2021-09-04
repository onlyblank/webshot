import { IsString, IsOptional } from 'class-validator';

export class RenderTaskDto {
  @IsString()
  public question: string;

  @IsOptional()
  @IsString()
  public code: string | null;

  @IsOptional()
  @IsString()
  public annotation?: string;
}
