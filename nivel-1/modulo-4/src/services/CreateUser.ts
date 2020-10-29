/**
 * To create: name, email, password
 */

interface TechObject {
  title: string;
  experience: number;
}

interface User {
  name: string;
  email: string;
  password: string;
  techs: Array<string | TechObject>;
}

export default function CreateUser({ name, email, password }: User): User {
  const user = {
    name,
    email,
    password,
    techs: [],
  };

  return user;
}
