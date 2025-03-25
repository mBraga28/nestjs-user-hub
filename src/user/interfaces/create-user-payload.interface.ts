import { CreateUserDto } from "../dto/create-user.dto";

interface CreateUserPayload extends Omit<CreateUserDto, 'roleId'> {
    accountType: string;
  }

export default CreateUserPayload;  