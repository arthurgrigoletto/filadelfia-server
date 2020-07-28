import HttpStatusCode from './StatusCodes';

class AppError {
  public readonly message: string;

  public readonly statusCode: HttpStatusCode;

  constructor(message: string, statusCode = HttpStatusCode.BAD_REQUEST) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default AppError;
