import { BadRequestException, PipeTransform } from "@nestjs/common";
import { ZodSchema, ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      this.schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          message: "Validation Failed",
          statusCode: 400,
          error: fromZodError(error),
        });
      }
      throw new BadRequestException("");
    }
    return value;
  }
}
