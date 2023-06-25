import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string) => {
  const saltRounds = parseInt(process.env.LENGTH_HASH_SALT);
  const salt = bcrypt.genSaltSync(saltRounds);

  return bcrypt.hashSync(password, salt);
};

export const comparePassword = async (passwordReq: string, passwordDB: string) => {
  return bcrypt.compareSync(passwordReq, passwordDB);
};
